'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';

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

export default function BlogList(): ReactNode {
	const [posts, setPosts] = useState<TBlogPost[]>([]);
	const [currentTab, setCurrentTab] = useState<string>('all');

	const filteredPosts = useMemo(() => {
		if (currentTab === 'all') {
			return posts;
		}
		return posts.filter(post => post.type.includes(currentTab as 'announcements' | 'tutorials' | 'news'));
	}, [posts, currentTab]);

	useEffect(() => {
		async function fetchPosts(): Promise<void> {
			try {
				const res = await fetch(`${process.env.STRAPI_URL}/api/posts?populate[0]=imageFeatured`, {
					headers: {
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
					}
				});

				if (!res.ok) {
					throw new Error(`Failed to fetch posts: ${res.status}`);
				}

				const data: TBlogListResponse = await res.json();
				setPosts(data.data);
				console.log(data.data);
			} catch (err) {
				console.error('Error fetching blog posts:', err);
			}
		}

		void fetchPosts();
	}, []);

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
						selected={currentTab === tab.slug}
						onClick={() => setCurrentTab(tab.slug)}
					/>
				))}
			</div>
			{posts.length === 0 ? (
				<p className={'mb-20 text-gray-400'}>{'No blog posts found.'}</p>
			) : (
				<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
					{filteredPosts.map(post => (
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

function BlogPost({post}: {post: TBlogPost}): ReactNode {
	return (
		<Link
			href={`/resources/blog/${post.slug}`}
			className={'rounded-2xl bg-secondBg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'}>
			<div className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.imageFeatured?.url ? (
					<Image
						src={`${process.env.STRAPI_URL}${post?.imageFeatured?.url}`}
						alt={post.slug}
						width={post?.imageFeatured?.width ?? 0}
						height={post?.imageFeatured?.height ?? 0}
						className={'size-full object-cover transition-transform duration-300 hover:scale-110'}
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
