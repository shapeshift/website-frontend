'use client';

import {notFound, useParams} from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import {Banner} from '@/components/common/Banner';
import {usePosts} from '@/components/contexts/BlogContext';

import type {ReactNode} from 'react';

function BlogContent({content}: {content: string}): ReactNode {
	// Check if content looks like HTML (contains HTML tags)
	const isHtml = /<[a-z][\s\S]*>/i.test(content);

	return (
		<div className={'blog-content'}>
			{isHtml ? (
				// eslint-disable-next-line @typescript-eslint/naming-convention
				<div dangerouslySetInnerHTML={{__html: content}} />
			) : (
				<ReactMarkdown>{content}</ReactMarkdown>
			)}

			<style
				jsx
				global>
				{`
					.blog-content img {
						margin-top: 20px;
						margin-bottom: 20px;
					}

					.blog-content strong {
						margin-top: 20px;
						display: inline-block;
					}

					.blog-content p {
						margin-bottom: 16px;
					}
				`}
			</style>
		</div>
	);
}

export default function BlogPost(): ReactNode {
	const {posts, isLoading} = usePosts();

	const {slug} = useParams();
	const post = posts.find(p => p.slug === slug);

	if (isLoading) {
		return <div>{'Loading...'}</div>;
	}

	if (!post) {
		notFound();
	}

	return (
		<>
			<article className={'prose prose-invert container mx-auto mb-20 mt-40 max-w-4xl px-4 py-8'}>
				<h1 className={'mb-4 text-4xl font-bold'}>{post.slug.replace(/-/g, ' ')}</h1>
				<div className={'mb-8 text-gray-400'}>{new Date(post.publishedAt).toLocaleDateString()}</div>
				<BlogContent content={post.content} />
			</article>
			<Banner />
		</>
	);
}
