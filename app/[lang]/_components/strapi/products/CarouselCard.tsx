'use client';

import Image from 'next/image';

import {Carousel} from '@/app/[lang]/_components/Carousel';
import {LocalizedLink} from '@/app/[lang]/_components/LocalizedLink';

import type {TStrapiImage} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

type TCarouselCardProps = {
	title: string;
	description: string;
	items?: {image?: TStrapiImage; url?: string}[];
	image?: TStrapiImage;
};

export function CarouselCard({title, description, items, image}: TCarouselCardProps): ReactNode {
	return (
		<div className={'flex flex-col rounded-2xl bg-secondBg'}>
			<div className={'p-10'}>
				<p className={'text-2xl text-white'}>{title}</p>
				<p className={'text-gray-500'}>{description}</p>
				<div className={'-mx-10 -mb-5 mt-10 overflow-hidden'}>
					{items ? (
						<Carousel
							pauseOnHover
							speed={20}
							className={''}>
							{items?.map(({image, url}, index) => (
								<LocalizedLink
									href={url ?? 'https://app.shapeshift.com'}
									key={index}
									className={'mx-6'}>
									<div className={'relative flex max-h-10 w-max items-center justify-start'}>
										<Image
											src={`${process.env.STRAPI_URL}${image?.url ?? ''}`}
											alt={image?.url || ''}
											width={696}
											height={168}
											className={'h-10 w-auto'}
										/>
									</div>
								</LocalizedLink>
							))}
						</Carousel>
					) : (
						<div className={'mt-auto overflow-hidden'}>
							<Image
								src={`${process.env.STRAPI_URL}${image?.url ?? ''}`}
								alt={title}
								width={696}
								height={168}
								className={'w-full object-contain'}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
