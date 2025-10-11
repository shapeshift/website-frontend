'use client'
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

	// server-side filtering: always fetch the configured pageSize from the server so
	// tag discovery and counts are accurate. For grouped preview mode we still limit
	// the visual preview to 9 items per tag in the UI (see .slice below).
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

	// Preserve a master list of tags so that when a single tag is active we
	// still can display all available tags (like radio buttons) instead of
	// hiding the other options. We populate `allTags` from the groupedTags
	// when available, and as a fallback we prefetch an unfiltered page to
	// discover tags when the page is loaded already filtered by tag.
	const [allTags, setAllTags] = useState<string[] | null>(null)

	// Prefetch unfiltered articles only when we don't yet have `allTags`.
	const {articles: discoveryArticles} = useFetchSupportArticles({
		page: 1,
		pageSize,
		sort,
		populateContent: false,
		cacheArticles: false,
		tag: undefined,
		search: undefined,
		skip: allTags !== null
	})

	useEffect(() => {
		if (!activeTag && groupedTags.length > 0 && allTags === null) {
			setAllTags(groupedTags)
		}
	}, [activeTag, groupedTags, allTags])

	useEffect(() => {
		if (discoveryArticles && discoveryArticles.length > 0) {
			const discovered = Array.from(new Set(discoveryArticles.flatMap(a => a.tags ?? []))).sort()
			// Merge existing allTags (if any), discovered tags, and the activeTag so
			// we don't accidentally drop the currently active tag if it's not
			// present on the discovery page.
			const merged = Array.from(
				new Set([...(allTags ?? []), ...(discovered ?? []), ...(activeTag ? [activeTag] : [])])
			).sort()
			if (allTags === null || merged.join('|') !== (allTags || []).join('|')) {
				setAllTags(merged)
			}
		}
	}, [allTags, discoveryArticles, activeTag])

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

	const displayTags = allTags ?? groupedTags

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
							tags={displayTags}
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
				) : (
					<div className={'space-y-12 mb-20'}>
						{activeTag ? (
							// When a tag is active show a single flat grid of that tag's articles
							<div>
								<div className={'mb-4'}>
									<div className={'flex items-center justify-between'}>
										<div className={'flex items-center gap-4'}>
											<h2 className={'text-2xl'}>{activeTag}</h2>
										</div>
									</div>
								</div>
								<div
									className={cl(
										'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
										gridClassName
									)}>
									{(groupedArticles[activeTag] ?? filteredArticles ?? []).map(
										(article: TSupportArticle) => (
											<ArticleCard
												key={article.slug}
												article={article}
												tagName={activeTag}
												lang={lang}
											/>
										)
									)}
								</div>
							</div>
						) : (
							// Grouped preview mode: render each tag section as before
							groupedTags.map(tagName => (
								<div key={tagName}>
									<div className={'mb-4'}>
										<div className={'flex items-center justify-between'}>
											<div className={'flex items-center gap-4'}>
												<h2 className={'text-2xl'}>{tagName}</h2>
												{/* Desktop inline View all — hide when a tag/search is active */}
												{!searchQuery && (
													<LocalizedLink
														className={'hidden lg:inline-block text-sm text-gray-400'}
														href={`/${lang}/support?tag=${encodeURIComponent(tagName)}`}>
														{'View all'}
													</LocalizedLink>
												)}
											</div>
											{/* Mobile: small 'View all' under title (visible on sm and down) */}
											{!searchQuery && (
												<div className={'block lg:hidden'}>
													<LocalizedLink
														className={'text-sm text-gray-400'}
														href={`/${lang}/support?tag=${encodeURIComponent(tagName)}`}>
														{'View all'}
													</LocalizedLink>
												</div>
											)}
										</div>
									</div>
									<div
										className={cl(
											'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
											gridClassName
										)}>
										{(groupedArticles[tagName] ?? [])
											.slice(0, 6)
											.map((article: TSupportArticle) => (
												<ArticleCard
													key={article.slug}
													article={article}
													tagName={tagName}
													lang={lang}
												/>
											))}
									</div>
								</div>
							))
						)}
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
