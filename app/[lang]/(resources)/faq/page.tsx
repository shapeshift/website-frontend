/************************************************************************************************
 ** FAQ Page:
 **
 ** Displays a comprehensive FAQ page with categorized questions and answers
 ** Features smooth scrolling navigation and responsive layout
 **
 ** Features:
 ** - Dynamic content from Strapi CMS
 ** - Automatic section highlighting based on scroll position
 ** - Optimized loading with proper caching strategy
 ** - SEO-friendly metadata and structure
 **
 ** Data Flow:
 ** - Fetches FAQ data from the API
 ** - Passes data to FAQContent component for rendering
 ** - Handles data loading errors gracefully
 ************************************************************************************************/

import {notFound} from 'next/navigation';

import {FAQContent} from '@/app/[lang]/(resources)/_components/FAQContent';
import {fetchFaqData} from '@/app/[lang]/(resources)/_utils/fetchUtils';
import {RESOURCES_DICT} from '@/app/[lang]/_utils/dictionary/resources';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = {
	title: RESOURCES_DICT.faq.metadata.title,
	description: RESOURCES_DICT.faq.metadata.description,
	keywords: RESOURCES_DICT.faq.metadata.keywords
};

export default async function FAQPage(): Promise<ReactNode> {
	// Fetch FAQ data using centralized utility
	const faqData = await fetchFaqData();

	// Handle missing data case
	if (!faqData) {
		console.error('Failed to load FAQ data');
		return notFound();
	}

	return (
		<>
			{/* FAQ content with navigation */}
			<FAQContent faqData={faqData} />
		</>
	);
}
