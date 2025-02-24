'use client';

import {useState} from 'react';
import ReactPaginate from 'react-paginate';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {IconChevron} from '@/components/common/icons/IconChevron';
import {TabItem} from '@/components/common/TabItem';
import {blogTabs} from '@/components/constants';
import {cl} from '@/components/utils/cl';
import {useFetchPosts} from '@/hooks/useFetchPosts';

import type {ReactNode} from 'react';

const PAGE_SIZE = 12 - 1;
const SORT = 'desc';

export default function BlogList(): ReactNode {
	const [page, setPage] = useState(1);
	const [currentTab, setCurrentTab] = useState('all');
	const {posts, pagination, isLoading} = useFetchPosts({
		page,
		pageSize: PAGE_SIZE,
		sort: SORT,
		type: currentTab === 'all' ? undefined : currentTab,
		populateContent: true,
		cachePosts: true
	});

	if (isLoading) {
		return (
			<main className={'container mx-auto mt-40 px-4 py-8'}>
				<div className={'mb-8 h-16 w-96 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'mb-6 flex w-max gap-4 rounded-full p-1'}>
					{blogTabs.map(tab => (
						<div
							key={tab.slug}
							className={'h-10 w-24 animate-pulse rounded-full bg-gray-800'}
						/>
					))}
				</div>
				<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
						/>
					))}
				</div>
			</main>
		);
	}

	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-8 text-[40px] leading-10 lg:text-7xl'}>
				<span className={'text-white'}>{'ShapeShift'}</span>
				&nbsp;
				<span className={'text-blue'}>{'Blog.'}</span>
			</div>

			<div className={'container mb-6 flex flex-wrap gap-2 overflow-y-scroll p-1  md:gap-4 md:overflow-y-auto'}>
				{blogTabs.map(tab => (
					<TabItem
						key={tab.slug}
						title={tab.title}
						selected={currentTab === tab.slug}
						onClick={() => setCurrentTab(tab.slug)}
					/>
				))}
			</div>
			{posts.length === 0 ? (
				<p className={'my-20 text-center text-2xl text-gray-400'}>
					{"We couldn't find any blog posts matching your criteria."}
				</p>
			) : (
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{posts.map(post => (
						<BlogPost
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
		</main>
	);
}
