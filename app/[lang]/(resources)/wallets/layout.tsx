import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'ShapeShift Supported Wallets',
		description: 'Discover all the wallets ShapeShift supports. Buy, sell, and swap crypto with ease.',
		keywords: 'ShapeShift, Supported Wallets',
		openGraph: {
			title: 'ShapeShift Supported Wallets',
			description: 'Discover all the wallets ShapeShift supports. Buy, sell, and swap crypto with ease.',
			type: 'website',
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/og.png`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: 'ShapeShift Supported Wallets',
			description: 'Discover all the wallets ShapeShift supports. Buy, sell, and swap crypto with ease.',
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/og.png`
				}
			]
		}
	};
}

export default function Layout({children}: {children: ReactNode}): ReactNode {
	return children;
}
