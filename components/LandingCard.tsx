import Image from 'next/image';

import {RoundButton} from './common/RoundButton';
import {cl} from './utils/cl';

import type {TCard} from '@/types/strapi';
import type {ReactNode} from 'react';

export function LandingCard({data}: {data: TCard}): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden rounded-t-2xl group h-full cursor-pointer',
				data.isTextFirst ? 'flex-col-reverse rounded-b-2xl' : 'flex-col'
			)}>
			<div className={'relative h-full bg-secondBg p-10'}>
				<div>
					<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
					<div className={'text-gray-500'}>{data?.description}</div>
				</div>

				<RoundButton
					iconName={'arrow'}
					className={'bg-blue-500 !absolute right-6 top-6 group-hover:scale-110 group-hover:bg-blueHover'}
					href={data?.href}
				/>
			</div>
			<div className={cl('overflow-hidden min-h-64', data.isTextFirst ? 'rounded-t-2xl' : 'rounded-b-2xl')}>
				<Image
					src={data?.image.url}
					alt={data?.title}
					width={461}
					height={219}
					className={cl('size-full object-cover', data.isTextFirst ? 'rounded-t-2xl' : 'rounded-b-2xl')}
					unoptimized
				/>
			</div>
		</div>
	);
}
