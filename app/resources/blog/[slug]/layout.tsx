import {notFound} from 'next/navigation';

import type {Metadata} from 'next';

/************************************************************************************************
 * Layout component for blog post pages
 * Handles metadata generation for SEO and social sharing
 * Uses Next.js 13+ Metadata API
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&fields[0]=summary&fields[2]=tags&fields[3]=title&fields[4]=publishedAt&populate[0]=featuredImg`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	).then(async res => res.json());

	const post = data.data[0];

	if (!post) {
		return notFound();
	}

	const imageUrl = post.featuredImg.formats.thumbnail.url;

	return {
		title: `${post.title} | ShapeShift Blog`,
		description: post.summary || `Read ${post.title} on ShapeShift Blog`,
		keywords: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
		openGraph: {
			title: post.title,
			description: post.summary,
			type: 'article',
			publishedTime: post.publishedAt,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			],
			authors: ['ShapeShift'],
			tags: Array.isArray(post.tags) ? post.tags : [post.tags]
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.summary || `Read ${post.title} on ShapeShift Blog`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

export default function BlogPostLayout({children}: {children: React.ReactNode}): React.ReactNode {
	return children;
}
