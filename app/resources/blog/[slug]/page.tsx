import {notFound} from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import type {TBlogListResponse, TBlogPost} from '@/types/strapi';

/********************************************************************************************
 * Fetches a single blog post by slug
 * First gets all posts to find documentId, then fetches specific post
 ********************************************************************************************/
async function getBlogPost(slug: string): Promise<TBlogPost | null> {
	// First, get all posts to find the documentId
	const postsRes = await fetch('http://172.233.242.224:1337/api/posts', {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	if (!postsRes.ok) {
		return null;
	}

	const posts: TBlogListResponse = await postsRes.json();
	const post = posts.data.find(p => p.slug === slug);

	if (!post) {
		return null;
	}

	// Then fetch the specific post using documentId
	const postRes = await fetch(`http://172.233.242.224:1337/api/posts/${post.documentId}`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	if (!postRes.ok) {
		return null;
	}

	const {data} = await postRes.json();
	return data;
}

export default async function BlogPost({params}: {params: {slug: string}}): Promise<React.ReactNode> {
	const {slug} = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<article className={'prose prose-invert container mx-auto max-w-4xl px-4 py-8'}>
			<h1 className={'mb-4 text-4xl font-bold'}>{post.slug.replace(/-/g, ' ')}</h1>
			<div className={'mb-8 text-gray-400'}>{new Date(post.publishedAt).toLocaleDateString()}</div>
			<ReactMarkdown>{post.content}</ReactMarkdown>
		</article>
	);
}
