'use client';

/************************************************************************************************
 ** PostList Component:
 **
 ** Client component for displaying paginated lists of blog or news posts
 ** Features interactive pagination and loading states
 **
 ** Features:
 ** - Pagination with next/previous controls
 ** - Loading skeleton for better UX
 ** - Empty state handling
 ** - Responsive grid layout for different viewports
 **
 ** Usage:
 ** - Import in blog or newsroom list pages
 ** - Configure with useFetchPosts or useFetchNewsroom hooks
 ** - Add custom empty state message if needed
 ************************************************************************************************/

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {Banner} from '@/app/_components/Banner';
import {BlogPost} from '@/app/_components/BlogPost';
import {useFetchPosts} from '@/app/_hooks/useFetchPosts';
import {IconChevron} from '@/app/_icons/IconChevron';
import {cl} from '@/app/_utils/cl';

import {DEFAULT_PAGINATION} from '../_utils/constants';

import type {TBlogPost} from '@/app/_components/strapi/types';
import type {ReactNode} from 'react';

type TPostListProps = {
	pageSize?: number;
	sort?: 'asc' | 'desc';
	initialPage?: number;
	populateContent?: boolean;
	cachePosts?: boolean;
	emptyMessage?: string;
	category?: string;
	tag?: string;
	gridClassName?: string;
};

export function PostList({
	pageSize = DEFAULT_PAGINATION.PAGE_SIZE,
	sort = DEFAULT_PAGINATION.SORT,
	initialPage = DEFAULT_PAGINATION.INITIAL_PAGE,
	populateContent = true,
	cachePosts = true,
	emptyMessage = "We couldn't find any posts matching your criteria.",
	category,
	tag,
	gridClassName
}: TPostListProps): ReactNode {
	const [page, setPage] = useState(initialPage);
	const {posts, pagination, isLoading} = useFetchPosts({
		page,
		pageSize,
		sort,
		populateContent,
		cachePosts,
		type: category,
		tag
	});

	// Loading skeleton
	if (isLoading) {
		return (
			<div
				className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}
				aria-busy={'true'}>
				{Array.from({length: pageSize}).map((_, i) => (
					<div
						key={i}
						className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
						aria-hidden={'true'}
					/>
				))}
			</div>
		);
	}

	return (
		<Fragment>
			{/* Empty state */}
			{!posts || posts.length === 0 ? (
				<p
					className={'my-20 text-center text-2xl text-gray-400'}
					role={'status'}>
					{emptyMessage}
				</p>
			) : (
				/* Posts grid */
				<div className={cl('mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3', gridClassName)}>
					{posts.map((post: TBlogPost) => (
						<BlogPost
							key={post.slug}
							post={post}
							className={'!bg-stroke'}
						/>
					))}
				</div>
			)}

			{/* Pagination controls */}
			{pagination && pagination.pageCount > 1 && (
				<ReactPaginate
					pageCount={pagination?.pageCount ?? 1}
					pageRangeDisplayed={5}
					marginPagesDisplayed={2}
					onPageChange={({selected}) => setPage(selected + 1)}
					containerClassName={'flex gap-2 items-center justify-center mb-12'}
					pageClassName={'opacity-20 hover:opacity-100 transition-opacity'}
					pageLinkClassName={'px-6 py-4 flex items-center justify-center'}
					activeClassName={'!opacity-100'}
					previousClassName={cl(
						'hover:opacity-100 transition-opacity',
						page === 1 ? 'opacity-20' : 'opacity-100'
					)}
					previousLinkClassName={'px-6 py-4 flex items-center justify-center'}
					nextLinkClassName={'px-6 py-4 flex items-center justify-center'}
					nextClassName={cl(
						'hover:opacity-100 transition-opacity',
						page === pagination?.pageCount ? 'opacity-20' : 'opacity-100'
					)}
					disabledClassName={'hover:opacity-20 opacity-20 transition-opacity'}
					disabledLinkClassName={'cursor-not-allowed'}
					previousLabel={<IconChevron aria-label={'Previous page'} />}
					nextLabel={
						<IconChevron
							className={'rotate-180'}
							aria-label={'Next page'}
						/>
					}
					aria-label={'Pagination'}
				/>
			)}

			{/* Banner */}
			<div className={'my-16'}>
				<Banner />
			</div>
		</Fragment>
	);
}
