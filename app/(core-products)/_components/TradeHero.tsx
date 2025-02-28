'use client';

/************************************************************************************************
** TradeHero Component:
**
** Client component for the Trade product page hero section
** Handles interactive elements like the CTA button with onClick handler
** 
** Features:
** - Client-side interactivity for button clicks
** - Responsive image handling with picture element
** - Integration with stats display
**
** Usage:
** - Used specifically on the Trade product page
** - Requires 'use client' directive for client-side interactivity
************************************************************************************************/

import {ProductStats} from './ProductStats';

import type {TButton, TStat} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TTradeHeroProps = {
	title: string;
	description: string;
	buttonCta: TButton;
	imageUrl: string;
	stats: TStat[];
};

export function TradeHero({
	title,
	description,
	buttonCta,
	imageUrl,
	stats
}: TTradeHeroProps): ReactNode {
	// Handle button click to open URL in new tab
	const handleButtonClick = () => {
		if (buttonCta?.url) {
			window.open(buttonCta.url, '_blank');
		}
	};

	return (
		<section className={'relative mb-[120px] pt-10 md:px-4 lg:mb-60 lg:px-0 lg:pt-52'}>
			<div className={'container mx-auto'}>
				{/* Title, description and CTA button */}
				<div className={'grid gap-10 lg:grid-cols-2'}>
					<h1 className={'mb-4 text-4xl font-normal leading-10 lg:text-7xl'}>{title}</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-sm font-normal text-gray-500 lg:text-xl'}>{description}</p>
						{buttonCta && (
							<button
								className={'bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white'}
								onClick={handleButtonClick}>
								{buttonCta.title}
							</button>
						)}
					</div>
				</div>

				{/* Featured image with responsive display */}
				<div className={'mt-20 overflow-hidden rounded-2xl'}>
					<picture>
						<source
							media={'(min-width: 1024px)'}
							srcSet={imageUrl}
						/>
						<img
							src={imageUrl}
							alt={title || 'Trade feature image'}
							className={'h-auto w-full'}
						/>
					</picture>
				</div>

				{/* Stats section */}
				<ProductStats stats={stats} />
			</div>
		</section>
	);
}