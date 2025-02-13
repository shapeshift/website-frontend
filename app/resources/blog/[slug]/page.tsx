'use client';

import {notFound, useParams, useRouter} from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import {Banner} from '@/components/common/Banner';
import {IconBack} from '@/components/common/icons/IconBack';
import {usePosts} from '@/hooks/usePosts';

import type {ReactNode} from 'react';

function BlogContent({content}: {content: string}): ReactNode {
	console.log(content);
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
	const router = useRouter();

	if (isLoading) {
		return <div>{'Loading...'}</div>;
	}

	if (!post) {
		notFound();
	}

	return (
		<>
			<article className={'prose prose-invert container relative mx-auto mb-20 mt-40 max-w-4xl px-4'}>
				<button
					className={'absolute -left-32 top-0 flex items-center gap-1 p-3 text-gray-500'}
					onClick={() => router.back()}>
					<IconBack />
					<span>{'Back'}</span>
				</button>
				<div className={'mb-8 text-gray-400'}>{new Date(post.publishedAt).toLocaleDateString()}</div>

				<div className={'mb-8 flex flex-wrap gap-2'}>
					{post.type.map(type => (
						<p
							className={'text-blue'}
							key={type}>
							{`#${type}`}
						</p>
					))}
				</div>
				<h1 className={'mb-4 text-4xl font-bold'}>{post.slug.replace(/-/g, ' ')}</h1>
				<BlogContent content={post.content} />
			</article>
			<div className={'container mx-auto'}>
				<Banner />
			</div>
		</>
	);
}
