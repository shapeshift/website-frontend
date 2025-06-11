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
import Script from 'next/script';

import Grid from '@/app/_components/strapi/products/Grid';
import {generateProductSchema} from '@/app/_utils/schema';

import {BackgroundImage} from '../_components/BackgroundImage';
import {fetchEarnPage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {ProductHero} from '../_components/ProductHero';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
	const page = await fetchEarnPage();

	if (!page) {
		return {};
	}

	return {
		title: page.title,
		description: page.description,
		openGraph: {
			title: page.title,
			description: page.description,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${page.featuredImg.url}`,
					width: 1200,
					height: 630,
					alt: page.title
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: page.title,
			description: page.description,
			images: [`${process.env.STRAPI_URL}${page.featuredImg.url}`]
		}
	};
}

export default async function EarnPage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchEarnPage();

	// Handle case where page data is not found
	if (!page) {
		console.error('Earn page data not found');
		return notFound();
	}

	// Generate structured data for product
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com';
	const pageURL = `${baseUrl}/earn`;

	// Map grid card data to features format for schema
	const features = page.grid.card.map(card => ({
		title: card.title,
		description: card.description
	}));

	// Generate product schema
	const productSchema = generateProductSchema({
		title: page.title,
		description: page.description,
		featuredImage: `${process.env.STRAPI_URL}${page.featuredImg.url}`,
		pageURL,
		features
	});

	return (
		<main className={'flex w-full flex-col items-center justify-center'}>
			{/* Add structured data */}
			<Script
				id={'product-schema'}
				type={'application/ld+json'}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{__html: JSON.stringify(productSchema)}}
			/>

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
