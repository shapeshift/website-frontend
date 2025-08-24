#!/usr/bin/env bun

import {exec} from 'child_process';

import chalk from 'chalk';
import inquirer from 'inquirer';
import pify from 'pify';
import semver from 'semver';
import {simpleGit as git} from 'simple-git';

import {exit, getLatestSemverTag} from './utils';

const assertIsCleanRepo = async (): Promise<void> => {
	const gitStatus = await git().status();
	if (!gitStatus.isClean()) {
		console.log(chalk.red('Your repository is not clean. Please commit or stash your changes.'));
		exit();
	}
};

const assertGhInstalled = async (): Promise<void> => {
	try {
		await pify(exec)('hash gh');
	} catch {
		exit(chalk.red('Please install GitHub CLI https://github.com/cli/cli#installation'));
	}
};

const assertGhAuth = async (): Promise<void> => {
	try {
		await pify(exec)('gh auth status');
	} catch (e) {
		exit(chalk.red((e as Error).message));
	}
};

const getCommits = async (from: string, to: string): Promise<{messages: string[]; total: number}> => {
	// Get the last release tag for proper commit range calculation
	const latestTag = from === 'origin/release' ? await getLatestSemverTag() : null;

	// Use tag-based range if available, otherwise fall back to branch comparison
	let range: string;
	if (latestTag && from === 'origin/release' && latestTag !== 'v1.0.0') {
		// Use tag-based range if we have real tags (not the default fallback)
		range = `${latestTag}..${to}`;
	} else {
		// Fall back to branch comparison when no tags exist or using non-release branches
		range = `${from}..${to}`;
	}

	const {all, total} = await git().log(['--oneline', '--first-parent', '--pretty=format:%s', range]);
	const messages = all.map(({hash}) => hash);
	return {messages, total};
};

const inquireProceedWithCommits = async (commits: string[], action: 'create' | 'merge'): Promise<void> => {
	console.log(chalk.blue(['', commits, ''].join('\n')));
	const message =
		action === 'create'
			? 'Do you want to create a release with these commits?'
			: 'Do you want to merge and push these commits into main?';
	const questions: inquirer.QuestionCollection<{shouldProceed: boolean}> = [
		{
			type: 'confirm',
			default: 'y',
			name: 'shouldProceed',
			message,
			choices: ['y', 'n'],
		}
	];
	const {shouldProceed} = await inquirer.prompt(questions);
	if (!shouldProceed) {
		exit('Release cancelled.');
	}
};

const releaseType = ['Regular', 'Hotfix'] as const;
type TReleaseType = (typeof releaseType)[number];
type TWebReleaseType = Extract<semver.ReleaseType, 'minor' | 'patch'>;

const getNextReleaseVersion = async (versionBump: TWebReleaseType): Promise<string> => {
	const latestTag = await getLatestSemverTag();
	const currentVersion = latestTag.replace(/^v/, '');
	const nextVersion = semver.inc(currentVersion, versionBump);
	if (!nextVersion) {
		exit(chalk.red(`Could not bump version from ${latestTag}`));
	}
	return `v${nextVersion}`;
};

const inquireCleanBranchOffMain = async (): Promise<boolean> => {
	const questions: inquirer.QuestionCollection<{isCleanlyBranched: boolean}> = [
		{
			type: 'confirm',
			name: 'isCleanlyBranched',
			message: 'Is your branch cleanly branched off origin/main?',
			default: false, // Defaulting to false to encourage verification
		}
	];
	const {isCleanlyBranched} = await inquirer.prompt(questions);
	return isCleanlyBranched;
};

const inquireTReleaseType = async (): Promise<TReleaseType> => {
	const questions: inquirer.QuestionCollection<{releaseType: TReleaseType}> = [
		{
			type: 'list',
			name: 'releaseType',
			message: 'What type of release is this?',
			choices: releaseType,
		}
	];
	return (await inquirer.prompt(questions)).releaseType;
};

