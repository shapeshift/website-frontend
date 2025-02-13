import {useState} from 'react';

import type {TBlogListResponse, TBlogPost} from '@/types/strapi';

export function usePosts(): {
	posts: TBlogPost[];
	getPost: (slug: string) => Promise<TBlogPost | null>;
	isLoading: boolean;
} {
	const [posts, setPosts] = useState<TBlogPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getPost(slug: string): Promise<TBlogPost | null> {
		try {
			setIsLoading(true);
			// First, get all posts to find the documentId
			const postsRes = await fetch(`${process.env.STRAPI_URL}/api/posts`, {
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
			const postRes = await fetch(`${process.env.STRAPI_URL}/api/posts/${post.documentId}`, {
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
				}
			});

			if (!postRes.ok) {
				return null;
			}

			const {data} = await postRes.json();
			setPosts(data);
			setIsLoading(false);
			return data;
		} catch (error) {
			setIsLoading(false);
			console.error('Error fetching post:', error);
			return null;
		}
	}

	return {posts, getPost, isLoading};
}
