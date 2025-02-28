import Image from 'next/image';
import Link from 'next/link';

import {RoundButton} from './common/RoundButton';
import {cl} from './utils/cl';

import type {TCard} from '@/types/strapi';
import type {ReactNode} from 'react';

function Card({data}: {data: TCard}): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden group rounded-2xl group h-full bg-secondBg hover:bg-secondHoverBg cursor-pointer',
				data.isTextFirst ? 'flex-col-reverse rounded-b-2xl' : 'flex-col'
			)}>
			<div className={'relative h-full p-6 lg:p-10'}>
				<div className={'w-full'}>
					<div className={'mb-2 text-2xl text-white'}>{data?.title}</div>
					<div className={'pr-16 text-gray-500'}>{data?.description}</div>
				</div>

				<RoundButton
					iconName={'arrow'}
					className={
						'bg-blue-500 !absolute right-4 top-4 group-hover:scale-110 group-hover:bg-blueHover lg:right-6 lg:top-6'
					}
				/>
			</div>
			<div
				className={cl(
					'overflow-hidden min-h-64 group-hover:scale-[1.02] duration-300 transition-all',
					data.isTextFirst ? 'rounded-t-2xl' : 'rounded-b-2xl'
				)}>
				<Image
					src={data?.image.url}
					alt={data?.title}
					width={461}
					height={219}
					className={cl('size-full object-cover', data.isTextFirst ? 'rounded-t-2xl' : 'rounded-b-2xl')}
				/>
			</div>
		</div>
	);
}

export function LandingCard({data}: {data: TCard}): ReactNode {
	if (data?.href) {
		return (
			<Link
				href={data?.href}
				className={'size-full'}>
				<Card data={data} />
			</Link>
		);
	}
	return <Card data={data} />;
}
