import Image from 'next/image';

import {cl} from '@/components/utils/cl';

import type {TCard} from '@/types/strapi';
import type {ReactNode} from 'react';

export function Card({data}: {data: TCard}): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden h-full rounded-t-2xl',
				data.isTextFirst ? 'flex-col-reverse rounded-b-2xl' : 'flex-col'
			)}>
			<div className={'h-full bg-secondBg p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
				<div className={'text-gray-500'}>{data?.description}</div>
			</div>
			<div className={cl('overflow-hidden min-h-64', data.isTextFirst ? 'rounded-t-2xl' : 'rounded-b-2xl')}>
				<Image
					src={`${process.env.STRAPI_URL}${data?.image.url}`}
					alt={data?.title}
					width={461}
					height={219}
					className={'size-full object-cover'}
					unoptimized
				/>
			</div>
		</div>
	);
}
