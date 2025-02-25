'use client';

import type {ReactNode} from 'react';

export function PrivacyPolicyStyle(): ReactNode {
	return (
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
	);
}
