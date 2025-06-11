/************************************************************************************************
 ** Trade Product Page:
 **
 ** Displays information about ShapeShift's trading capabilities
 ** Features a hero section, key stats, feature cards, and a grid layout of trading features
 **
 ** Page Structure:
 ** - Background image (desktop only)
 ** - Hero section with title, description, and CTA button
 ** - Key statistics about trading volume and capabilities
 ** - Feature cards arranged in a row
 ** - Displaced grid layout highlighting trading features
 ** - Footer banner with final call-to-action
 **
 ** Data:
 ** - Content fetched from Strapi CMS
 ** - Includes text content, button configurations, statistics, and images
 ************************************************************************************************/

import {notFound} from 'next/navigation';
import Script from 'next/script';

import {Card} from '@/app/_components/strapi/cards-row/Card';
import CardsRow from '@/app/_components/strapi/cards-row/CardsRow';
import GridDisplaced from '@/app/_components/strapi/products/GridDisplaced';
import {generateProductSchema} from '@/app/_utils/schema';

import {BackgroundImage} from '../_components/BackgroundImage';
import {fetchTradePage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {ProductStats} from '../_components/ProductStats';
import {TradeHero} from '../_components/TradeHero';

import type {TCard} from '@/app/_components/strapi/types';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
	const page = await fetchTradePage();

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

export default async function TradePage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchTradePage();

	// Handle case where page data is not found
	if (!page) {
		console.error('Trade page data not found');
		return notFound();
	}

	// Generate structured data for product
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com';
	const pageURL = `${baseUrl}/trade`;

	// Map card data to features format for schema
	const features = page.cardsRow.cards.map(card => ({
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

			{/* Hero section with client-side interactivity for button */}
			<TradeHero
				title={page.title}
				description={page.description}
				buttonCta={page.buttonCta}
				imageUrl={`${process.env.STRAPI_URL}${page.featuredImg.url}`}
			/>

			{/* Feature cards section */}
			<CardsRow
				data={page.cardsRow}
				children={(card: TCard) => <Card data={card} />}
			/>

			{/* Displaced grid layout highlighting additional features */}
			<GridDisplaced data={page.gridDisplaced} />

			{/* Stats section */}
			<ProductStats stats={page.stats} />

			{/* Footer banner with CTA */}
			<ProductFooterBanner productName={'trade'} />
		</main>
	);
}
