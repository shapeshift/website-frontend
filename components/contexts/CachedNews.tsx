'use client';

import {createContext, useContext, useState} from 'react';

import type {TNewsroomListResponse} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TCachedParams = {
	page: number | undefined;
	pageSize: number | undefined;
	sort: 'asc' | 'desc' | undefined;
	slug: string | undefined;
	populateContent: boolean | undefined;
	category: string | undefined;
	tag: string | undefined;
};

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

export function useCachedNews(): {
	cachedResponse: TNewsroomListResponse;
	setCachedResponse: (responses: TNewsroomListResponse) => void;
	cachedParams: TCachedParams;
	setCachedParams: (params: TCachedParams) => void;
} {
	return useContext(NewsContext);
}
