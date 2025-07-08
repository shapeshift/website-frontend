import Image from 'next/image';
import {useMemo} from 'react';

import {LocalizedLink} from './LocalizedLink';
import {cl} from '../_utils/cl';

import type {TBlogPost} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

/********************************************************************************************
 * Blog Post Card Component
 *
 * Displays a blog post preview card with image, title, date, and category.
 * Handles both internal and external blog links.
 ********************************************************************************************/

export function BlogPost({
	post,
	className,
	isClassic = false
}: {
	post: TBlogPost;
	className?: string;
	isClassic?: boolean;
}): ReactNode {
	if (post.isFeatured && !isClassic) {
		return (
			<>
				<FeaturedPost
					post={post}
					className={'hidden lg:grid'}
				/>
				<PostCard
					post={post}
					className={'!bg-slate-800 lg:hidden'}
				/>
			</>
		);
	}

	return (
		<PostCard
			post={post}
			className={className}
		/>
	);
}

function FeaturedPost({post, className}: {post: TBlogPost; className?: string}): ReactNode {
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
			href={`/blog/${post.slug}`}
			className={cl('col-span-3 h-[364px] grid grid-cols-2 rounded-2xl bg-secondBg p-6', className)}>
			<div
				className={'no-translate col-span-1 size-full max-h-[316px] max-w-[632px] overflow-hidden rounded-2xl'}>
				{post?.featuredImg?.url ? (
					<Image
						src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post?.featuredImg.url}`}
						alt={post.slug}
						width={post?.featuredImg.width ?? 0}
						height={post?.featuredImg.height ?? 0}
						className={'no-translate size-full object-cover'}
					/>
				) : (
					<div className={'h-full max-h-[316px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'col-span-1 ml-6 flex size-full flex-col justify-end gap-2'}>
				<div className={'flex items-center'}>
					{post.type?.length > 1 && (
						<p className={'no-translate mr-2 text-xs text-blue'}>{post?.type.join(', ')}</p>
					)}
					<p className={'no-translate text-xs text-gray-500'}>{formatDate(post.publishedAt)}</p>
				</div>
				<div>
					<p className={'no-translate text-[32px] leading-[40px]'}>{post.title}</p>
				</div>
			</div>
		</LocalizedLink>
	);
}

function PostCard({post, className}: {post: TBlogPost; className?: string}): ReactNode {
	/********************************************************************************************
	 * Memo: Creates a date formatting function
	 * No dependencies as it's a static function
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
			href={`/blog/${post.slug}`}
			className={cl(
				'rounded-2xl p-6 transition-all bg-secondBg duration-300 hover:scale-[1.02] hover:bg-secondHoverBg',
				className
			)}>
			<div className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.featuredImg?.url ? (
					<Image
						src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post?.featuredImg?.url}`}
						alt={post.slug}
						width={post?.featuredImg?.width ?? 0}
						height={post?.featuredImg?.height ?? 0}
						className={'size-full object-cover'}
					/>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'mt-6 flex flex-col gap-2'}>
				<div className={'flex items-center'}>
					{post.type?.length > 1 && (
						<p className={'no-translate mr-2 text-xs text-blue'}>{post?.type.join(', ')}</p>
					)}
					<p className={'no-translate text-xs text-gray-500'}>{formatDate(post.publishedAt)}</p>
				</div>
				<div>
					<p className={'no-translate text-2xl'}>{post.title}</p>
				</div>
			</div>
		</LocalizedLink>
	);
}
