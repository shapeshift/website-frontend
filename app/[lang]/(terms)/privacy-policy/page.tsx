/**************************************************************************************************
 ** Privacy Policy Page Component
 ** Server-side rendered page for displaying privacy policy content
 ** Uses shared components for consistent UI across terms pages
 ** Implements proper SEO metadata for search engine optimization
 ** Handles loading states and error cases gracefully
 **************************************************************************************************/

import {notFound} from 'next/navigation';

import {TermsPage, generateMetadata} from '@/app/[lang]/(terms)/_components/TermsPage';
import {getPrivacyPolicyItems} from '@/app/[lang]/(terms)/_components/utils';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = generateMetadata({title: 'Privacy Policy'});

export default async function PrivacyPolicyPage(): Promise<ReactNode> {
	const items = await getPrivacyPolicyItems();

	if (!items.length) {
		return notFound();
	}

	return (
		<TermsPage
			title={'Privacy Policy'}
			items={items}
		/>
	);
}
