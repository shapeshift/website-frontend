'use client';

import {useMemo, useState} from 'react';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {TabItem} from '@/components/common/TabItem';
import {usePosts} from '@/hooks/usePosts';

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
	const {posts} = usePosts();
	const [currentTab, setCurrentTab] = useState<string>('all');

	const filteredPosts = useMemo(() => {
		if (currentTab === 'all') {
			return posts;
		}
		return posts.filter(post => post.type.includes(currentTab as 'announcements' | 'tutorials' | 'news'));
	}, [posts, currentTab]);

	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-8 text-7xl'}>
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
