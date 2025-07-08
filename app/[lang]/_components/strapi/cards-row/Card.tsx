'use client';
import Image from 'next/image';

import {Button} from '@/app/[lang]/_components/Button';
import {cl} from '@/app/[lang]/_utils/cl';

import type {TCard} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

export function Card({data, smaller}: {data: TCard; smaller?: boolean}): ReactNode {
	if (data.isTextFirst) {
		return (
			<div
				className={cl(
					'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl group',
					'w-full flex-col'
				)}>
				<div className={'h-3/5 p-10'}>
					<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
					<p className={cl('text-gray-500 whitespace-break-spaces break-keep', smaller ? 'text-sm' : '')}>
						{data?.description}
					</p>
				</div>
				<div
					className={cl(
						'overflow-hidden aspect-video bg-secondBg group-hover:bg-secondHoverBg',
						'flex items-center justify-center mt-auto h-[40%]'
					)}
					style={{
						backgroundImage: "url('/chains/grid-bg.png')",
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
					<Image
						src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.image.url}`}
						alt={data?.title}
						width={461}
						height={219}
						className={cl(
							'size-full object-contain transition-all duration-300 group-hover:scale-105',
							smaller ? 'h-[156px] w-[156px]' : ''
						)}
					/>
				</div>
			</div>
		);
	}
	return (
		<div
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl group',
				'w-full flex-col'
			)}>
			<div
				className={cl(
					'overflow-hidden aspect-video bg-secondBg group-hover:bg-secondHoverBg',
					'flex items-center justify-center h-[40%]'
				)}
				style={{
					backgroundImage: "url('/chains/grid-bg.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}>
				<Image
					src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.image.url}`}
					alt={data?.title}
					width={461}
					height={219}
					className={cl(
						'size-full object-contain transition-all duration-300 group-hover:scale-105',
						'py-6 px-4 size-full'
					)}
				/>
			</div>
			<div className={'flex h-3/5 flex-col p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
				<div className={cl('text-gray-500 whitespace-break-spaces break-keep', smaller ? 'text-sm' : '')}>
					{data?.description}
				</div>
				{data?.buttonCta?.url && data?.buttonCta?.title && (
					<div className={'mt-auto pt-2'}>
						<Button
							variant={'white'}
							className={'whitespace-no-wrap !w-fit !text-sm'}
							href={data?.buttonCta?.url}
							title={data?.buttonCta?.title}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