const createRelease = async (): Promise<void> => {
	const releaseType = await inquireTReleaseType();

	if (releaseType === 'Regular') {
		// Regular release: develop -> release -> main
		const {messages, total} = await getCommits('origin/release', 'origin/develop');

		if (!total) {
			exit(chalk.yellow('No new commits to release from develop.'));
		}

		await inquireProceedWithCommits(messages, 'create');

		console.log(chalk.green('Checking out develop...'));
		await git().checkout(['develop']);
		console.log(chalk.green('Pulling develop...'));
		await git().pull();
		console.log(chalk.green('Resetting release to develop...'));
		await git().checkout(['-B', 'release']);
		console.log(chalk.green('Force pushing release branch...'));
		await git().push(['--force', 'origin', 'release']);

		// Create PR with version
		const nextVersion = await getNextReleaseVersion('minor');
		const title = `chore: release ${nextVersion}`;
		const body = messages.map(m => m.replace(/"/g, '\\"')).join('\\n');
		const command = `gh pr create --draft --base "main" --title "${title}" --body "${body}"`;
		console.log(chalk.green('Creating draft PR...'));
		await pify(exec)(command);

		exit(chalk.green(`Release ${nextVersion} created successfully. PR has been opened.`));
	} else {
		// Hotfix release: current branch -> release -> main
		const currentBranch = await git().revparse(['--abbrev-ref', 'HEAD']);

		if (currentBranch === 'main') {
			console.log(
				chalk.red(
					'Cannot open hotfix PRs directly off local main branch for security reasons. Please branch out to another branch first.',
				),
			);
			exit();
		}

		// Only continue if the branch is cleanly branched off origin/main since we will
		// target it in the hotfix PR
		const isCleanOffMain = await inquireCleanBranchOffMain();
		if (!isCleanOffMain) {
			exit(
				chalk.yellow(
					'Please ensure your branch is cleanly branched off origin/main before proceeding.',
				),
			);
		}

		// Dev has confirmed they're clean off main, here goes nothing
		console.log(chalk.green('Fetching latest changes...'));
		await git().fetch(['origin', '--tags', '--force']);

		console.log(chalk.green(`Force pushing ${currentBranch} branch...`));
		await git().push(['-u', 'origin', currentBranch, '--force']);

		const {messages, total} = await getCommits('origin/main', `origin/${currentBranch}`);

		if (!total) {
			exit(chalk.yellow('No commits to release.'));
		}

		await inquireProceedWithCommits(messages, 'create');

		// Merge origin/main as a paranoia check
		console.log(chalk.green('Merging origin/main...'));
		await git().merge(['origin/main']);

		console.log(chalk.green('Setting release to current branch...'));
		await git().checkout(['-B', 'release']);
		console.log(chalk.green('Force pushing release branch...'));
		await git().push(['--force', 'origin', 'release']);

		// Create hotfix PR with version
		const nextVersion = await getNextReleaseVersion('patch');
		const title = `chore: hotfix release ${nextVersion}`;
		const body = messages.map(m => m.replace(/"/g, '\\"')).join('\\n');
		const command = `gh pr create --draft --base "main" --title "${title}" --body "${body}"`;
		console.log(chalk.green('Creating draft hotfix PR...'));
		await pify(exec)(command);

		exit(chalk.green(`Hotfix release ${nextVersion} created successfully. PR has been opened.`));
	}
};

const mergeRelease = async (): Promise<void> => {
	const {messages, total} = await getCommits('origin/main', 'origin/release');

	if (!total) {
		exit(chalk.yellow('No commits to merge.'));
	}

	await inquireProceedWithCommits(messages, 'merge');

	console.log(chalk.green('Checking out release...'));
	await git().checkout(['release']);
	console.log(chalk.green('Pulling release...'));
	await git().pull();
	console.log(chalk.green('Checking out main...'));
	await git().checkout(['main']);
	console.log(chalk.green('Pulling main...'));
	await git().pull();
	console.log(chalk.green('Merging release into main...'));
	await git().merge(['release']);

	// Determine version bump type (patch for hotfix, minor for regular)
	// We can detect this by checking if release branch differs from develop
	const {total: developDiff} = await getCommits('origin/develop', 'origin/release');
	const versionBump: TWebReleaseType = developDiff > 0 ? 'patch' : 'minor';

	// Tag the release
	const nextVersion = await getNextReleaseVersion(versionBump);
	console.log(chalk.green(`Tagging main with version ${nextVersion}`));
	await git().tag(['-a', nextVersion, '-m', nextVersion]);

	console.log(chalk.green('Pushing main with tags...'));
	await git().push(['origin', 'main', '--tags']);

	// Merge back to develop to keep in sync
	console.log(chalk.green('Checking out develop...'));
	await git().checkout(['develop']);
	console.log(chalk.green('Pulling develop...'));
	await git().pull();
	console.log(chalk.green('Merging main back into develop...'));
	await git().merge(['main']);
	console.log(chalk.green('Pushing develop...'));
	await git().push(['origin', 'develop']);

	exit(chalk.green(`Release ${nextVersion} completed successfully!`));
};

const isReleaseInProgress = async (): Promise<boolean> => {
	const {total} = await getCommits('origin/release', 'origin/main');
	return Boolean(total);
};

const main = async (): Promise<void> => {
	await assertIsCleanRepo();
	await assertGhInstalled();
	await assertGhAuth();

	console.log(chalk.green('Fetching latest changes...'));
	await git().fetch(['origin', '--tags', '--force']);

	if (await isReleaseInProgress()) {
		await mergeRelease();
	} else {
		await createRelease();
	}
};

main();
