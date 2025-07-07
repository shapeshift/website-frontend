import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Explore multiple chains with ShapeShift',
		description: 'Discover all the chains ShapeShift supports. Buy, sell, and swap crypto with ease.',
		keywords: 'ShapeShift, Supported Chains',
		openGraph: {
			title: 'Explore multiple chains with ShapeShift',
			description: 'Discover all the chains ShapeShift supports. Buy, sell, and swap crypto with ease.',
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Explore multiple chains with ShapeShift',
			description: 'Discover all the chains ShapeShift supports. Buy, sell, and swap crypto with ease.',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		}
	};
}

export default function Layout({children}: {children: ReactNode}): ReactNode {
	return children;
}
