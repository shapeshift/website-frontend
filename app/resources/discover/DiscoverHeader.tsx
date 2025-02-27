import Image from 'next/image';
import {Fragment} from 'react';

import {Button} from '@/components/common/Button';

import type {ReactNode} from 'react';

type THeaderData = {
	description: string;
	items: string[];
	url: string;
	width: number;
	height: number;
	name: string;
};
export function DiscoverHeader(data: THeaderData): ReactNode {
	return (
		<Fragment>
			<section className={'flex flex-col items-center'}>
				<div className={'mb-10 flex flex-col items-center gap-2'}>
					<h1 className={'mb-6 text-center text-[40px] leading-10 lg:text-7xl'}>{data.name}</h1>
					<p className={'mx-auto max-w-screen-md text-center text-base text-gray-500 lg:text-xl'}>
						{data.description}
					</p>
				</div>
				<Button
					variant={'blue'}
					href={'https://app.shapeshift.com/'}
					title={'Get Started'}
				/>
			</section>
			<section className={'relative mt-12 flex w-full overflow-hidden rounded-2xl'}>
				<Image
					src={'/supported-wallets/hero.jpg'}
					alt={''}
					width={2800}
					height={720}
				/>
				<div className={'absolute inset-0 flex items-center justify-end py-6 pr-16'}>
					<Image
						src={data.url}
						alt={data.name}
						width={data.width}
						height={data.height}
						className={'my-auto h-full max-h-[256px] w-auto max-w-[256px]'}
					/>
				</div>
			</section>
		</Fragment>
	);
}
