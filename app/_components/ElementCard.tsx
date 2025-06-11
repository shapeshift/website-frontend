'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {cl} from '@/app/_utils/cl';

import type {ReactNode} from 'react';

const MotionLink = motion(Link);

type TElementCardProps = {
	slug: string;
	title: string;
	description: string;
	featuredImg: {
		url: string;
		width: number;
		height: number;
	};
	baseURL: string;
	position: 'center' | 'bottom';
};

export function ElementCard(props: TElementCardProps): ReactNode {
	const {slug, title, description, featuredImg, baseURL, position} = props;

	return (
		<MotionLink
			key={slug}
			initial={{opacity: 0, scale: 0.8}}
			animate={{opacity: 1, scale: 1}}
			transition={{duration: 0.3, ease: 'easeInOut'}}
			href={`${baseURL}/${slug}`}
			className={cl('rounded-2xl p-6 transition-colors bg-secondBg hover:bg-secondHoverBg group')}>
			<div
				className={cl(
					'relative h-[204px] max-w-[408px] overflow-hidden rounded-2xl',
					position === 'center' ? 'p-10' : 'px-10 pt-10'
				)}>
				<Image
					src={'/wallets/cover.png'}
					alt={'cover'}
					width={408}
					height={204}
					priority
					className={'pointer-events-none absolute inset-0 z-0 aspect-video size-full object-cover'}
				/>
				{featuredImg?.url ? (
					<motion.div
						initial={{opacity: 0, scale: 0.9}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.5}}
						className={'relative z-10 size-full object-contain'}>
						<Image
							src={`${process.env.STRAPI_URL}${featuredImg?.url}`}
							alt={slug}
							width={featuredImg?.width ?? 0}
							height={featuredImg?.height ?? 0}
							className={cl(
								'size-full items-end object-contain transition-all group-hover:scale-105',
								position === 'center' ? '' : 'object-bottom'
							)}
						/>
					</motion.div>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'mt-6 flex flex-col gap-2'}>
				<div>
					<p className={'text-2xl text-white'}>{title}</p>
					<p className={'line-clamp-6 whitespace-break-spaces break-keep text-sm text-gray-500'}>
						{description}
					</p>
				</div>
			</div>
		</MotionLink>
	);
}
