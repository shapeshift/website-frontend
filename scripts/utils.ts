import chalk from 'chalk';
import * as semver from 'semver';
import {simpleGit as git} from 'simple-git';

export const exit = (reason?: string): boolean => Boolean(reason && console.log(reason)) || process.exit(0);

export const getLatestSemverTag = async (): Promise<string> => {
	try {
		const tags = await git().tag(['-l', '--sort=-version:refname']);
		const semverTags = tags.split('\n').filter(tag => semver.valid(tag.replace(/^v/, '')));
		
		if (semverTags.length === 0) {
			console.log(chalk.yellow('No semver tags found. Starting from v1.0.0'));
			return 'v1.0.0';
		}
		
		return semverTags[0];
	} catch {
		console.log(chalk.yellow('Could not get latest semver tag. Starting from v1.0.0'));
		return 'v1.0.0';
	}
};
