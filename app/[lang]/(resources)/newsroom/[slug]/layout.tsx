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
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsrooms?filters[slug][$eq]=${slug}&fields[0]=postSummary&fields[1]=tags&fields[2]=title&fields[3]=publishedAt&populate[0]=featuredImg`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
			}
		}
	).then(async res => res.json());

	const post = data.data[0];

	if (!post) {
		return notFound();
	}

	const imageUrl = post.featuredImg?.formats?.thumbnail?.url || post.featuredImg?.url;
	const metadata: Metadata = {
		title: `${post.title} | ShapeShift Newsroom`,
		description: post.postSummary || `Read ${post.title} on ShapeShift Newsroom`,
		keywords: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
		openGraph: {
			title: post.title,
			description: post.postSummary,
			type: 'article',
			publishedTime: post.publishedAt,
			authors: ['ShapeShift'],
			tags: Array.isArray(post.tags) ? post.tags : [post.tags]
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.postSummary || `Read ${post.title} on ShapeShift Newsroom`
		}
	};

	if (imageUrl) {
		metadata.openGraph!.images = [
			{
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
			}
		];
		metadata.twitter!.images = [
			{
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
			}
		];
	}

	return metadata;
}

export default function NewsroomPostLayout({children}: {children: React.ReactNode}): React.ReactNode {
	return children;
}
