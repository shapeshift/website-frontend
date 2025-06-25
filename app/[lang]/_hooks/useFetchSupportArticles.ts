'use client';

import {useEffect, useState} from 'react';

import {useCachedArticles} from '@/app/[lang]/_contexts/CachedArticlesContext';

import type {TArticleListResponse, TPagination, TSupportArticle} from '@/app/[lang]/_components/strapi/types';

/********************************************************************************************
 * Custom hook for fetching support articles from Strapi
 * Handles loading states, errors, and data fetching
 * Supports caching, pagination, filtering, and sorting
 *
 * @param {Object} options - Fetch configuration options
 * @param {number} options.page - Current page number (default: 1)
 * @param {number} options.pageSize - Number of articles per page (default: 12)
 * @param {string} options.sort - Sort direction, 'asc' or 'desc' (default: 'asc')
 * @param {string} options.slug - Optional slug to filter by specific article
 * @param {boolean} options.populateContent - Whether to include full content (default: false)
 * @param {boolean} options.cacheArticles - Whether to cache results (default: false)
 * @param {boolean} options.skip - Whether to skip the fetch operation (default: false)
 *
 * @returns {Object} Articles data and state
 * @returns {TArticle[]} articles - Array of support articles
 * @returns {TPagination} pagination - Pagination metadata
 * @returns {boolean} isLoading - Loading state indicator
 * @returns {Error | null} error - Error object if fetch fails
 ********************************************************************************************/
export function useFetchSupportArticles({
	page = 1,
	pageSize = 12,
	sort = 'asc',
	slug,
	populateContent = false,
	cacheArticles = false,
	skip = false
}: {
	page: number;
	pageSize: number;
	sort: 'asc' | 'desc';
	slug?: string;
	populateContent?: boolean;
	cacheArticles?: boolean;
	skip?: boolean;
}): {
	articles: TSupportArticle[];
	pagination: TPagination | undefined;
	isLoading: boolean;
	error: Error | null;
} {
	const [articles, setArticles] = useState<TSupportArticle[]>([]);
	const [pagination, setPagination] = useState<TPagination | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const {setCachedResponse, setCachedParams, cachedResponse, cachedParams} = useCachedArticles();

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
			cachedParams.populateContent === populateContent
		) {
			setArticles(cachedResponse.data);
			setPagination(cachedResponse.meta.pagination);
			setIsLoading(false);
			return;
		}

		async function fetchArticles(): Promise<void> {
			try {
				const res = await fetch(
					`${process.env.STRAPI_URL}/api/support-articles?populate[0]=featuredImg&fields[0]=slug&fields[1]=summary&fields[2]=title&fields[3]=publishedAt&sort[0]=publishedAt:${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true${populateContent ? '&fields[4]=content' : ''}${slug ? `&filters[slug][$eq]=${slug}` : ''}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
						}
					}
				);

				if (!res.ok) {
					throw new Error(`Failed to fetch support articles: ${res.status}`);
				}

				const data: TArticleListResponse = await res.json();
				setArticles(data.data);
				setPagination(data.meta.pagination);
				if (cacheArticles) {
					setCachedResponse(data);
					setCachedParams({page, pageSize, sort, slug, populateContent});
				}
			} catch (err) {
				setError(err as Error);
				console.error('Error fetching support articles:', err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchArticles();
	}, [
		cacheArticles,
		cachedParams.page,
		cachedParams.pageSize,
		cachedParams.populateContent,
		cachedParams.slug,
		cachedParams.sort,
		cachedResponse.data,
		cachedResponse.meta.pagination,
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
		sort
	]);

	return {articles, isLoading, pagination, error};
}
