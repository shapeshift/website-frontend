/**************************************************************************************************
 ** Terms of Service Page Component
 ** Server-side rendered page for displaying terms of service content
 ** Uses shared components for consistent UI across terms pages
 ** Implements proper SEO metadata for search engine optimization
 ** Handles loading states and error cases gracefully
 *************************************************************************************************/

import {notFound} from 'next/navigation';

import {TermsPage, generateMetadata} from '@/app/(terms)/_components/TermsPage';
import {getTermsOfServiceItems} from '@/app/(terms)/_components/utils';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = generateMetadata({
	title: 'Terms of Service'
});

export default async function TermsOfServicePage(): Promise<ReactNode> {
	const items = await getTermsOfServiceItems();

	if (!items.length) {
		return notFound();
	}

	return (
		<TermsPage
			title={'Terms of Service'}
			items={items}
		/>
	);
}
