/************************************************************************************************
 ** TradeProductHero Component:
 **
 ** Server component for the Trade product page hero section
 ** Displays title, description, CTA button, featured image, and stats
 **
 ** Features:
 ** - Custom responsive image handling for the trade page
 ** - Integration with ProductStats component
 ** - Specially designed for the Trade product's unique layout needs
 **
 ** Usage:
 ** - Used specifically on the Trade product page
 ** - Pass all required product data from parent component
 ** - Handle server-side rendering properly for images and content
 ************************************************************************************************/

import Image from 'next/image';

import {Button} from '@/components/common/Button';

import {ProductStats} from './ProductStats';

import type {TButton, TStat, TStrapiImage} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TTradeProductHeroProps = {
	title: string;
	description: string;
	buttonCta: TButton;
	featuredImg: TStrapiImage;
	stats: TStat[];
};

export function TradeProductHero({
	title,
	description,
	buttonCta,
	featuredImg,
	stats
}: TTradeProductHeroProps): ReactNode {
	return (
		<section className={'relative mb-[120px] pt-10 md:px-4 lg:mb-60 lg:px-0 lg:pt-52'}>
			<div className={'container mx-auto'}>
				{/* Title, description and CTA button */}
				<div className={'grid gap-10 lg:grid-cols-2'}>
					<h1 className={'mb-4 text-4xl font-normal leading-10 lg:text-7xl'}>{title}</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-sm font-normal text-gray-500 lg:text-xl'}>{description}</p>
						<Button
							variant={'blue'}
							title={buttonCta?.title ?? 'Title'}
							href={buttonCta?.url ?? '/'}
							hasArrow
							className={'!w-full lg:!w-[232px]'}
						/>
					</div>
				</div>

				{/* Featured image with responsive display */}
				<div className={'mt-20 overflow-hidden rounded-2xl'}>
					<Image
						src={`${process.env.STRAPI_URL}${featuredImg.url}`}
						alt={title}
						width={1400}
						height={featuredImg.height ?? 0}
						className={'hidden lg:block'}
					/>
					<Image
						src={`${process.env.STRAPI_URL}${featuredImg.url}`}
						alt={title}
						width={1000}
						height={featuredImg.height ?? 0}
						className={'block lg:hidden'}
					/>
				</div>

				{/* Stats section */}
				<ProductStats stats={stats} />
			</div>
		</section>
	);
}
