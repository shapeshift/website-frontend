import Image from 'next/image';
import Link from 'next/link';
import {useMemo} from 'react';

import {cl} from './utils/cl';

import type {TNewsroomPost} from '@/types/strapi';
import type {ReactNode} from 'react';

export function NewsPost({post, className}: {post: TNewsroomPost; className?: string}): ReactNode {
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
		<Link
			rel={'noopener noreferrer'}
			target={post.externalURL ? '_blank' : '_self'}
			href={post.externalURL ? post.externalURL : `/resources/newsroom/${post.slug}`}
			className={cl(
				'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-secondHoverBg',
				className
			)}>
			<div className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.featureImage?.url ? (
					<Image
						src={`${process.env.STRAPI_URL}${post?.featureImage?.url}`}
						alt={post.slug}
						width={post?.featureImage?.width ?? 0}
						height={post?.featureImage?.height ?? 0}
						className={'size-full object-cover'}
					/>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'mt-6 flex flex-col gap-2'}>
				<div className={'flex items-center'}>
					<p className={'mr-2 text-xs text-blue'}>{post.author || post.category}</p>
					<p className={'text-xs text-gray-500'}>{formatDate(post.publishedOn || post.publishedAt)}</p>
				</div>
				<div>
					<p className={'text-2xl text-white'}>{post.title}</p>
				</div>
			</div>
		</Link>
	);
}
