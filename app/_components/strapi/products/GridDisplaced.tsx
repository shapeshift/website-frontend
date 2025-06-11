'use client';

import Image from 'next/image';
import {useMemo} from 'react';

import {BuyCryptoCard} from './BuyCryptoCard';
import {CarouselCard} from './CarouselCard';
import {ChainBubblesCard} from './ChainBubblesCard';

import type {TGridDisplacedSection} from '@/app/_components/strapi/types';
import type {ReactNode} from 'react';

export default function GridDisplaced({data}: {data: TGridDisplacedSection}): ReactNode | null {
	// Create an array of random delays for each bubble
	const randomDelays = useMemo(
		() => data?.cards[0].items?.map(() => Math.random() * 2) || [],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(data?.cards)]
	);

	if (!data) {
		return null;
	}

	return (
		<section className={'container relative'}>
			<div className={'grid grid-cols-1 gap-2 lg:grid-cols-3'}>
				<div className={'col-span-2 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl'}>
					<div className={'col-span-2 p-10'}>
						<p className={'text-[28px] leading-[32px] lg:text-[40px] lg:leading-[48px]'}>{data?.title}</p>
					</div>

					<ChainBubblesCard
						title={data?.cards[0].title}
						description={data?.cards[0].description}
						items={data?.cards[0].items}
						randomDelays={randomDelays}
					/>

					<div className={'col-span-2 grid h-full grid-cols-2 gap-2'}>
						<CarouselCard
							title={data?.cards[1]?.title}
							description={data?.cards[1]?.description}
							items={data?.cards[1]?.items}
							image={data?.cards[1]?.image}
						/>
						<div className={'flex flex-col rounded-2xl bg-secondBg'}>
							<div className={'p-10'}>
								<p className={'text-2xl text-white'}>{data?.cards[2]?.title}</p>
								<p className={'text-gray-500'}>{data?.cards[2]?.description}</p>
							</div>
							<div className={'mt-auto overflow-hidden'}>
								<Image
									src={`${process.env.STRAPI_URL}${data?.cards[2]?.image?.url}`}
									alt={data?.cards[2]?.title}
									width={696}
									height={168}
									className={'w-full object-contain'}
								/>
							</div>
						</div>
					</div>
				</div>
				<BuyCryptoCard />
			</div>
		</section>
	);
}
