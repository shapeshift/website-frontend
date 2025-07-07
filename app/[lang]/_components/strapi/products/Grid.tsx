import Image from 'next/image';

import {Button} from '@/app/[lang]/_components/Button';
import {cl} from '@/app/[lang]/_utils/cl';

import type {TCard, TGridSection} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

export default function Grid({data}: {data: TGridSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'container mb-60 grid w-full grid-cols-1 gap-2 lg:grid-cols-3'}>
			<div
				className={'col-span-1 row-span-3 hidden rounded-2xl lg:block'}
				style={{
					background: 'linear-gradient(180deg, #FBA590 0%, #AE5367 50%, #1F5A9E 100%)',
					padding: 2
				}}>
				<div
					style={{
						background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
					}}
					className={cl('flex flex-col items-center justify-center rounded-2xl h-full w-full')}>
					<div className={'relative z-50 flex max-w-[300px] flex-col items-center justify-center'}>
						<div className={' text-center text-[40px] leading-[48px]'}>{data?.cardCta[0]?.title}</div>
						<div className={'mb-14 mt-4 text-center text-gray-500'}>{data?.cardCta[0]?.description}</div>
						<Button
							variant={'blue'}
							title={data?.cardCta[0]?.buttonCta?.title ?? 'Click Here'}
							href={data?.cardCta[0]?.buttonCta?.url ?? '/'}
						/>
					</div>
				</div>
			</div>
			<div>
				<div className={'mb-6 text-left text-[28px] leading-[32px] lg:hidden'}>{data?.cardCta[0]?.title}</div>
			</div>
			<Card
				data={data?.card[0]}
				className={'col-span-1 h-[356px] lg:col-span-2'}
			/>
			<Card
				data={data?.card[1]}
				className={'col-span-1 h-[356px]'}
			/>
			<Card
				data={data?.card[2]}
				className={'col-span-1 h-[356px]'}
			/>
		</section>
	);
}

function Card({data, className}: {data: TCard; className: string}): ReactNode {
	return (
		<div className={`relative overflow-hidden rounded-2xl bg-secondBg ${className}`}>
			<div className={'relative z-30 p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
				<div className={'text-gray-500'}>{data?.description}</div>
			</div>
			<Image
				src={`${process.env.STRAPI_URL}${data?.image.url}`}
				alt={data?.title}
				width={data?.image.width}
				height={data?.image.height}
				className={'absolute inset-x-0 bottom-0 z-10 mt-auto w-full object-contain'}
			/>
		</div>
	);
}
