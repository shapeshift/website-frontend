'use client';

import Link from 'next/link';

import {usePosts} from '@/components/contexts/BlogContext';

import {BlogPost} from './BlogPost';
import {Button} from './common/Button';

import type {TBlogPost} from '@/types/strapi';
import type {ReactNode} from 'react';

export function BlogList(): ReactNode {
	const {posts} = usePosts();
	return (
		<div className={'mb-[240px] grid w-full grid-cols-3 gap-4'}>
			<div className={'col-span-1 flex flex-col gap-16'}>
				<h1 className={'text-7xl text-white'}>{'Read more about ShapeShift.'}</h1>
				<Link href={'/resources/blog'}>
					<Button title={'See all articles'} />
				</Link>
			</div>
			{posts.slice(0, 2).map((post: TBlogPost) => (
				<BlogPost
					key={post.id}
					post={post}
				/>
			))}
		</div>
	);
}
