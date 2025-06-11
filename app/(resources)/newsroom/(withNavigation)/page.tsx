'use client';

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {Banner} from '@/app/_components/Banner';
import {NewsPost} from '@/app/_components/NewsPost';
import {useFetchNewsroom} from '@/app/_hooks/useFetchNewsroom';
import {IconChevron} from '@/app/_icons/IconChevron';
import {cl} from '@/app/_utils/cl';

import type {ReactNode} from 'react';

const PAGE_SIZE = 12;
const SORT = 'desc';

export default function BlogList(): ReactNode {
	const [page, setPage] = useState(1);
	const {posts, pagination, isLoading} = useFetchNewsroom({
		page,
		pageSize: PAGE_SIZE,
		sort: SORT,
		populateContent: true,
		cachePosts: true
	});

	if (isLoading) {
		return (
			<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
				{[...Array(PAGE_SIZE)].map((_, i) => (
					<div
						key={i}
						className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
					/>
				))}
			</div>
		);
	}

	return (
		<Fragment>
			{posts.length === 0 ? (
				<p className={'my-20 text-center text-2xl text-gray-400'}>
					{"We couldn't find any blog posts matching your criteria."}
				</p>
			) : (
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{posts.map(post => (
						<NewsPost
							key={post.slug}
							post={post}
							className={'!bg-stroke'}
						/>
					))}
				</div>
			)}
			<ReactPaginate
				pageCount={pagination?.pageCount ?? 1}
				pageRangeDisplayed={5}
				marginPagesDisplayed={2}
				onPageChange={({selected}) => setPage(selected + 1)}
				containerClassName={'flex gap-2 items-center justify-center'}
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
				previousLabel={<IconChevron />}
				nextLabel={<IconChevron className={'rotate-180'} />}
			/>
			<Banner />
		</Fragment>
	);
}
