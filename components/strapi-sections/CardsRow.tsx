import Image from 'next/image';

import {RoundButton} from '../common/RoundButton';
import {cl} from '../utils/cl';

import type {TCard, TCardsRowSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function CardsRow({data}: {data: TCardsRowSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'container relative mx-auto mb-60 md:px-4 lg:px-0'}>
			<div className={'mb-8 text-left text-[40px] font-normal leading-[48px] text-white'}>{data?.title}</div>
			<div className={'grid place-items-start gap-2 lg:grid-cols-3'}>
				{data?.cards.map(card => (
					<Card
						key={card.id}
						data={card}
					/>
				))}
			</div>
			{data.ctaBlock && (
				<div className={'mt-2 flex w-full items-center justify-between rounded-2xl bg-secondBg p-10'}>
					<div className={'text-2xl text-white'}>{data?.ctaBlock?.title}</div>
					<RoundButton
						iconName={'arrow'}
						className={'bg-blue-500'}
						href={data?.ctaBlock?.url ?? '/'}
					/>
				</div>
			)}
		</section>
	);
}

function Card({data}: {data: TCard}): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden rounded-t-2xl',
				data.isTextFirst ? 'flex-col-reverse rounded-b-2xl' : 'flex-col'
			)}>
			<div className={'bg-secondBg p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
				<div className={'text-gray-500'}>{data?.description}</div>
			</div>
			<div className={cl('overflow-hidden ', data.isTextFirst ? 'rounded-t-2xl' : 'rounded-b-2xl')}>
				<Image
					src={`${process.env.STRAPI_URL}${data?.image.url}`}
					alt={data?.title}
					width={461}
					height={219}
					className={'w-full'}
					unoptimized
				/>
			</div>
		</div>
	);
}
