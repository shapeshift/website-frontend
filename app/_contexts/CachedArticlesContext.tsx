/********************************************************************************************
 * Support Articles Caching Context
 *
 * Provides a context for caching support articles data and query parameters to optimize performance
 * and reduce redundant API calls. This context maintains:
 * - Cached support article responses
 * - Query parameters used for fetching
 * - Pagination state
 ********************************************************************************************/

'use client';

import {createContext, useContext, useState} from 'react';

import type {TArticleListResponse} from '@/app/_components/strapi/types';
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
};

/********************************************************************************************
 * Context for storing cached support articles data and parameters
 * Provides default values for initial state
 ********************************************************************************************/
const ArticlesContext = createContext<{
	cachedResponse: TArticleListResponse;
	setCachedResponse: (responses: TArticleListResponse) => void;
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
		populateContent: undefined
	},
	setCachedParams: () => {}
});

/**
 * Provider component for support articles caching functionality
 * @param children - Child components that will have access to the articles cache
 * @returns Provider component with cached articles state
 */
export function CachedArticlesProvider({children}: {children: ReactNode}): ReactNode {
	const [cachedResponse, setCachedResponse] = useState<TArticleListResponse>({
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
		populateContent: undefined
	});

	return (
		<ArticlesContext.Provider
			value={{
				cachedResponse,
				setCachedResponse,
				cachedParams,
				setCachedParams
			}}>
			{children}
		</ArticlesContext.Provider>
	);
}

/**
 * Hook to access the cached articles context
 * @returns Object containing cached response, parameters, and their setters
 * @throws Error if used outside of CachedArticlesProvider
 */
export function useCachedArticles(): {
	cachedResponse: TArticleListResponse;
	setCachedResponse: (responses: TArticleListResponse) => void;
	cachedParams: TCachedParams;
	setCachedParams: (params: TCachedParams) => void;
} {
	return useContext(ArticlesContext);
}
