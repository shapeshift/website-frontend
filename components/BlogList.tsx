'use client';

import {useFetchPosts} from '@/hooks/useFetchPosts';

import {BlogPost} from './BlogPost';

import type {TBlogPost} from '@/types/strapi';
import type {ReactNode} from 'react';

export function LatestBlogPosts({limit}: {limit: number}): ReactNode {
	const {posts} = useFetchPosts({page: 1, pageSize: limit, sort: 'desc'});
	return (
		<div className={'mb-[240px] grid w-full grid-cols-3 gap-4'}>
			{posts.map((post: TBlogPost) => (
				<BlogPost
					key={post.id}
					post={post}
				/>
			))}
		</div>
	);
}
