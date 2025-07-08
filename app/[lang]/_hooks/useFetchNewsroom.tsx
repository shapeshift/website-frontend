'use client';

import {useEffect, useState} from 'react';

import {useCachedNews} from '@/app/[lang]/_contexts/CachedNewsContext';

import type {TNewsroomListResponse, TNewsroomPost, TPagination} from '@/app/[lang]/_components/strapi/types';

/********************************************************************************************
 * Custom hook for fetching blog posts from Strapi
 * Handles loading states, errors, and data fetching
 * @returns {Object} Posts data and state
 * @returns {TBlogPost[]} posts - Array of blog posts
 * @returns {boolean} isLoading - Loading state indicator
 * @returns {Error | null} error - Error object if fetch fails
 ********************************************************************************************/
export function useFetchNewsroom({
	page = 1,
	pageSize = 12,
	sort = 'asc',
	slug,
	category,
	tag,
	populateContent = false,
	cachePosts = false,
	skip = false
}: {
	page: number;
	pageSize: number;
	sort: 'asc' | 'desc';
	slug?: string;
	category?: string;
	tag?: string;
	populateContent?: boolean;
	cachePosts?: boolean;
	skip?: boolean;
}): {
	posts: TNewsroomPost[];
	pagination: TPagination | undefined;
	isLoading: boolean;
	error: Error | null;
} {
	const [posts, setPosts] = useState<TNewsroomPost[]>([]);
	const [pagination, setPagination] = useState<TPagination | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const {setCachedResponse, setCachedParams, cachedResponse, cachedParams} = useCachedNews();

	useEffect(() => {
		if (skip) {
			setIsLoading(false);
			return;
		}

		if (
			cachedResponse.data.length > 0 &&
			cachedParams.page === page &&
			cachedParams.pageSize === pageSize &&
			cachedParams.sort === sort &&
			cachedParams.slug === slug &&
			cachedParams.populateContent === populateContent &&
			cachedParams.category === category &&
			cachedParams.tag === tag
		) {
			setPosts(cachedResponse.data);
			setPagination(cachedResponse.meta.pagination);
			setIsLoading(false);
			return;
		}

		/********************************************************************************************
		 * Fetches blog posts from Strapi API
		 * Includes error handling and state updates
		 ********************************************************************************************/
		async function fetchPosts(): Promise<void> {
			try {
				// Fetch posts with featured image population
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsrooms?populate[0]=featuredImg&fields[0]=slug&fields[1]=postSummary&fields[2]=title&fields[3]=category&fields[4]=tags&fields[5]=publishedAt&fields[7]=publishedOn&fields[14]=author&fields[8]=externalURL&sort[0]=publishedOn:${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true${populateContent ? '&fields[6]=content' : ''}${slug ? `&filters[slug][$eq]=${slug}` : ''}${category ? `&filters[category][$contains]=${category.replace(/ /g, '_')}` : ''}${tag ? `&filters[tags][$contains]=${tag.replace(/ /g, '_')}` : ''}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
						}
					}
				);

				if (!res.ok) {
					throw new Error(`Failed to fetch posts: ${res.status}`);
				}

				const data: TNewsroomListResponse = await res.json();
				setPosts(data.data);
				setPagination(data.meta.pagination);
				if (cachePosts) {
					setCachedResponse(data);
					setCachedParams({
						page,
						pageSize,
						sort,
						slug,
						populateContent,
						category,
						tag
					});
				}
			} catch (err) {
				setError(err as Error);
				console.error('Error fetching blog posts:', err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		cachePosts,
		cachedParams.page,
		cachedParams.pageSize,
		cachedParams.populateContent,
		cachedParams.slug,
		cachedParams.sort,
		cachedParams.category,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		JSON.stringify(cachedResponse.data),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		JSON.stringify(cachedResponse.meta.pagination),
		cachedResponse.meta.pagination.page,
		cachedResponse.meta.pagination.pageCount,
		cachedResponse.meta.pagination.pageSize,
		cachedResponse.meta.pagination.total,
		page,
		pageSize,
		populateContent,
		setCachedParams,
		setCachedResponse,
		skip,
		slug,
		sort,
		category,
		tag
	]);

	return {posts, isLoading, pagination, error};
}
