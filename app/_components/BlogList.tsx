'use client';

import {Button} from '@/app/_components/Button';
import {useFetchPosts} from '@/app/_hooks/useFetchPosts';

import {BlogPost} from './BlogPost';
import {LocalizedLink} from './LocalizedLink';

import type {TBlogPost} from '@/app/_components/strapi/types';
import type {ReactNode} from 'react';

export function LatestBlogPosts({limit, isWithTitle = true}: {limit: number; isWithTitle?: boolean}): ReactNode {
	const {posts} = useFetchPosts({page: 1, pageSize: limit, sort: 'desc'});
	return (
		<div className={'grid w-full grid-cols-1 gap-4 lg:grid-cols-3'}>
			{isWithTitle && (
				<div className={'col-span-1 flex flex-col gap-16'}>
					<h1 className={'text-[40px] leading-10 text-white lg:text-7xl'}>{'Read more about ShapeShift.'}</h1>
					<LocalizedLink href={'/blog'}>
						<Button title={'See all articles'} />
					</LocalizedLink>
				</div>
			)}
			{posts.map((post: TBlogPost) => (
				<BlogPost
					key={post.id}
					post={post}
					isClassic={true}
				/>
			))}
		</div>
	);
}
