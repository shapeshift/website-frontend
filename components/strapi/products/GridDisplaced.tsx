import Image from 'next/image';

import {cl} from '@/components/utils/cl';

import type {TCard, TGridDisplacedSection} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export default function GridDisplaced({data}: {data: TGridDisplacedSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'container relative mb-[120px] lg:mb-60'}>
			<div className={'grid gap-2 lg:grid-cols-2'}>
				<div className={'grid max-h-[744px] gap-2 overflow-hidden rounded-2xl'}>
					<div className={'grid-span-1 p-10'}>
						<p className={'text-[28px] leading-[32px] lg:text-[40px] lg:leading-[48px]'}>{data?.title}</p>
					</div>
					<div className={'grid-span-3 overflow-hidden rounded-2xl'}>
						<GridCard
							data={data?.cards[0]}
							imageWidth={696}
							imageHeight={280}
						/>
					</div>
				</div>
				<div className={'grid grid-rows-2 gap-2 lg:max-h-[744px]'}>
					<GridCard
						className={'row-span-1 overflow-hidden'}
						data={data?.cards[1]}
						imageWidth={696}
						imageHeight={168}
					/>
					<GridCard
						className={'row-span-1 overflow-hidden'}
						data={data?.cards[2]}
						imageWidth={696}
						imageHeight={168}
					/>
				</div>
			</div>
		</section>
	);
}

const GridCard = (props: {data: TCard; imageWidth: number; imageHeight: number; className?: string}): ReactNode => {
	const {data, imageWidth, imageHeight, className} = props;

	return (
		<div className={cl('flex flex-col rounded-2xl bg-secondBg', className)}>
			<div className={'p-10'}>
				<p className={'text-2xl text-white'}>{data?.title}</p>
				<p className={'text-gray-500'}>{data?.description}</p>
			</div>
			<div className={'mt-auto overflow-hidden'}>
				<Image
					src={`${process.env.STRAPI_URL}${data?.image.url}`}
					alt={data?.title}
					width={imageWidth}
					height={imageHeight}
					className={'w-full object-contain'}
				/>
			</div>
		</div>
	);
};
