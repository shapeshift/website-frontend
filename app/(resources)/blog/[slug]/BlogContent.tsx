import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex'; // For math rendering
import remarkEmoji from 'remark-emoji'; // For emoji support
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'; // For math equations

import {isHtml} from '@/components/utils/isHtml';

import type {ReactNode} from 'react';

export function BlogContent({content}: {content: string}): ReactNode {
	return (
		<div className={'blog-content prose prose-invert no-translate max-w-none'}>
			{isHtml(content) ? (
				// eslint-disable-next-line @typescript-eslint/naming-convention
				<div
					className={'no-translate'}
					dangerouslySetInnerHTML={{__html: content}}
				/>
			) : (
				<ReactMarkdown
					remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
					rehypePlugins={[rehypeHighlight, rehypeKatex]}
					components={{
						// Headers
						h1: ({...props}) => (
							<h1
								className={'no-translate mb-4 mt-8 text-4xl font-bold'}
								{...props}
							/>
						),
						h2: ({...props}) => (
							<h2
								className={'no-translate mb-3 mt-6 text-3xl font-bold'}
								{...props}
							/>
						),
						h3: ({...props}) => (
							<h3
								className={'no-translate mb-2 mt-4 text-2xl font-bold'}
								{...props}
							/>
						),

						// Code blocks
						code: ({className, children, ...props}) => {
							const match = /language-(\w+)/.exec(className || '');
							return match ? (
								<div className={'relative'}>
									<div className={'absolute right-2 top-2 text-xs text-gray-400'}>{match[1]}</div>
									<pre className={className}>
										<code
											className={`${className} no-translate`}
											{...props}>
											{children}
										</code>
									</pre>
								</div>
							) : (
								<code
									className={'no-translate rounded bg-gray-800 px-1.5 py-0.5'}
									{...props}>
									{children}
								</code>
							);
						},

						// Tables
						table: ({...props}) => (
							<div className={'my-8 overflow-x-auto'}>
								<table
									className={'no-translate min-w-full'}
									{...props}
								/>
							</div>
						),
						th: ({...props}) => (
							<th
								className={'no-translate bg-gray-800 px-6 py-3 text-left'}
								{...props}
							/>
						),
						td: ({...props}) => (
							<td
								className={'no-translate border-t border-gray-700 px-6 py-4'}
								{...props}
							/>
						),

						// Images
						img: ({...props}) => (
							<Image
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								width={1200}
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								height={1200}
								className={'my-8 h-auto max-w-full rounded-lg shadow-lg'}
								loading={'lazy'}
								{...props}
							/>
						),

						// Blockquotes
						blockquote: ({...props}) => (
							<blockquote
								className={'no-translate border-blue-500 my-6 border-l-4 pl-4 italic text-gray-300'}
								{...props}
							/>
						),

						// Lists
						ul: ({...props}) => (
							<ul
								className={'no-translate my-4 list-inside list-disc'}
								{...props}
							/>
						),
						ol: ({...props}) => (
							<ol
								className={'no-translate my-4 list-inside list-decimal'}
								{...props}
							/>
						),

						// Links
						a: ({...props}) => (
							<a
								className={'no-translate text-blue underline transition-colors hover:text-blueHover'}
								target={'_blank'}
								rel={'noopener noreferrer'}
								{...props}
							/>
						),
						p: ({...props}) => (
							<p
								className={'no-translate mb-4'}
								{...props}
							/>
						)
					}}>
					{content}
				</ReactMarkdown>
			)}

			<style
				jsx
				global>
				{`
					.blog-content {
						/* Base styles */
						font-size: 1.125rem;
						line-height: 1.75;
						color: #e5e7eb;
					}

					/* Code blocks */
					.blog-content pre {
						background-color: #1f2937;
						padding: 1.5rem;
						border-radius: 0.5rem;
						overflow-x: auto;
						margin: 1.5rem 0;
						position: relative;
					}

					/* Footnotes */
					.blog-content .footnotes {
						border-top: 1px solid #374151;
						margin-top: 2rem;
						padding-top: 1rem;
					}

					.blog-content .footnotes ol {
						font-size: 0.875rem;
					}

					/* Definition lists */
					.blog-content dl {
						margin: 1.5rem 0;
					}

					.blog-content dt {
						font-weight: bold;
						margin-top: 1rem;
					}

					.blog-content dd {
						margin-left: 1.5rem;
					}

					/* Custom containers */
					.blog-content .warning {
						background-color: #fef3c7;
						border-left: 4px solid #f59e0b;
						padding: 1rem;
						margin: 1.5rem 0;
						color: #92400e;
					}

					.blog-content p {
						margin-bottom: 16px;
					}

					.blog-content strong {
						margin-top: 20px;
						display: inline-block;
					}
					.blog-content img {
						margin-top: 20px;
						margin-bottom: 20px;
					}
				`}
			</style>
		</div>
	);
}
