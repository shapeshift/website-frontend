import {Suspense} from 'react';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Explore Web3 with ShapeShift',
		description: 'Discover the world of Web3 with ShapeShift.',
		keywords: 'Shapeshift, Explore Web3',
		openGraph: {
			title: 'Explore Web3 with ShapeShift',
			description: 'Discover the world of Web3 with ShapeShift.',
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Explore Web3 with ShapeShift',
			description: 'Discover the world of Web3 with ShapeShift.',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		}
	};
}

export default function Layout({children}: {children: ReactNode}): ReactNode {
	return <Suspense>{children}</Suspense>;
}
