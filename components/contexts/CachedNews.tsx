/********************************************************************************************
 * News Caching Context
 *
 * Provides a context for caching newsroom data and query parameters to optimize performance
 * and reduce redundant API calls. This context maintains:
 * - Cached newsroom responses
 * - Query parameters used for fetching
 * - Pagination state
 ********************************************************************************************/

'use client';

import {createContext, useContext, useState} from 'react';

import type {TNewsroomListResponse} from '@/types/strapi';
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
	category: string | undefined;
	tag: string | undefined;
};

/********************************************************************************************
 * Context for storing cached news data and parameters
 * Provides default values for initial state
 */
const NewsContext = createContext<{
	cachedResponse: TNewsroomListResponse;
	setCachedResponse: (responses: TNewsroomListResponse) => void;
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
		category: undefined,
		tag: undefined
	},
	setCachedParams: () => {}
});

/**
 * Provider component for news caching functionality
 * @param children - Child components that will have access to the news cache
 * @returns Provider component with cached news state
 */
export function CachedNewsProvider({children}: {children: ReactNode}): ReactNode {
	const [cachedResponse, setCachedResponse] = useState<TNewsroomListResponse>({
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
		category: undefined,
		tag: undefined
	});

	return (
		<NewsContext.Provider value={{cachedResponse, setCachedResponse, cachedParams, setCachedParams}}>
			{children}
		</NewsContext.Provider>
	);
}

/**
 * Hook to access the cached news context
 * @returns Object containing cached response, parameters, and their setters
 * @throws Error if used outside of CachedNewsProvider
 */
export function useCachedNews(): {
	cachedResponse: TNewsroomListResponse;
	setCachedResponse: (responses: TNewsroomListResponse) => void;
	cachedParams: TCachedParams;
	setCachedParams: (params: TCachedParams) => void;
} {
	return useContext(NewsContext);
}
