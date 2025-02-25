'use client';
import Image from 'next/image';

import {cl} from '@/components/utils/cl';

import type {TCard} from '@/types/strapi';
import type {ReactNode} from 'react';

export function Card({data}: {data: TCard}): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl group',
				'w-full',
				data.isTextFirst ? 'flex-col' : 'flex-col-reverse'
			)}>
			<div className={'p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
				<div className={'text-gray-500'}>{data?.description}</div>
			</div>
			<div
				className={cl(
					'overflow-hidden aspect-video bg-secondBg group-hover:bg-secondHoverBg',
					data.isTextFirst ? 'mt-auto' : ''
				)}
				style={{
					backgroundImage: "url('/supported-chains/grid-bg.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}>
				<Image
					src={`${process.env.STRAPI_URL}${data?.image.url}`}
					alt={data?.title}
					width={461}
					height={219}
					className={'size-full object-contain transition-all duration-300 group-hover:scale-105'}
				/>
			</div>
		</div>
	);
}
