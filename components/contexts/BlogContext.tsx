'use client';

import {createContext, useContext} from 'react';

import {useFetchPosts} from '@/hooks/useFetchPosts';

import type {TBlogPost} from '@/types/strapi';
import type {ReactNode} from 'react';

const PostsContext = createContext<{posts: TBlogPost[]; isLoading: boolean; error: Error | null}>({
	posts: [],
	isLoading: true,
	error: null
});

export function PostsProvider({children}: {children: ReactNode}): ReactNode {
	const {posts, isLoading, error} = useFetchPosts();
	return <PostsContext.Provider value={{posts, isLoading, error}}>{children}</PostsContext.Provider>;
}

export function usePosts(): {posts: TBlogPost[]; isLoading: boolean; error: Error | null} {
	return useContext(PostsContext);
}
