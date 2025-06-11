/************************************************************************************************
 ** Discover Detail Page:
 **
 ** Displays detailed information about a specific discovery item
 ** Shows header with key features, hero banner, and feature details
 **
 ** Features:
 ** - Dynamic metadata generation for SEO
 ** - Responsive layout with feature grid
 ** - Proper error handling with notFound()
 ** - Uses shared components for consistent layout
 **
 ** Data Flow:
 ** - Fetches data based on slug parameter
 ** - Populates page with discover details from Strapi CMS
 ** - Generates metadata for SEO and social sharing
 ************************************************************************************************/

import {notFound} from 'next/navigation';

import {DiscoverFeature} from '@/app/(resources)/_components/DiscoverFeature';
import {ResourceHeader} from '@/app/(resources)/_components/ResourceHeader';
import {ResourceHero} from '@/app/(resources)/_components/ResourceHero';
import {DEFAULT_FEATURES} from '@/app/(resources)/_utils/constants';
import {fetchDiscoverBySlug} from '@/app/(resources)/_utils/fetchUtils';
import {Banner} from '@/app/_components/Banner';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 * Generates metadata for the discover page
 * Provides SEO-optimized title, description, and social sharing tags
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	// Fetch discover data
	const discover = await fetchDiscoverBySlug(slug);
	if (!discover) {
		return notFound();
	}

	// Get image URL for metadata
	const imageUrl = discover.featuredImg?.formats?.thumbnail?.url || discover.featuredImg?.url;

	// Metadata with SEO optimization
	const metadata: Metadata = {
		title: `${discover.title} | Discover with ShapeShift`,
		description: `Discover ${discover.title} with ShapeShift!`,
		keywords: `${discover.title}, ShapeShift, discover, cryptocurrency`,
		openGraph: {
			title: discover.title,
			description: `Discover ${discover.title} with ShapeShift!`,
			type: 'website'
		},
		twitter: {
			card: 'summary_large_image',
			title: discover.title,
			description: `Discover ${discover.title} with ShapeShift!`
		}
	};

	if (imageUrl) {
		metadata.openGraph!.images = [
			{
				url: `${process.env.STRAPI_URL}${imageUrl}`
			}
		];
		metadata.twitter!.images = [
			{
				url: `${process.env.STRAPI_URL}${imageUrl}`
			}
		];
	}

	return metadata;
}

export default async function DiscoverDetailPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	// Extract slug from params
	const {slug} = await params;

	// Fetch discover data using utility function
	const discover = await fetchDiscoverBySlug(slug);

	// Handle case when discover data is not found
	if (!discover) {
		console.error(`Discover page not found for slug: ${slug}`);
		return notFound();
	}

	// Map discover features to feature section format
	const features = discover.features.map(feature => ({
		id: feature.id,
		title: feature.title,
		description: feature.description,
		image: feature.image
			? {
					url: `${process.env.STRAPI_URL}${feature.image.url}`,
					width: feature.image.width,
					height: feature.image.height,
					alt: feature.title
				}
			: undefined
	}));

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[60px] flex flex-col justify-center'}>
				{/* Header section with feature badges */}
				<ResourceHeader
					title={discover.title}
					description={discover.description}
					items={DEFAULT_FEATURES}
					ctaButton={{
						text: 'Get Started',
						url: 'https://app.shapeshift.com/'
					}}
				/>

				{/* Hero banner with discover image */}
				<ResourceHero
					imageSrc={'/wallets/hero.jpg'}
					imageAlt={`${discover.title} banner image`}
					logoSrc={`${process.env.STRAPI_URL}${discover.featuredImg.url}`}
					logoAlt={discover.title}
					logoWidth={discover.featuredImg.width}
					logoHeight={discover.featuredImg.height}
					priority
				/>

				{/* Features section */}
				<DiscoverFeature
					features={features}
					title={`Discover ${discover.title}`}
					description={'Explore the features and benefits of this technology.'}
					columns={3}
				/>

				{/* Footer banner */}
				<div className={'mb-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
