'use client';

import Link from 'next/link';

import {useFetchPosts} from '@/hooks/useFetchPosts';

import {BlogPost} from './BlogPost';
import {Button} from './common/Button';

import type {TBlogPost} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export function LatestBlogPosts({limit, isWithTitle = true}: {limit: number; isWithTitle?: boolean}): ReactNode {
	const {posts} = useFetchPosts({page: 1, pageSize: limit, sort: 'desc'});
	return (
		<div className={'grid w-full grid-cols-1 gap-4 lg:grid-cols-3'}>
			{isWithTitle && (
				<div className={'col-span-1 flex flex-col gap-16'}>
					<h1 className={'text-[40px] leading-10 text-white lg:text-7xl'}>{'Read more about ShapeShift.'}</h1>
					<Link href={'/blog'}>
						<Button title={'See all articles'} />
					</Link>
				</div>
			)}
			{posts.map((post: TBlogPost) => (
				<BlogPost
					key={post.id}
					post={post}
				/>
			))}
		</div>
	);
}
