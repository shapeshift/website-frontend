/**************************************************************************************************
 ** Shared Markdown Component for Terms Pages
 ** Renders content as either HTML (when detected) or Markdown with proper styling
 ** Provides consistent rendering between privacy policy and terms of service pages
 ** Uses the react-markdown library with plugins for GitHub-flavored markdown, emoji, math
 ** Includes custom rendering for various HTML elements with tailwind styling
 ** Handles responsive images, accessible tables, and properly formatted code blocks
 **************************************************************************************************/
'use client';

import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import {memo} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import type {ComponentProps, ReactNode} from 'react';

type TTermsMarkdownProps = {
	content: string;
};

/**************************************************************************************************
 * Helper function to check if content is HTML
 **************************************************************************************************/
function isHtmlContent(content: string): boolean {
	return /<\/?(?:div|span|p|a|img|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|em|strong)[^>]*>/i.test(content);
}

/**************************************************************************************************
 * TermsMarkdown component for rendering markdown content
 **************************************************************************************************/
function TermsMarkdown({content}: TTermsMarkdownProps): ReactNode {
	if (isHtmlContent(content)) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		return <div dangerouslySetInnerHTML={{__html: content}} />;
	}

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
			rehypePlugins={[rehypeHighlight, rehypeKatex]}
			components={{
				// Headers
				h1: ({...props}) => (
					<h1
						className={'mb-4 mt-8 text-4xl font-bold'}
						{...props}
					/>
				),
				h2: ({...props}) => (
					<h2
						className={'mb-3 mt-6 text-3xl font-bold'}
						{...props}
					/>
				),
				h3: ({...props}) => (
					<h3
						className={'mb-2 mt-4 text-2xl font-bold'}
						{...props}
					/>
				),

				// Code blocks
				code: CodeBlock,

				// Tables
				table: ({...props}) => (
					<div className={'my-8 overflow-x-auto'}>
						<table
							className={'min-w-full'}
							{...props}
						/>
					</div>
				),
				th: ({...props}) => (
					<th
						className={'bg-gray-800 px-6 py-3 text-left'}
						{...props}
					/>
				),
				td: ({...props}) => (
					<td
						className={'border-t border-gray-700 px-6 py-4'}
						{...props}
					/>
				),

				// Images - properly typed with next/image
				img: ({src, alt}) => {
					// If src is missing, render nothing
					if (!src) {
						return null;
					}

					return (
						<Image
							src={src}
							alt={alt || ''}
							width={1200}
							height={1200}
							className={'my-8 h-auto max-w-full rounded-lg shadow-lg'}
							loading={'lazy'}
						/>
					);
				},

				// Blockquotes
				blockquote: ({...props}) => (
					<blockquote
						className={'border-blue-500 my-6 border-l-4 pl-4 italic text-gray-300'}
						{...props}
					/>
				),

				// Lists
				ul: ({...props}) => (
					<ul
						className={'my-4 list-inside list-disc'}
						{...props}
					/>
				),
				ol: ({...props}) => (
					<ol
						className={'my-4 list-inside list-decimal'}
						{...props}
					/>
				),
				li: ({...props}) => (
					<li
						className={'my-4 list-inside'}
						{...props}
					/>
				),

				// Links
				a: ({...props}) => (
					<a
						className={'text-blue underline transition-colors hover:text-blueHover'}
						target={'_blank'}
						rel={'noopener noreferrer'}
						{...props}
					/>
				),

				p: ({...props}) => (
					<p
						className={'mb-4'}
						{...props}
					/>
				)
			}}>
			{content}
		</ReactMarkdown>
	);
}

/**************************************************************************************************
 * CodeBlock component for rendering code with syntax highlighting
 **************************************************************************************************/
function CodeBlock({className, children, ...props}: ComponentProps<'code'>): ReactNode {
	const match = /language-(\w+)/.exec(className || '');

	if (match) {
		return (
			<div className={'relative'}>
				<div
					className={'absolute right-2 top-2 text-xs text-gray-400'}
					aria-label={`Language: ${match[1]}`}>
					{match[1]}
				</div>
				<pre className={className}>
					<code
						className={className}
						{...props}>
						{children}
					</code>
				</pre>
			</div>
		);
	}

	return (
		<code
			className={'rounded bg-gray-800 px-1.5 py-0.5'}
			{...props}>
			{children}
		</code>
	);
}

export default memo(TermsMarkdown);
