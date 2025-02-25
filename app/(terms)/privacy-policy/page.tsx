import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex'; // For math rendering
import remarkEmoji from 'remark-emoji'; // For emoji support
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'; // For math equations

import {PrivacyPolicyStyle} from '@/app/(terms)/privacy-policy/style';
import {cl} from '@/components/utils/cl';
import {getPrivacyPolicy} from '@/components/utils/query';

import type {ReactNode} from 'react';

function Policy({policy}: {policy: string}): ReactNode {
	const isHtml = /<\/?(?:div|span|p|a|img|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|em|strong)[^>]*>/i.test(policy);
	return isHtml ? (
		// eslint-disable-next-line @typescript-eslint/naming-convention
		<div dangerouslySetInnerHTML={{__html: policy}} />
	) : (
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
				code: ({className, children, ...props}) => {
					const match = /language-(\w+)/.exec(className || '');
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
					);
				},

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
			{policy}
		</ReactMarkdown>
	);
}

export default async function PrivacyPolicyPage(): Promise<ReactNode> {
	const privacyPolicy = await getPrivacyPolicy();
	if (!privacyPolicy) {
		return notFound();
	}
	return (
		<main className={'terms-of-service mx-auto mt-40 max-w-[800px] divide-y-2 px-4 py-8'}>
			{privacyPolicy.policy.map((policy, index) => (
				<div
					key={policy.id}
					className={cl('mb-[128px]', index === 0 ? 'pt-0' : 'pt-[128px]')}>
					<h1 className={'mb-4 text-6xl font-bold'}>{policy.title}</h1>
					<p className={'mb-16 text-sm text-gray-500'}>{new Date(policy.date).toLocaleDateString()}</p>

					<Policy policy={policy.policy} />
				</div>
			))}
			<PrivacyPolicyStyle />
		</main>
	);
}
