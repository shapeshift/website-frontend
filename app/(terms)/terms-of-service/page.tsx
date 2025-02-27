import 'highlight.js/styles/github-dark.css';
import {notFound} from 'next/navigation';

import {TermsOfServiceStyle} from '@/app/(terms)/terms-of-service/style';
import {TermAccordion} from '@/app/(terms)/terms-of-service/TermsAccordion';
import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {getTermsOfService} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function TermsOfServicePage(): Promise<ReactNode> {
	const termsOfService = await getTermsOfService();
	if (!termsOfService) {
		return notFound();
	}
	return (
		<main className={'terms-of-service container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-20 flex w-full'}>
				<section className={'flex flex-col'}>
					<h1 className={'mb-6 text-7xl'}>{'Terms of Service'}</h1>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>
			</div>
			<div className={'flex flex-col gap-2'}>
				{termsOfService.terms.map(term => (
					<TermAccordion
						key={term.id}
						term={term}
					/>
				))}
			</div>
			<TermsOfServiceStyle />
			<div className={'mt-20'}>
				<Banner />
			</div>
		</main>
	);
}
