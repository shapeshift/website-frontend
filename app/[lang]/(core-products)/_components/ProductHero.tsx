/************************************************************************************************
 ** ProductHero Component:
 **
 ** Reusable hero section for product pages with consistent layout and styling
 ** Displays product title, description, CTA button, and a featured image
 **
 ** Props:
 ** - title: Main product title displayed prominently
 ** - description: Product description text
 ** - buttonCta: Call-to-action button configuration (title, URL)
 ** - featuredImg: Featured image to display below the text content
 ** - children: Optional additional content to render in the hero section
 **
 ** Styling:
 ** - Responsive layout with single column on mobile, two columns on desktop
 ** - Consistent spacing and typography across product pages
 ** - Handles image display with proper responsiveness
 ************************************************************************************************/

import Image from 'next/image';

import {Button} from '@/app/[lang]/_components/Button';

import type {TButton, TStrapiImage} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

type TProductHeroProps = {
	title: string;
	description: string;
	buttonCta?: TButton; // Optional because mobile-app doesn't use it
	featuredImg: TStrapiImage;
	children?: ReactNode; // Additional content like stats or download buttons
	buttonClassName?: string;
};

export function ProductHero({
	title,
	description,
	buttonCta,
	featuredImg,
	children,
	buttonClassName = '!w-full lg:!w-[232px]'
}: TProductHeroProps): ReactNode {
	return (
		<section className={'relative mb-[120px] pt-10 md:px-4 lg:mb-60 lg:px-0 lg:pt-52'}>
			<div className={'container mx-auto'}>
				<div className={'grid gap-10 lg:grid-cols-2'}>
					<h1 className={'mb-4 text-4xl font-normal leading-10 lg:text-7xl'}>{title}</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-sm font-normal text-gray-500 lg:text-xl'}>{description}</p>
						{buttonCta ? (
							<Button
								variant={'blue'}
								title={buttonCta?.title ?? 'Title'}
								href={buttonCta?.url ?? '/'}
								hasArrow
								className={buttonClassName}
							/>
						) : null}
						{children}
					</div>
				</div>

				<div className={'mt-20 aspect-[1400/400] overflow-hidden rounded-2xl'}>
					<Image
						src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${featuredImg.url}`}
						className={'aspect-[1400/400] w-full'}
						alt={title || 'Product feature image'}
						quality={100}
						width={2800}
						height={800}
					/>
				</div>
			</div>
		</section>
	);
}
