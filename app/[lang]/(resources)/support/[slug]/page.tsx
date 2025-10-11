import 'highlight.js/styles/github-dark.css'
import {notFound} from 'next/navigation'
import Script from 'next/script'
import {Suspense} from 'react'

import {SupportArticleContent} from '@/app/[lang]/(resources)/support/[slug]/SupportArticleContent'
import SupportArticleClient from '@/app/[lang]/(resources)/support/_components/SupportArticleClient'
import {Banner} from '@/app/[lang]/_components/Banner'
import {generateSupportArticleSchema} from '@/app/[lang]/_utils/schema'

import type {ReactNode} from 'react'

type TParams = {params: {lang?: string; slug?: string}}

export default async function SupportArticle({params}: TParams): Promise<ReactNode> {
	const {slug} = await params
	if (!slug) {
		return notFound()
	}

	const SLUG_REGEX = /^[A-Za-z0-9-]+$/
	if (!SLUG_REGEX.test(slug)) {
		return notFound()
	}
	const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
	const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

	if (!STRAPI_URL) {
		throw new Error('Server configuration error: Missing STRAPI_URL or NEXT_PUBLIC_STRAPI_URL')
	}

	const encodedSlug = encodeURIComponent(slug)
	const url = `${STRAPI_URL}/api/support-articles?populate[0]=featuredImg&fields[0]=slug&fields[1]=summary&fields[2]=title&fields[3]=publishedAt&fields[4]=tags&fields[5]=content&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1&pagination[withCount]=true&filters[slug][$eq]=${encodedSlug}`

	const res = await fetch(url, {
		// ensure we don't serve stale content from cache; use no-store for always fresh
		cache: 'no-store',
		headers: STRAPI_TOKEN ? {Authorization: `Bearer ${STRAPI_TOKEN}`} : undefined
	})

	if (!res.ok) {
		return notFound()
	}

	const data = await res.json()
	const article = data?.data?.[0] ?? null
	if (!article) {
		return notFound()
	}

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com'
	const articleSchema = generateSupportArticleSchema(article, baseUrl)

	return (
		<>
			<Script
				id={'support-article-schema'}
				type={'application/ld+json'}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}}
			/>

			<article className={'prose prose-invert container relative mx-auto mb-20 mt-40 max-w-4xl px-4'}>
				<Suspense
					fallback={
						<div className={'absolute -left-32 top-0 flex items-center gap-2'}>
							<div className={'h-8 w-8 rounded bg-gray-700 animate-pulse'} />
							<div className={'h-4 w-20 rounded bg-gray-700 animate-pulse'} />
						</div>
					}>
					<SupportArticleClient />
				</Suspense>

				<div className={'mb-8 text-gray-400'}>{new Date(article.publishedAt).toLocaleDateString()}</div>

				<h1 className={'mb-4 text-4xl font-bold'}>{article.title}</h1>
				<SupportArticleContent content={article.content} />
			</article>
			<div className={'container mx-auto'}>
				<Banner />
			</div>
		</>
	)
}
