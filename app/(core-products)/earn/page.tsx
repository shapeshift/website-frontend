/************************************************************************************************
 ** Earn Product Page:
 **
 ** Displays information about ShapeShift's earning opportunities and yield products
 ** Features a hero section, grid of earning options, and a call-to-action footer
 **
 ** Page Structure:
 ** - Background image (desktop only)
 ** - Hero section with title, description, and CTA button
 ** - Grid layout of earning opportunities
 ** - Footer banner with final call-to-action
 **
 ** Data:
 ** - Content fetched from Strapi CMS
 ** - Includes text content, button configurations, and images
 ************************************************************************************************/

import {notFound} from 'next/navigation';

import Grid from '@/components/strapi/products/Grid';

import {BackgroundImage} from '../_components/BackgroundImage';
import {fetchEarnPage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {ProductHero} from '../_components/ProductHero';

import type {ReactNode} from 'react';

export default async function EarnPage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchEarnPage();

	// Handle case where page data is not found
	if (!page) {
		console.error('Earn page data not found');
		return notFound();
	}

	return (
		<main className={'flex w-full flex-col items-center justify-center'}>
			{/* Background image (desktop only) */}
			<BackgroundImage />

			{/* Hero section with title, description and CTA */}
			<ProductHero
				title={page.title}
				description={page.description}
				buttonCta={page.buttonCta}
				featuredImg={page.featuredImg}
			/>

			{/* Grid of earning opportunities */}
			<Grid data={page.grid} />

			{/* Footer banner with CTA */}
			<ProductFooterBanner productName={'earn'} />
		</main>
	);
}
