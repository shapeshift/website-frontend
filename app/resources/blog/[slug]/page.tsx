'use client';
import 'highlight.js/styles/github-dark.css';
import Link from 'next/link';
import {notFound, useParams, useRouter} from 'next/navigation';

import {BlogContent} from '@/app/resources/blog/[slug]/BlogContent';
import {BlogSkeleton} from '@/app/resources/blog/[slug]/BlogSkeleton';
import {Banner} from '@/components/common/Banner';
import {IconBack} from '@/components/common/icons/IconBack';
import {useCachedPosts} from '@/components/contexts/CachedPosts';
import {useFetchPosts} from '@/hooks/useFetchPosts';

import type {ReactNode} from 'react';

export default function BlogPost(): ReactNode {
	const {slug} = useParams();

	const {
		cachedResponse: {data: cachedPosts}
	} = useCachedPosts();
	const {posts, isLoading} = useFetchPosts({
		page: 1,
		pageSize: 1,
		sort: 'desc',
		populateContent: true,
		cachePosts: true,
		slug: slug as string,
		skip: !!cachedPosts.find(p => p.slug === slug)
	});

	const post = [...cachedPosts, ...posts].find(p => p.slug === slug);
	const router = useRouter();

	if (isLoading) {
		return <BlogSkeleton />;
	}

	if (!post) {
		notFound();
	}

	return (
		<>
			<article className={'prose prose-invert container relative mx-auto mb-20 mt-40 max-w-4xl px-4'}>
				<button
					className={'absolute -left-32 top-0 flex items-center gap-1 p-3 pt-0 text-gray-500'}
					onClick={() => router.back()}>
					<IconBack />
					<span>{'Back'}</span>
				</button>
				<div className={'mb-8 text-gray-400'}>{new Date(post.publishedAt).toLocaleDateString()}</div>

				<div className={'mb-8 flex flex-wrap gap-2'}>
					{post.tags.map((tag: string, index: number) => (
						<Link
							href={`/resources/blog/tags/${tag}`}
							className={'text-blue'}
							key={index}>
							{`#${tag}`}
						</Link>
					))}
				</div>
				<h1 className={'mb-4 text-4xl font-bold'}>{post.slug.replace(/-/g, ' ')}</h1>
				<BlogContent content={post.content} />
			</article>
			{!isLoading && (
				<div className={'container mx-auto'}>
					<Banner />
				</div>
			)}
		</>
	);
}
