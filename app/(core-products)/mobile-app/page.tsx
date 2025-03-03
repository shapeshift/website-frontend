/************************************************************************************************
 ** Mobile App Product Page:
 **
 ** Displays information about ShapeShift's mobile application
 ** Features a hero section with download buttons, step-by-step guide, and app store links
 **
 ** Page Structure:
 ** - Background image (desktop only)
 ** - Hero section with title, description, and app store download buttons
 ** - Step-by-step ladder grid showing app features/benefits
 ** - Footer banner with app store download links
 **
 ** Data:
 ** - Content fetched from Strapi CMS
 ** - Includes text content, download buttons, and images
 ************************************************************************************************/

import {notFound} from 'next/navigation';
import Script from 'next/script';

import {generateProductSchema} from '@/app/_utils/schema';
import GridLadder from '@/components/strapi/products/GridLadder';

import {BackgroundImage} from '../_components/BackgroundImage';
import {DownloadButtons} from '../_components/DownloadButtons';
import {fetchMobileAppPage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {ProductHero} from '../_components/ProductHero';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
	const page = await fetchMobileAppPage();

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

export default async function MobileAppPage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchMobileAppPage();

	// Handle case where page data is not found
	if (!page) {
		console.error('Mobile App page data not found');
		return notFound();
	}

	// Generate structured data for product
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com';
	const pageURL = `${baseUrl}/mobile-app`;

	// Map ladder step data to features format for schema
	const features = page.gridLadder.steps.map(step => ({
		title: step.title,
		description: step.description
	}));

	// Generate product schema with app-specific properties
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

			{/* Hero section with title, description and download buttons */}
			<ProductHero
				title={page.title}
				description={page.description}
				featuredImg={page.featuredImg}>
				<DownloadButtons buttons={page.buttonDownload} />
			</ProductHero>

			{/* Step-by-step ladder grid */}
			<GridLadder data={page.gridLadder} />

			{/* Footer banner with app store links */}
			<ProductFooterBanner productName={'mobile-app'} />
		</main>
	);
}
