import Link from 'next/link';

import {RoundButton} from '../../common/RoundButton';

import type {TCard, TCardsRowSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function CardsRow({
	data,
	children
}: {
	data: TCardsRowSection;
	children: (card: TCard) => ReactNode;
}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'container relative mx-auto md:px-4 lg:px-0'}>
			<div className={'mb-8 text-left text-[40px] font-normal leading-[48px] text-white'}>{data?.title}</div>
			<div className={'row-span-full grid place-items-start gap-2 lg:grid-cols-3'}>
				{data?.cards.map(
					(card): ReactNode => (
						<div
							className={'h-full'}
							key={card.id}>
							{children?.(card)}
						</div>
					)
				)}
			</div>
			{data.ctaBlock && (
				<Link
					className={'group mt-2 flex w-full items-center justify-between rounded-2xl bg-secondBg p-10'}
					href={data?.ctaBlock?.url ?? '/'}>
					<div className={'text-2xl text-white'}>{data?.ctaBlock?.title}</div>
					<RoundButton
						iconName={'arrow'}
						className={
							'bg-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'
						}
					/>
				</Link>
			)}
		</section>
	);
}
