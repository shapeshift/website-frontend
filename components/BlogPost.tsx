import Image from 'next/image';
import Link from 'next/link';

import type {TBlogPost} from '@/types/strapi';
import type {ReactNode} from 'react';

export function BlogPost({post}: {post: TBlogPost}): ReactNode {
	return (
		<Link
			href={`/resources/blog/${post.slug}`}
			className={'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-secondHoverBg'}>
			<div className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.imageFeatured?.url ? (
					<Image
						src={`${process.env.STRAPI_URL}${post?.imageFeatured?.url}`}
						alt={post.slug}
						width={post?.imageFeatured?.width ?? 0}
						height={post?.imageFeatured?.height ?? 0}
						className={'size-full object-cover'}
					/>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'mt-6 flex flex-col gap-2'}>
				<div className={'flex items-center gap-2'}>
					<p className={'text-xs text-blue'}>{post.slug.replace(/-/g, ' ')}</p>
					<p className={'text-xs text-gray-500'}>{new Date(post.publishedAt).toLocaleDateString()}</p>
				</div>
				<div>
					<p className={'text-2xl text-white'}>{post.description}</p>
				</div>
			</div>
		</Link>
	);
}
