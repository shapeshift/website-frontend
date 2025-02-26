import {Suspense} from 'react';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Shift into DeFi with ShapeShift',
		description: 'Discover all the protocols Shapeshift supports. Buy, sell, and swap crypto with ease.',
		keywords: 'Shapeshift, Supported Protocols',
		openGraph: {
			title: 'Shift into DeFi with ShapeShift',
			description: 'Discover all the wallets Shapeshift supports. Buy, sell, and swap crypto with ease.',
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Shift into DeFi with ShapeShift',
			description: 'Discover all the protocols Shapeshift supports. Buy, sell, and swap crypto with ease.',
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
