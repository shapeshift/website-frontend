import Image from 'next/image';

import type {TCard, TGridDisplacedSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function GridDisplaced({data}: {data: TGridDisplacedSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'relative mb-60'}>
			<div className={'grid lg:grid-cols-2 lg:gap-2'}>
				<div className={'grid max-h-[744px] gap-2 overflow-hidden rounded-2xl'}>
					<div className={'grid-span-1 p-10'}>
						<p className={'text-[40px] leading-[48px]'}>{data?.title}</p>
					</div>
					<div className={'grid-span-3 overflow-hidden rounded-2xl'}>
						<GridCard
							data={data?.cards[0]}
							imageWidth={696}
							imageHeight={280}
						/>
					</div>
				</div>
				<div className={'grid max-h-[744px] grid-rows-2 gap-2'}>
					<div className={'row-span-1 overflow-hidden rounded-2xl'}>
						<GridCard
							data={data?.cards[1]}
							imageWidth={696}
							imageHeight={168}
						/>
					</div>
					<div className={'row-span-1 overflow-hidden rounded-2xl'}>
						<GridCard
							data={data?.cards[2]}
							imageWidth={696}
							imageHeight={168}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

const GridCard = ({
	data,
	imageWidth,
	imageHeight
}: {
	data: TCard;
	imageWidth: number;
	imageHeight: number;
}): ReactNode => {
	return (
		<div className={'flex flex-col'}>
			<div className={'bg-secondBg p-10'}>
				<p className={'text-2xl text-white'}>{data?.title}</p>
				<p className={'text-gray-500'}>{data?.description}</p>
			</div>
			<div className={'overflow-hidden rounded-b-2xl'}>
				<Image
					src={`${process.env.STRAPI_URL}${data?.image.url}`}
					alt={data?.title}
					width={imageWidth}
					height={imageHeight}
					className={'w-full object-cover'}
				/>
			</div>
		</div>
	);
};
