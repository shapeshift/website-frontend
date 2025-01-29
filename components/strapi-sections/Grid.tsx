import Image from 'next/image';

import {Button} from '../common/Button';

import type {TCard, TGridSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function Grid({data}: {data: TGridSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'container mb-60 grid w-full grid-cols-3'}>
			<div
				className={
					'relative col-span-1 flex h-[720px] w-[461px] flex-col items-center justify-center overflow-hidden rounded-2xl'
				}>
				<Image
					src={'/gridBg.png'}
					alt={'grid background'}
					width={461}
					height={720}
					className={'absolute inset-0'}
				/>
				<div className={'flex max-w-[300px] flex-col items-center justify-center'}>
					<div className={' text-center text-[40px] leading-[48px]'}>{data?.cardCta[0]?.title}</div>
					<div className={'mb-14 mt-4 text-center text-gray-500'}>{data?.cardCta[0]?.description}</div>
					<Button
						variant={'blue'}
						title={data?.cardCta[0].buttonCta[0]?.title}
						href={data?.cardCta[0].buttonCta[0]?.url ?? '/'}
					/>
				</div>
			</div>
			<div className={'max-ht-[720px] col-span-2 flex flex-col gap-2'}>
				<div className={'col-span-2'}>
					<Card data={data?.card[0]} />
				</div>
				<div className={'grid grid-cols-2 gap-2'}>
					<div className={'col-span-1'}>
						<Card data={data?.card[1]} />
					</div>
					<div className={'col-span-1'}>
						<Card data={data?.card[2]} />
					</div>
				</div>
			</div>
		</section>
	);
}

function Card({data}: {data: TCard}): ReactNode {
	return (
		<div className={'max-h-[356px] overflow-hidden rounded-2xl'}>
			<div className={'bg-secondBg p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
				<div className={'text-gray-500'}>{data?.description}</div>
			</div>
			<Image
				src={`${process.env.STRAPI_URL}${data?.image.url}`}
				alt={data?.title}
				width={461}
				height={219}
				className={'w-full'}
				unoptimized
			/>
		</div>
	);
}
