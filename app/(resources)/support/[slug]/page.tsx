'use client';

import 'highlight.js/styles/github-dark.css';
import {notFound, useParams, useRouter} from 'next/navigation';
import Script from 'next/script';

import {SupportArticleContent} from '@/app/(resources)/support/[slug]/SupportArticleContent';
import {generateSupportArticleSchema} from '@/app/_utils/schema';
import {Banner} from '@/components/common/Banner';
import {IconBack} from '@/components/common/icons/IconBack';
import {useCachedArticles} from '@/components/contexts/CachedArticles';
import {useFetchSupportArticles} from '@/hooks/useFetchSupportArticles';

import type {ReactNode} from 'react';

function LoadingSkeleton(): ReactNode {
	return (
		<div className={'animate-pulse'}>
			<div className={'mb-4 h-8 w-3/4 rounded bg-gray-800'} />
			<div className={'mb-8 h-64 rounded bg-gray-800'} />
			<div className={'space-y-4'}>
				<div className={'h-4 w-full rounded bg-gray-800'} />
				<div className={'h-4 w-5/6 rounded bg-gray-800'} />
				<div className={'h-4 w-4/6 rounded bg-gray-800'} />
			</div>
		</div>
	);
}

export default function SupportArticle(): ReactNode {
	const {slug} = useParams();
	const {
		cachedResponse: {data: cachedArticles}
	} = useCachedArticles();
	const {articles, isLoading} = useFetchSupportArticles({
		page: 1,
		pageSize: 1,
		sort: 'desc',
		populateContent: true,
		cacheArticles: true,
		slug: slug as string
	});

	const article = [...cachedArticles, ...articles].find(a => a.slug === slug);
	const router = useRouter();

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (!article) {
		notFound();
	}

	// Generate structured data for the support article
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com';
	const articleSchema = generateSupportArticleSchema(article, baseUrl);

	return (
		<>
			{/* Add structured data */}
			<Script
				id={'support-article-schema'}
				type={'application/ld+json'}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}}
			/>

			<article className={'prose prose-invert container relative mx-auto mb-20 mt-40 max-w-4xl px-4'}>
				<button
					className={'absolute -left-32 top-0 flex items-center gap-1 p-3 pt-0 text-gray-500'}
					onClick={() => router.back()}>
					<IconBack />
					<span>{'Back'}</span>
				</button>
				<div className={'mb-8 text-gray-400'}>{new Date(article.publishedAt).toLocaleDateString()}</div>

				<h1 className={'mb-4 text-4xl font-bold'}>{article.title}</h1>
				<SupportArticleContent content={article.content} />
			</article>
			{!isLoading && (
				<div className={'container mx-auto'}>
					<Banner />
				</div>
			)}
		</>
	);
}
