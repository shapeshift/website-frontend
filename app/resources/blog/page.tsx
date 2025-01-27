import Link from 'next/link';

import type {TBlogListResponse} from '@/types/strapi';

/********************************************************************************************
 * Fetches blog posts with proper error handling and typing
 * Includes cache and revalidation settings
 ********************************************************************************************/
async function getBlogPosts(): Promise<TBlogListResponse> {
	try {
		const res = await fetch(`${process.env.STRAPI_URL}/api/posts`, {
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			},
			next: {revalidate: 3600} // Cache for 1 hour
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch posts: ${res.status}`);
		}

		return res.json();
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return {data: [], meta: {pagination: {page: 1, pageSize: 10, pageCount: 0, total: 0}}};
	}
}

export default async function BlogList(): Promise<React.ReactNode> {
	const response = await getBlogPosts();
	const posts = response?.data ?? [];

	return (
		<main className={'container mx-auto px-4 py-8'}>
			<h1 className={'mb-8 text-4xl font-bold'}>{'Blog Posts'}</h1>
			{posts.length === 0 ? (
				<p className={'text-gray-400'}>{'No blog posts found.'}</p>
			) : (
				<div className={'grid gap-6'}>
					{posts.map(post => (
						<article
							key={post.documentId}
							className={'rounded-lg bg-slate-800 p-6 transition hover:bg-slate-700'}>
							<Link href={`/resources/blog/${post.slug}`}>
								<h2 className={'mb-2 text-2xl font-semibold'}>{post.slug.replace(/-/g, ' ')}</h2>
								<div className={'text-sm text-gray-400'}>
									{new Date(post.publishedAt).toLocaleDateString()}
								</div>
							</Link>
						</article>
					))}
				</div>
			)}
		</main>
	);
}
