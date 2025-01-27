import Link from 'next/link';

import type {TBlogListResponse} from '@/types/strapi';

/********************************************************************************************
 * Fetches all blog posts from Strapi
 * Includes error handling and typing
 ********************************************************************************************/
async function getBlogPosts(): Promise<TBlogListResponse> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/posts`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		},
		next: {revalidate: 3600} // Cache for 1 hour
	});

	if (!res.ok) {
		throw new Error('Failed to fetch blog posts');
	}

	return res.json();
}

export default async function BlogList(): Promise<React.ReactNode> {
	const {data: posts} = await getBlogPosts();

	return (
		<main className={'container mx-auto px-4 py-8'}>
			<h1 className={'mb-8 text-4xl font-bold'}>{'Blog Posts'}</h1>
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
		</main>
	);
}
