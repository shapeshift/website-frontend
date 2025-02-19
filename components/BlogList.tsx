'use client';

import Link from 'next/link';

import {useFetchPosts} from '@/hooks/useFetchPosts';

import {BlogPost} from './BlogPost';
import {Button} from './common/Button';

import type {TBlogPost} from '@/types/strapi';
import type {ReactNode} from 'react';

export function LatestBlogPosts({limit}: {limit: number}): ReactNode {
	const {posts} = useFetchPosts({page: 1, pageSize: limit, sort: 'desc'});
	return (
		<div className={'mb-[240px] grid w-full grid-cols-3 gap-4'}>
			<div className={'col-span-1 flex flex-col gap-16'}>
				<h1 className={'text-7xl text-white'}>{'Read more about ShapeShift.'}</h1>
				<Link href={'/resources/blog'}>
					<Button title={'See all articles'} />
				</Link>
			</div>
			{posts.map((post: TBlogPost) => (
				<BlogPost
					key={post.id}
					post={post}
				/>
			))}
		</div>
	);
}
