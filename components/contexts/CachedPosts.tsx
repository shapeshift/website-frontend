'use client';

import {createContext, useContext, useState} from 'react';

import type {TBlogListResponse} from '@/types/strapi';
import type {ReactNode} from 'react';

type TCachedParams = {
	page: number | undefined;
	pageSize: number | undefined;
	sort: 'asc' | 'desc' | undefined;
	slug: string | undefined;
	populateContent: boolean | undefined;
	tag: string | undefined;
};

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
		tag: undefined
	},
	setCachedParams: () => {}
});

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
		tag: undefined
	});

	return (
		<PostsContext.Provider value={{cachedResponse, setCachedResponse, cachedParams, setCachedParams}}>
			{children}
		</PostsContext.Provider>
	);
}

export function useCachedPosts(): {
	cachedResponse: TBlogListResponse;
	setCachedResponse: (responses: TBlogListResponse) => void;
	cachedParams: TCachedParams;
	setCachedParams: (params: TCachedParams) => void;
} {
	return useContext(PostsContext);
}
