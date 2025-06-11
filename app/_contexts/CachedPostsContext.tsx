/********************************************************************************************
 * Blog Posts Caching Context
 *
 * Provides a context for caching blog posts data and query parameters to optimize performance
 * and reduce redundant API calls. This context maintains:
 * - Cached blog post responses
 * - Query parameters used for fetching
 * - Pagination state
 ********************************************************************************************/

'use client';

import {createContext, useContext, useState} from 'react';

import type {TBlogListResponse} from '@/app/_components/strapi/types';
import type {ReactNode} from 'react';

/********************************************************************************************
 * Type definition for cached query parameters
 ********************************************************************************************/
type TCachedParams = {
	page: number | undefined;
	pageSize: number | undefined;
	sort: 'asc' | 'desc' | undefined;
	slug: string | undefined;
	populateContent: boolean | undefined;
	type: string | undefined;
	tag: string | undefined;
};

/********************************************************************************************
 * Context for storing cached blog posts data and parameters
 * Provides default values for initial state
 ********************************************************************************************/
const PostsContext = createContext<{
	cachedResponse: TBlogListResponse;
	setCachedResponse: (responses: TBlogListResponse) => void;
	cachedParams: TCachedParams;
	setCachedParams: (params: TCachedParams) => void;
}>({
	cachedResponse: {
		data: [],
		meta: {
			pagination: {
				page: 1,
				pageSize: 12,
				pageCount: 1,
				total: 0
			}
		}
	},
	setCachedResponse: () => {},
	cachedParams: {
		page: undefined,
		pageSize: undefined,
		sort: undefined,
		slug: undefined,
		populateContent: undefined,
		type: undefined,
		tag: undefined
	},
	setCachedParams: () => {}
});

/**
 * Provider component for blog posts caching functionality
 * @param children - Child components that will have access to the posts cache
 * @returns Provider component with cached posts state
 */
export function CachedPostsProvider({children}: {children: ReactNode}): ReactNode {
	const [cachedResponse, setCachedResponse] = useState<TBlogListResponse>({
		data: [],
		meta: {
			pagination: {
				page: 1,
				pageSize: 12,
				pageCount: 1,
				total: 0
			}
		}
	});
	const [cachedParams, setCachedParams] = useState<TCachedParams>({
		page: undefined,
		pageSize: undefined,
		sort: undefined,
		slug: undefined,
		populateContent: undefined,
		type: undefined,
		tag: undefined
	});

	return (
		<PostsContext.Provider
			value={{
				cachedResponse,
				setCachedResponse,
				cachedParams,
				setCachedParams
			}}>
			{children}
		</PostsContext.Provider>
	);
}

/**
 * Hook to access the cached posts context
 * @returns Object containing cached response, parameters, and their setters
 * @throws Error if used outside of CachedPostsProvider
 */
export function useCachedPosts(): {
	cachedResponse: TBlogListResponse;
	setCachedResponse: (responses: TBlogListResponse) => void;
	cachedParams: TCachedParams;
	setCachedParams: (params: TCachedParams) => void;
} {
	return useContext(PostsContext);
}
