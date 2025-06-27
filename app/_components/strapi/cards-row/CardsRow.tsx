import {Fragment} from 'react';

import {LocalizedLink} from '@/app/_components/LocalizedLink';
import {RoundButton} from '@/app/_components/RoundButton';

import type {TCard, TCardsRowSection} from '@/app/_components/strapi/types';
import type {ReactNode} from 'react';

export default function CardsRow(props: {
	data: TCardsRowSection;
	children: (card: TCard) => ReactNode;
}): ReactNode | null {
	const {data, children} = props;
	if (!data) {
		return null;
	}

	return (
		<section className={'container relative mx-auto mb-[120px] md:px-4 lg:mb-60 lg:px-0'}>
			<div className={'mb-8 text-left text-[40px] font-normal leading-[48px] text-white lg:max-w-[60%]'}>
				{data?.title}
			</div>
			<div className={'row-span-full grid place-items-start gap-2 md:grid-cols-3'}>
				{data?.cards?.map((card): ReactNode => <Fragment key={card.id}>{children?.(card)}</Fragment>)}
			</div>
			{data?.ctaBlock && (
				<LocalizedLink
					className={
						'group mt-2 flex w-full items-center justify-between rounded-2xl bg-secondBg p-6 lg:p-10'
					}
					href={data?.ctaBlock?.url ?? '/'}
					target={data?.ctaBlock?.target}>
					<div className={'text-2xl text-white'}>{data?.ctaBlock?.title}</div>
					<RoundButton
						iconName={'arrow'}
						className={
							'bg-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'
						}
					/>
				</LocalizedLink>
			)}
		</section>
	);
}
