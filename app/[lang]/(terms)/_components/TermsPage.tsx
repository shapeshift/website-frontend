/**************************************************************************************************
 ** Shared Terms Page Component
 ** Renders the content for both privacy policy and terms of service pages
 ** Implements server-side rendering for better SEO and performance
 ** Uses shared components for consistent UI between terms pages
 ** Takes title and data as props to make the component reusable
 ** Implements loading state and error handling for better UX
 **************************************************************************************************/

import {Suspense} from 'react';

import styles from '@/app/[lang]/(terms)/_components/terms.module.css';
import TermsAccordion from '@/app/[lang]/(terms)/_components/TermsAccordion';
import {Button} from '@/app/[lang]/_components/Button';

import type {TTermsItemData} from '@/app/[lang]/(terms)/_components/TermsAccordion';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

type TTermsPageProps = {
	title: string;
	items: TTermsItemData[];
};

/**************************************************************************************************
 * Helper function to create dynamic metadata based on title
 **************************************************************************************************/
export function generateMetadata({title}: {title: string}): Metadata {
	return {
		title: `${title} | ShapeShift`,
		description: `ShapeShift ${title.toLowerCase()} - legal information for users.`,
		openGraph: {
			title: `ShapeShift ${title}`,
			description: `View ShapeShift's ${title.toLowerCase()} and legal information.`
		}
	};
}

/**************************************************************************************************
 * Terms content component
 **************************************************************************************************/
function TermsContent({items}: TTermsPageProps): ReactNode {
	return (
		<div className={styles.blogContent}>
			<div className={'flex flex-col gap-2'}>
				{items.map(item => (
					<TermsAccordion
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}

/**************************************************************************************************
 * Loading fallback component
 **************************************************************************************************/
function TermsLoadingSkeleton(): ReactNode {
	return (
		<div className={'animate-pulse space-y-4'}>
			{Array.from({length: 3}).map((_, index) => (
				<div
					key={index}
					className={'h-24 rounded-2xl bg-secondBg/50'}
				/>
			))}
		</div>
	);
}

/**************************************************************************************************
 * Terms page component
 **************************************************************************************************/
export function TermsPage({title, items}: TTermsPageProps): ReactNode {
	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-20 flex w-full flex-col md:flex-row md:justify-between'}>
				<section className={'flex flex-col'}>
					<h1 className={'mb-6 text-4xl md:text-7xl'}>{title}</h1>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>
			</div>

			<Suspense fallback={<TermsLoadingSkeleton />}>
				<TermsContent
					title={title}
					items={items}
				/>
			</Suspense>
		</main>
	);
}
