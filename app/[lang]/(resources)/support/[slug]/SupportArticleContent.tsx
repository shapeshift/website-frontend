/* eslint-disable @typescript-eslint/no-explicit-any */
import 'highlight.js/styles/github-dark.css'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {isHtml} from '@/app/[lang]/_utils/isHtml'

import type {ReactNode} from 'react'
import type {Components} from 'react-markdown'

export function SupportArticleContent({content}: {content: string}): ReactNode {
	const components: Partial<Components> = {
		// Headers
		h1: ({...props}: any) => (
			<h1
				className={'mb-4 mt-8 text-4xl font-bold'}
				{...props}
			/>
		),
		h2: ({...props}: any) => (
			<h2
				className={'mb-3 mt-6 text-3xl font-bold'}
				{...props}
			/>
		),
		h3: ({...props}: any) => (
			<h3
				className={'mb-2 mt-4 text-2xl font-bold'}
				{...props}
			/>
		),

		// Code blocks
		code: ({className, children, ...props}: any) => {
			const match = /language-(\w+)/.exec(className || '')
			return match ? (
				<div className={'relative'}>
					<div className={'absolute right-2 top-2 text-xs text-gray-400'}>{match[1]}</div>
					<pre className={className}>
						<code
							className={className}
							{...props}>
							{children}
						</code>
					</pre>
				</div>
			) : (
				<code
					className={'rounded bg-gray-800 px-1.5 py-0.5'}
					{...props}>
					{children}
				</code>
			)
		},

		// Tables
		table: ({...props}: any) => (
			<div className={'my-8 overflow-x-auto'}>
				<table
					className={'min-w-full'}
					{...props}
				/>
			</div>
		),
		th: ({...props}: any) => (
			<th
				className={'bg-gray-800 px-6 py-3 text-left'}
				{...props}
			/>
		),
		td: ({...props}: any) => (
			<td
				className={'border-t border-gray-700 px-6 py-4'}
				{...props}
			/>
		),

		// Images
		img: (props: any) => {
			const {src, alt, ...rest} = props || {}
			// Coerce src to string safely (react-markdown may pass string or object)
			const srcString =
				src === null || src === undefined ? '' : typeof src === 'string' ? src : String((src as any).src ?? src)
			const altText = alt ?? ''

			if (!srcString) {
				// Nothing meaningful to render
				return null
			}

			// Use a relative container with a fixed height to avoid CLS while preserving aspect ratio
			return (
				<div className={'my-8 relative h-72 md:h-96 rounded-lg shadow-lg overflow-hidden'}>
					<Image
						src={srcString}
						alt={altText}
						fill
						style={{objectFit: 'contain'}}
						loading={'lazy'}
						sizes={'(max-width: 768px) 100vw, 800px'}
						{...(rest as any)}
					/>
				</div>
			)
		},

		// Blockquotes
		blockquote: ({...props}: any) => (
			<blockquote
				className={'border-blue-500 my-6 border-l-4 pl-4 italic text-gray-300'}
				{...props}
			/>
		),

		// Lists
		ul: ({...props}: any) => (
			<ul
				className={'my-4 list-inside list-disc'}
				{...props}
			/>
		),
		ol: ({...props}: any) => (
			<ol
				className={'my-4 list-inside list-decimal'}
				{...props}
			/>
		),

		// Links
		a: ({...props}: any) => (
			<a
				className={'text-blue underline transition-colors hover:text-blueHover'}
				target={'_blank'}
				rel={'noopener noreferrer'}
				{...props}
			/>
		),
		p: ({...props}: any) => (
			<p
				className={'mb-4'}
				{...props}
			/>
		)
	}

	return (
		<div className={'support-content prose prose-invert max-w-none'}>
			{isHtml(content) ? (
				// eslint-disable-next-line @typescript-eslint/naming-convention
				<div dangerouslySetInnerHTML={{__html: content}} />
			) : (
				<ReactMarkdown
					remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
					rehypePlugins={[rehypeHighlight, rehypeKatex]}
					components={components as any}>
					{content}
				</ReactMarkdown>
			)}

			<style>
				{`
				.support-content {
					/* Base styles */
					font-size: 1.125rem;
					line-height: 1.75;
					color: #e5e7eb;
				}

				/* Code blocks */
				.support-content pre {
					background-color: #1f2937;
					padding: 1.5rem;
					border-radius: 0.5rem;
					overflow-x: auto;
					margin: 1.5rem 0;
					position: relative;
				}

				/* Footnotes */
				.support-content .footnotes {
					border-top: 1px solid #374151;
					margin-top: 2rem;
					padding-top: 1rem;
				}

				.support-content .footnotes ol {
					font-size: 0.875rem;
				}

				/* Definition lists */
				.support-content dl {
					margin: 1.5rem 0;
				}

				.support-content dt {
					font-weight: bold;
					margin-top: 1rem;
				}

				.support-content dd {
					margin-left: 1.5rem;
				}

				/* Custom containers */
				.support-content .warning {
					background-color: #fef3c7;
					border-left: 4px solid #f59e0b;
					padding: 1rem;
					margin: 1.5rem 0;
					color: #92400e;
				}

				.support-content p {
					margin-bottom: 16px;
				}

				.support-content strong {
					margin-top: 20px;
					display: inline-block;
				}
				.support-content img {
					margin-top: 20px;
					margin-bottom: 20px;
				}
			`}
			</style>
		</div>
	)
}
