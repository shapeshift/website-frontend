'use client';

/************************************************************************************************
 ** SupportArticleList Component:
 **
 ** Client component for displaying paginated lists of support articles
 ** Features interactive pagination and loading states
 **
 ** Features:
 ** - Pagination with next/previous controls
 ** - Loading skeleton for better UX
 ** - Empty state handling
 ** - Responsive grid layout for different viewports
 **
 ** Usage:
 ** - Import in support list pages
 ** - Configure with useFetchSupportArticles hook
 ** - Add custom empty state message if needed
 ************************************************************************************************/

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {Banner} from '@/components/common/Banner';
import {IconChevron} from '@/components/common/icons/IconChevron';
import {IconDocs} from '@/components/common/icons/IconDocs';
import {LocalizedLink} from '@/components/common/LocalizedLink';
import {RESOURCES_DICT} from '@/components/dictionary/resources';
import {cl} from '@/components/utils/cl';
import {useFetchSupportArticles} from '@/hooks/useFetchSupportArticles';

import {SupportArticleListSkeleton} from './SupportArticleListSkeleton';
import {DEFAULT_PAGINATION} from '../_utils/constants';

import type {TSupportArticle} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TSupportArticleListProps = {
	pageSize?: number;
	sort?: 'asc' | 'desc';
	initialPage?: number;
	populateContent?: boolean;
	cacheArticles?: boolean;
	emptyMessage?: string;
	gridClassName?: string;
};

export function SupportArticleList({
	pageSize = DEFAULT_PAGINATION.PAGE_SIZE,
	sort = DEFAULT_PAGINATION.SORT,
	initialPage = DEFAULT_PAGINATION.INITIAL_PAGE,
	populateContent = true,
	cacheArticles = true,
	emptyMessage = RESOURCES_DICT.support.emptyMessage,
	gridClassName
}: TSupportArticleListProps): ReactNode {
	const [page, setPage] = useState(initialPage);
	const {articles, pagination, isLoading} = useFetchSupportArticles({
		page,
		pageSize,
		sort,
		populateContent,
		cacheArticles
	});

	// Loading skeleton
	if (isLoading) {
		return <SupportArticleListSkeleton pageSize={pageSize} />;
	}

	return (
		<Fragment>
			<div className={'container mx-auto'}>
				<div className={'my-[120px] flex flex-col gap-4'}>
					<h1 className={'text-center text-4xl lg:text-7xl'}>{RESOURCES_DICT.support.title}</h1>
					<p className={'text-center text-base text-gray-500 lg:text-xl    '}>
						{RESOURCES_DICT.support.description}
					</p>
				</div>

				{/* Empty state */}
				{!articles || articles.length === 0 ? (
					<p
						className={'my-20 text-center text-2xl text-gray-400'}
						role={'status'}>
						{emptyMessage}
					</p>
				) : (
					/* Articles grid */
					<div className={cl('mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3', gridClassName)}>
						{articles.map((article: TSupportArticle) => (
							<LocalizedLink
								className={'flex items-center gap-4 rounded-2xl bg-secondBg p-6 hover:bg-secondHoverBg'}
								href={`/support/${article.slug}`}
								key={article.slug}>
								<div className={'rounded-2xl bg-white/5 p-5'}>
									<IconDocs className={'size-6'} />
								</div>
								<h3 className={'text-2xl'}>{article.title}</h3>
							</LocalizedLink>
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
			</div>
		</Fragment>
	);
}
