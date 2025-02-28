/************************************************************************************************
 ** DeFi Wallet Product Page:
 **
 ** Displays information about ShapeShift's DeFi wallet product
 ** Features a hero section, cards highlighting key features, and a call-to-action footer
 **
 ** Page Structure:
 ** - Background image (desktop only)
 ** - Hero section with title, description, and CTA button
 ** - Feature cards arranged in a row
 ** - Footer banner with final call-to-action
 **
 ** Data:
 ** - Content fetched from Strapi CMS
 ** - Includes text content, button configurations, and images
 ************************************************************************************************/

import {notFound} from 'next/navigation';

import {Card} from '@/components/strapi/cards-row/Card';
import CardsRow from '@/components/strapi/cards-row/CardsRow';

import {BackgroundImage} from '../_components/BackgroundImage';
import {fetchDeFiWalletPage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {ProductHero} from '../_components/ProductHero';

import type {TCard} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export default async function DeFiWalletPage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchDeFiWalletPage();

	// Handle case where page data is not found
	if (!page) {
		console.error('DeFi Wallet page data not found');
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

			{/* Feature cards section */}
			<CardsRow
				data={page.cardsRow}
				children={(card: TCard) => <Card data={card} />}
			/>

			{/* Footer banner with CTA */}
			<ProductFooterBanner productName={'defi-wallet'} />
		</main>
	);
}
