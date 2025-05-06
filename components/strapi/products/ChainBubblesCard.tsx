'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {PRODUCTS_DICT} from '@/components/dictionary/products';

import type {TStrapiImage} from '@/components/strapi/types';
import type {ReactNode} from 'react';

const MotionLink = motion(Link);

type TChainBubblesCardProps = {
	title: string;
	description: string;
	items?: {url?: string; image?: TStrapiImage}[];
	randomDelays: number[];
};

export function ChainBubblesCard({title, description, items, randomDelays}: TChainBubblesCardProps): ReactNode {
	const hasChainItemsFromStrapi = items && items.length > 0;

	const chainItems = hasChainItemsFromStrapi ? items.slice(0, 5) : PRODUCTS_DICT.chainBubbles.defaultChains;

	return (
		<div className={'col-span-2 flex h-full flex-col rounded-2xl bg-secondBg'}>
			<div className={'min-h-[330px] p-10'}>
				<p className={'text-2xl text-white'}>{title}</p>
				<p className={'text-gray-500'}>{description}</p>

				<div className={'mt-14 hidden grid-cols-5 gap-4 lg:grid'}>
					{chainItems?.map((item, index) => (
						<div
							key={item.url}
							className={'flex h-10 items-center justify-center lg:h-20'}>
							<MotionLink
								href={item.url ?? '#'}
								target={'_blank'}
								className={
									'relative hidden items-center justify-center rounded-full border-2 border-[#386FF91A] bg-[#386FF91A] transition-all duration-300 lg:flex lg:hover:!h-[120px] lg:hover:!w-[120px]'
								}
								initial={{width: 100, height: 100}}
								animate={{
									width: [100, 120, 90],
									height: [100, 120, 90]
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									repeatType: 'reverse',
									ease: 'easeInOut',
									delay: randomDelays[index]
								}}>
								<div
									className={
										'absolute left-1/2 top-1/2 size-[62px] -translate-x-1/2 -translate-y-1/2'
									}>
									<Image
										src={`${hasChainItemsFromStrapi ? process.env.STRAPI_URL : ''}${item.image?.url ?? ''}`}
										alt={item.image?.url || ''}
										width={62}
										height={62}
										className={'size-[62px]'}
									/>
								</div>
							</MotionLink>
						</div>
					))}
				</div>
				<div className={'mt-14 grid grid-cols-3 gap-4 lg:hidden'}>
					{chainItems.slice(0, 3)?.map((item, index) => (
						<div
							key={item.url}
							className={'flex h-10 items-center justify-center lg:h-20'}>
							<MotionLink
								href={item.url ?? '#'}
								target={'_blank'}
								className={
									'relative flex items-center justify-center rounded-full border-2 border-[#386FF91A] bg-[#386FF91A] transition-all hover:!h-[130px] hover:!w-[130px] lg:hidden'
								}
								initial={{width: 70, height: 70}}
								animate={{
									width: [70, 100, 70],
									height: [70, 100, 70]
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									repeatType: 'reverse',
									ease: 'easeInOut',
									delay: randomDelays[index]
								}}>
								<div
									className={
										'absolute left-1/2 top-1/2 size-[32px] -translate-x-1/2 -translate-y-1/2'
									}>
									<Image
										src={`${hasChainItemsFromStrapi ? process.env.STRAPI_URL : ''}${item.image?.url ?? ''}`}
										alt={item.image?.url || ''}
										width={62}
										height={62}
										className={'size-[32px]'}
									/>
								</div>
							</MotionLink>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
