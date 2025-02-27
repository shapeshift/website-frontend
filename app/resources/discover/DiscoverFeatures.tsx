import Link from 'next/link';

import {RoundButton} from '@/components/common/RoundButton';
import {Card} from '@/components/strapi-sections/cards-row/Card';

import type {TCard} from '@/types/strapi';
import type {ReactNode} from 'react';

export function DiscoverFeatures({data, name}: {data: TCard[]; name: string}): ReactNode {
	return (
		<section className={'container relative mx-auto mt-[60px] md:px-4 lg:mt-60 lg:px-0'}>
			<div className={'mb-8 text-left text-[40px] font-normal leading-[48px] text-white lg:max-w-[60%]'}>
				{`${name}: explained`}
			</div>
			<div className={'row-span-full grid place-items-start gap-2 md:grid-cols-3'}>
				{data?.map(
					(card): ReactNode => (
						<Card
							key={card.id}
							data={card}
							smaller
						/>
					)
				)}
			</div>
			<Link
				className={'group mt-2 flex w-full items-center justify-between rounded-2xl bg-secondBg p-6 lg:p-10'}
				href={'https://app.shapeshift.com'}>
				<div className={'text-2xl text-white'}>{'Discover Shapeshift now'}</div>
				<RoundButton
					iconName={'arrow'}
					className={'bg-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'}
				/>
			</Link>
		</section>
	);
}
