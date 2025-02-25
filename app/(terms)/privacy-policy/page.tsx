import 'highlight.js/styles/github-dark.css';
import {notFound} from 'next/navigation';

import {PrivacyAccordion} from '@/app/(terms)/privacy-policy/PrivacyAccordion';
import {PrivacyPolicyStyle} from '@/app/(terms)/privacy-policy/style';
import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {getPrivacyPolicy} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function PrivacyPolicyPage(): Promise<ReactNode> {
	const privacyPolicy = await getPrivacyPolicy();
	if (!privacyPolicy) {
		return notFound();
	}
	return (
		<main className={'terms-of-service container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-20 flex w-full'}>
				<section className={'flex flex-col'}>
					<h1 className={'mb-6 text-7xl'}>{'Privacy Policy'}</h1>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/#/demo/'}
						title={'Get Started'}
					/>
				</section>
			</div>
			<div className={'flex flex-col gap-2'}>
				{privacyPolicy.policy.map(policy => (
					<PrivacyAccordion
						key={policy.id}
						policy={policy}
					/>
				))}
			</div>
			<PrivacyPolicyStyle />
			<div className={'mt-20'}>
				<Banner />
			</div>
		</main>
	);
}
