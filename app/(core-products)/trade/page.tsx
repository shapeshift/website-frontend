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

import {Card} from '@/components/strapi/cards-row/Card';
import CardsRow from '@/components/strapi/cards-row/CardsRow';
import GridDisplaced from '@/components/strapi/products/GridDisplaced';

import {BackgroundImage} from '../_components/BackgroundImage';
import {fetchTradePage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {TradeHero} from '../_components/TradeHero';

import type {TCard} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export default async function TradePage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchTradePage();
	
	// Handle case where page data is not found
	if (!page) {
		console.error('Trade page data not found');
		return notFound();
	}

	return (
		<main className={'flex w-full flex-col items-center justify-center'}>
			{/* Background image (desktop only) */}
			<BackgroundImage />

			{/* Hero section with client-side interactivity for button */}
			<TradeHero
				title={page.title}
				description={page.description}
				buttonCta={page.buttonCta}
				imageUrl={`${process.env.STRAPI_URL}${page.featuredImg.url}`}
				stats={page.stats}
			/>
			
			{/* Feature cards section */}
			<CardsRow
				data={page.cardsRow}
				children={(card: TCard) => <Card data={card} />}
			/>
			
			{/* Displaced grid layout highlighting additional features */}
			<GridDisplaced data={page.gridDisplaced} />
			
			{/* Footer banner with CTA */}
			<ProductFooterBanner productName="trade" />
		</main>
	);
}
