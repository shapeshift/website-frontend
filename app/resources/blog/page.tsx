import Image from 'next/image';
import Link from 'next/link';

import {Banner} from '@/components/common/Banner';
import {TabItem} from '@/components/common/TabItem';

import type {TBlogListResponse, TBlogPost} from '@/types/strapi';
import type {ReactNode} from 'react';

const tabs = [
	{
		title: 'All posts',
		slug: 'all'
	},
	{
		title: 'News',
		slug: 'news'
	},
	{
		title: 'Announcements',
		slug: 'announcements'
	},
	{
		title: 'Tutorials',
		slug: 'tutorials'
	}
];

/********************************************************************************************
 * Fetches blog posts with proper error handling and typing
 * Includes cache and revalidation settings
 ********************************************************************************************/
async function getBlogPosts(): Promise<TBlogListResponse> {
	try {
		const res = await fetch(`${process.env.STRAPI_URL}/api/posts`, {
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			},
			next: {revalidate: 3600} // Cache for 1 hour
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch posts: ${res.status}`);
		}

		return res.json();
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return {data: [], meta: {pagination: {page: 1, pageSize: 10, pageCount: 0, total: 0}}};
	}
}

export default async function BlogList(): Promise<ReactNode> {
	const response = await getBlogPosts();
	const posts = response?.data ?? [];

	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-8 text-h1 leading-[72px]'}>
				<span className={'text-white'}>{'ShapeShift'}</span>
				&nbsp;
				<span className={'text-blue'}>{'Blog.'}</span>
			</div>

			<div className={'mb-6 flex w-min gap-4 rounded-full border border-white/10 p-1'}>
				{tabs.map(tab => (
					<TabItem
						key={tab.slug}
						title={tab.title}
					/>
				))}
			</div>
			{posts.length === 0 ? (
				<p className={'mb-20 text-gray-400'}>{'No blog posts found.'}</p>
			) : (
				<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
					{posts.map(post => (
						<BlogPost
							key={post.slug}
							post={post}
						/>
					))}
				</div>
			)}
			<Banner />
		</main>
	);
}

const BlogPost = ({post}: {post: TBlogPost}): ReactNode => {
	console.log(post);
	return (
		<Link
			href={`/resources/blog/${post.slug}`}
			className={'rounded-2xl bg-secondBg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'}>
			<div className={'max-h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.featuredImage?.url ? (
					<Image
						src={post?.featuredImage?.url ?? ''}
						alt={post.slug}
						width={post?.featuredImage?.width ?? 0}
						height={post?.featuredImage?.height ?? 0}
						className={'transition-transform duration-300 hover:scale-110'}
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
};
