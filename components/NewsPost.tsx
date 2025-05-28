/********************************************************************************************
 * News Post Card Component
 *
 * Displays a news article preview card with:
 * - Featured image
 * - Title and description
 * - Author/category and publication date
 * - Handles both internal and external article links
 *
 * Features:
 * - Responsive design
 * - Hover animations
 * - Fallback image handling
 * - Date formatting
 ********************************************************************************************/

import Image from 'next/image';
import {useMemo} from 'react';

import {LocalizedLink} from './common/LocalizedLink';
import {cl} from './utils/cl';

import type {TNewsroomPost} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export function NewsPost({post, className}: {post: TNewsroomPost; className?: string}): ReactNode {
	/********************************************************************************************
	 * Memo: Creates a reusable date formatting function
	 * Returns date in format: Month Day, Year
	 * No dependencies as it's a static formatter
	 ********************************************************************************************/
	const formatDate = useMemo(
		() =>
			(date: string): string => {
				return new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});
			},
		[]
	);

	return (
		<LocalizedLink
			rel={'noopener noreferrer'}
			target={post.externalURL ? '_blank' : '_self'}
			href={post.externalURL ? post.externalURL : `/newsroom/${post.slug}`}
			className={cl(
				'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-secondHoverBg',
				className
			)}>
			{/* Featured Image Container */}
			<div className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.featuredImg?.url ? (
					<Image
						src={`${process.env.STRAPI_URL}${post?.featuredImg?.url}`}
						alt={post.slug}
						width={post?.featuredImg?.width ?? 0}
						height={post?.featuredImg?.height ?? 0}
						className={'size-full object-cover'}
					/>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			{/* Post Meta Information */}
			<div className={'mt-6 flex flex-col gap-2'}>
				<div className={'flex items-center'}>
					<p className={'mr-2 text-xs text-blue'}>{post.author || post.category}</p>
					<p className={'text-xs text-gray-500'}>{formatDate(post.publishedOn || post.publishedAt)}</p>
				</div>
				<div>
					<p className={'text-2xl text-white'}>{post.title}</p>
				</div>
			</div>
		</LocalizedLink>
	);
}
