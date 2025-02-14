'use client';

import {useEffect, useState} from 'react';

import type {TBlogListResponse, TBlogPost} from '@/types/strapi';

/********************************************************************************************
 * Custom hook for fetching blog posts from Strapi
 * Handles loading states, errors, and data fetching
 * @returns {Object} Posts data and state
 * @returns {TBlogPost[]} posts - Array of blog posts
 * @returns {boolean} isLoading - Loading state indicator
 * @returns {Error | null} error - Error object if fetch fails
 ********************************************************************************************/
export function useFetchPosts(): {
	posts: TBlogPost[];
	isLoading: boolean;
	error: Error | null;
} {
	const [posts, setPosts] = useState<TBlogPost[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		/********************************************************************************************
		 * Fetches blog posts from Strapi API
		 * Includes error handling and state updates
		 ********************************************************************************************/
		async function fetchPosts(): Promise<void> {
			try {
				// Fetch posts with featured image population
				const res = await fetch(`${process.env.STRAPI_URL}/api/posts?populate[0]=imageFeatured`, {
					headers: {
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
					}
				});

				if (!res.ok) {
					throw new Error(`Failed to fetch posts: ${res.status}`);
				}

				const data: TBlogListResponse = await res.json();
				setPosts(data.data);
			} catch (err) {
				setError(err as Error);
				console.error('Error fetching blog posts:', err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchPosts();
	}, []);

	return {posts, isLoading, error};
}
