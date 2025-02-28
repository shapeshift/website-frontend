'use client';

import {useEffect, useState} from 'react';

import {useCachedPosts} from '@/components/contexts/CachedPosts';

import type {TBlogListResponse, TBlogPost, TPagination} from '@/types/strapi';

/********************************************************************************************
 * Custom hook for fetching blog posts from Strapi
 * Handles loading states, errors, and data fetching
 * Supports caching, pagination, filtering, and sorting
 *
 * @param {Object} options - Fetch configuration options
 * @param {number} options.page - Current page number (default: 1)
 * @param {number} options.pageSize - Number of posts per page (default: 12)
 * @param {string} options.sort - Sort direction, 'asc' or 'desc' (default: 'asc')
 * @param {string} options.slug - Optional slug to filter by specific post
 * @param {string} options.type - Optional post type/category filter
 * @param {string} options.tag - Optional tag to filter posts by
 * @param {boolean} options.populateContent - Whether to include full content (default: false)
 * @param {boolean} options.cachePosts - Whether to cache results (default: false)
 * @param {boolean} options.skip - Whether to skip the fetch operation (default: false)
 *
 * @returns {Object} Posts data and state
 * @returns {TBlogPost[]} posts - Array of blog posts
 * @returns {TPagination} pagination - Pagination metadata
 * @returns {boolean} isLoading - Loading state indicator
 * @returns {Error | null} error - Error object if fetch fails
 ********************************************************************************************/
export function useFetchPosts({
	page = 1,
	pageSize = 12,
	sort = 'asc',
	slug,
	type,
	tag,
	populateContent = false,
	cachePosts = false,
	skip = false
}: {
	page: number;
	pageSize: number;
	sort: 'asc' | 'desc';
	slug?: string;
	type?: string;
	tag?: string;
	populateContent?: boolean;
	cachePosts?: boolean;
	skip?: boolean;
}): {
	posts: TBlogPost[];
	pagination: TPagination | undefined;
	isLoading: boolean;
	error: Error | null;
} {
	const [posts, setPosts] = useState<TBlogPost[]>([]);
	const [pagination, setPagination] = useState<TPagination | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const {setCachedResponse, setCachedParams, cachedResponse, cachedParams} = useCachedPosts();

	useEffect(() => {
		if (skip) {
			setIsLoading(false);
			return;
		}

		/********************************************************************************************
		 * Check if we already have cached data for the current query parameters
		 * If cached data is available and parameters match, use it instead of fetching again
		 ********************************************************************************************/
		if (
			cachedResponse.data.length > 0 &&
			cachedParams.page === page &&
			cachedParams.pageSize === pageSize &&
			cachedParams.sort === sort &&
			cachedParams.slug === slug &&
			cachedParams.populateContent === populateContent &&
			cachedParams.type === type &&
			cachedParams.tag === tag
		) {
			setPosts(cachedResponse.data);
			setPagination(cachedResponse.meta.pagination);
			setIsLoading(false);
			return;
		}

		/********************************************************************************************
		 * Fetches blog posts from Strapi API
		 * Constructs the API URL with appropriate filters and parameters
		 * Updates state with fetched data and caches results if requested
		 * Handles errors and loading state
		 ********************************************************************************************/
		async function fetchPosts(): Promise<void> {
			try {
				// Fetch posts with featured image population
				const res = await fetch(
					`${process.env.STRAPI_URL}/api/posts?populate[0]=featuredImg&fields[0]=slug&fields[1]=summary&fields[2]=title&fields[3]=type&fields[4]=tags&fields[5]=publishedAt&sort[0]=id:${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true${populateContent ? '&fields[6]=content' : ''}${slug ? `&filters[slug][$eq]=${slug}` : ''}${type ? `&filters[type][$contains]=${type.replace(/ /g, '_')}` : ''}${tag ? `&filters[tags][$contains]=${tag.replace(/ /g, '_')}` : ''}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
						}
					}
				);

				if (!res.ok) {
					throw new Error(`Failed to fetch posts: ${res.status}`);
				}

				const data: TBlogListResponse = await res.json();
				setPosts(data.data);
				setPagination(data.meta.pagination);
				if (cachePosts) {
					setCachedResponse(data);
					setCachedParams({page, pageSize, sort, slug, populateContent, type, tag});
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
		cachedParams.type,
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
		type,
		tag
	]);

	return {posts, isLoading, pagination, error};
}
