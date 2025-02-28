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

import GridLadder from '@/components/strapi/products/GridLadder';

import {BackgroundImage} from '../_components/BackgroundImage';
import {DownloadButtons} from '../_components/DownloadButtons';
import {fetchMobileAppPage} from '../_components/ProductFetcher';
import {ProductFooterBanner} from '../_components/ProductFooterBanner';
import {ProductHero} from '../_components/ProductHero';

import type {ReactNode} from 'react';

export default async function MobileAppPage(): Promise<ReactNode> {
	// Fetch page data from Strapi CMS
	const page = await fetchMobileAppPage();

	// Handle case where page data is not found
	if (!page) {
		console.error('Mobile App page data not found');
		return notFound();
	}

	return (
		<main className={'flex w-full flex-col items-center justify-center'}>
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
