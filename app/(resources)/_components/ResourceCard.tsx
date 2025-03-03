/************************************************************************************************
 ** ResourceCard Component:
 **
 ** A reusable card component for displaying resource items with image, title, and description
 ** Optimized for protocols, chains, wallets, and other resource types
 **
 ** Features:
 ** - Animated hover effects with framer-motion
 ** - Consistent image display with configurable position
 ** - Truncated description with proper line clamps
 ** - Fully responsive design
 **
 ** Usage:
 ** - Import for any resource item that needs card-style display
 ** - Configure with title, description, image, and URL
 ** - Set imagePosition for different image alignments
 ************************************************************************************************/

'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

const MotionLink = motion(Link);

type TResourceCardProps = {
	slug: string;
	title: string;
	description: string;
	imageUrl: string;
	imageWidth?: number;
	imageHeight?: number;
	baseURL: string;
	imagePosition?: 'center' | 'bottom';
	altText?: string;
	className?: string;
};

export function ResourceCard({
	slug,
	title,
	description,
	imageUrl,
	imageWidth = 0,
	imageHeight = 0,
	baseURL,
	imagePosition = 'center',
	altText,
	className
}: TResourceCardProps): ReactNode {
	return (
		<MotionLink
			key={slug}
			initial={{opacity: 0, scale: 0.8}}
			animate={{opacity: 1, scale: 1}}
			transition={{duration: 0.3, ease: 'easeInOut'}}
			href={`${baseURL}/${slug}`}
			className={cl('group rounded-2xl bg-secondBg p-6 transition-colors hover:bg-secondHoverBg', className)}>
			{/* Card Image */}
			<div
				className={cl(
					'relative h-[204px] max-w-[408px] overflow-hidden rounded-2xl',
					imagePosition === 'center' ? 'p-10' : 'px-10 pt-10'
				)}>
				{/* Background Image */}
				<Image
					src={'/supported-wallets/cover.png'}
					alt={'background'}
					width={408}
					height={204}
					priority
					className={'pointer-events-none absolute inset-0 z-0 aspect-video size-full object-cover'}
				/>

				{/* Resource Image */}
				{imageUrl ? (
					<motion.div
						initial={{opacity: 0, scale: 0.9}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.5}}
						className={'relative z-10 size-full object-contain'}>
						<Image
							src={imageUrl.startsWith('http') ? imageUrl : `${process.env.STRAPI_URL}${imageUrl}`}
							alt={altText || title}
							width={imageWidth || 100}
							height={imageHeight || 100}
							className={cl(
								'size-full items-end object-contain transition-all group-hover:scale-105',
								imagePosition === 'center' ? '' : 'object-bottom'
							)}
						/>
					</motion.div>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			{/* Card Content */}
			<div className={'mt-6 flex flex-col gap-2'}>
				<div>
					<h3 className={'text-2xl text-white'}>{title}</h3>
					<p className={'line-clamp-6 whitespace-break-spaces break-keep text-sm text-gray-500'}>
						{description}
					</p>
				</div>
			</div>
		</MotionLink>
	);
}
