'use client'
import {useParams, useRouter, useSearchParams} from 'next/navigation'
import {Fragment, useEffect, useMemo, useState} from 'react'
import ReactPaginate from 'react-paginate'

import {SupportTags} from '@/app/[lang]/(resources)/support/_components/SupportTags'
import {Banner} from '@/app/[lang]/_components/Banner'
import {LocalizedLink} from '@/app/[lang]/_components/LocalizedLink'
import {SearchBar} from '@/app/[lang]/_components/SearchBar'
import {useFetchSupportArticles} from '@/app/[lang]/_hooks/useFetchSupportArticles'
import {IconChevron} from '@/app/[lang]/_icons/IconChevron'
import {IconDocs} from '@/app/[lang]/_icons/IconDocs'
import {cl} from '@/app/[lang]/_utils/cl'
import {RESOURCES_DICT} from '@/app/[lang]/_utils/dictionary/resources'

import {SupportArticleListSkeleton} from './SupportArticleListSkeleton'
import {DEFAULT_PAGINATION} from '../_utils/constants'

import type {TSupportArticle} from '@/app/[lang]/_components/strapi/types'
import type {ReactNode} from 'react'

type TSupportArticleListProps = {
	pageSize?: number
	sort?: 'asc' | 'desc'
	initialPage?: number
	populateContent?: boolean
	cacheArticles?: boolean
	emptyMessage?: string
	gridClassName?: string
	tag?: string
}

export function SupportArticleList({
	pageSize = DEFAULT_PAGINATION.PAGE_SIZE,
	sort = DEFAULT_PAGINATION.SORT,
	initialPage = DEFAULT_PAGINATION.INITIAL_PAGE,
	populateContent = true,
	cacheArticles = true,
	emptyMessage = RESOURCES_DICT.support.emptyMessage,
	gridClassName,
	tag
}: TSupportArticleListProps): ReactNode {
	const [page, setPage] = useState(initialPage)
	const router = useRouter()
	const searchParams = useSearchParams()
	const urlTag = searchParams?.get('tag') ?? undefined
	const params = useParams() as {lang?: string}
	const lang = params?.lang ?? ''

	// client-side search state (used to send search to server)
	const [searchQuery, setSearchQuery] = useState('')

	// determine the active tag (from URL or prop)
	const activeTag = urlTag ?? tag

	// server-side filtering: always use the configured pageSize; grouped view will show previews and
	// provide "View all" links to the paginated tag view instead of fetching the entire dataset.
	const fetchPage = activeTag ? page : 1
	const fetchPageSize = pageSize

	const {articles, pagination, isLoading} = useFetchSupportArticles({
		page: fetchPage,
		pageSize: fetchPageSize,
		sort,
		populateContent,
		cacheArticles,
		tag: activeTag,
		search: searchQuery,
		skip: false
	})

	// Reset to initial page when tag (from URL), searchQuery, or initialPage change
	useEffect(() => setPage(initialPage), [activeTag, searchQuery, initialPage])

	// Server returns results already filtered by tag and search; render `articles` directly
	const filteredArticles = articles

	// When in the grouped view (no active tag), prepare tags and grouped lists
	const groupedTags = useMemo(() => {
		if (!filteredArticles) {
			return []
		}
		return Array.from(new Set(filteredArticles.flatMap(a => a.tags ?? []))).sort()
	}, [filteredArticles])

	const groupedArticles = useMemo(() => {
		const map: Record<string, TSupportArticle[]> = {}
		for (const t of groupedTags) {
			map[t] = (filteredArticles || []).filter(a => (a.tags ?? []).includes(t))
		}
		return map
	}, [filteredArticles, groupedTags])

	function ArticleCard({article, tagName, lang}: {article: TSupportArticle; tagName?: string; lang?: string}) {
		const tagQuery = tagName ? `?tag=${encodeURIComponent(tagName)}` : ''
		const href = lang ? `/${lang}/support/${article.slug}${tagQuery}` : `/support/${article.slug}${tagQuery}`
		return (
			<LocalizedLink
				className={'flex flex-col gap-3 rounded-2xl bg-secondBg p-6 hover:bg-secondHoverBg'}
				href={href}
				key={article.slug}>
				<div className={'flex items-start gap-4'}>
					<div className={'rounded-2xl bg-white/5 p-5'}>
						<IconDocs className={'size-6'} />
					</div>
					<div>
						<h3 className={'text-2xl'}>{article.title}</h3>
						<p className={'mt-2 text-sm text-white/80'}>{article.summary}</p>
					</div>
				</div>
			</LocalizedLink>
		)
	}

	// Loading skeleton
	if (isLoading) {
		return <SupportArticleListSkeleton pageSize={pageSize} />
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

				<div className={'flex w-full justify-center'}>
					<div className={'w-1/2'}>
						<SupportTags
							tags={
								activeTag
									? (() => {
											const derived = Array.from(
												new Set((articles || []).flatMap(a => a.tags ?? []))
											)
											return derived.length > 0 ? derived : [activeTag]
										})()
									: groupedTags
							}
							active={activeTag}
							onClick={(t: string | null) => {
								const params = new URLSearchParams(Array.from(searchParams || []))
								if (t) {
									params.set('tag', t)
								} else {
									params.delete('tag')
								}
								const query = params.toString()
								router.push(`/${lang}/support${query ? `?${query}` : ''}`)
							}}
							className={'w-full'}
						/>
						<SearchBar
							searchQuery={searchQuery}
							setSearchQueryAction={setSearchQuery}
							inputClassName={'w-full'}
						/>
					</div>
				</div>

				{/* Empty state */}
				{!filteredArticles || filteredArticles.length === 0 ? (
					<p
						className={'my-20 text-center text-2xl text-gray-400'}
						role={'status'}>
						{emptyMessage}
					</p>
				) : // If a tag is active, show the existing paginated grid. Otherwise show grouped-by-tag sections.
				activeTag ? (
					<div className={'mb-20'}>
						<div className={'mb-4'}>
							<h2 className={'text-2xl'}>{activeTag}</h2>
						</div>
						<div className={cl('grid gap-6 md:grid-cols-2 lg:grid-cols-3', gridClassName)}>
							{filteredArticles.map((article: TSupportArticle) => (
								<ArticleCard
									key={article.slug}
									article={article}
									tagName={activeTag}
									lang={lang}
								/>
							))}
						</div>
					</div>
				) : (
					<div className={'space-y-12 mb-20'}>
						{groupedTags.map(tagName => (
							<div key={tagName}>
								<div className={'mb-4 flex items-center justify-between'}>
									<h2 className={'text-2xl'}>{tagName}</h2>
									<LocalizedLink
										className={'text-sm text-blue-400'}
										href={`/${lang}/support?tag=${encodeURIComponent(tagName)}`}>
										{'View all'}
									</LocalizedLink>
								</div>
								<div className={cl('grid gap-6 md:grid-cols-2 lg:grid-cols-3', gridClassName)}>
									{(groupedArticles[tagName] ?? []).slice(0, 3).map((article: TSupportArticle) => (
										<ArticleCard
											key={article.slug}
											article={article}
											tagName={tagName}
											lang={lang}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				)}

				{/* Pagination controls (only shown when a tag is active/paginated view) */}
				{activeTag && pagination && pagination.pageCount > 1 && (
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
	)
}
