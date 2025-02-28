import {notFound} from 'next/navigation';

import {AccelerateData} from '@/app/(resources)/supported-wallets/AccelerateData';
import {Header} from '@/app/(resources)/supported-wallets/Header';
import {Hero} from '@/app/(resources)/supported-wallets/Hero';
import {Banner} from '@/components/common/Banner';
import {StrapiFAQ} from '@/components/StrapiFAQ';
import {getSupportedWallet} from '@/components/utils/query';

import type {TSupportedWalletData} from '@/types/strapi';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.STRAPI_URL}/api/supported-wallets?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const wallet = data.data[0] as TSupportedWalletData;
	if (!wallet) {
		return notFound();
	}

	const imageUrl = wallet.featuredImg.formats.thumbnail.url;
	return {
		title: `${wallet.name} | ShapeShift Wallets`,
		description: `Shapeshift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
		keywords: `${wallet.name}, Shapeshift`,
		openGraph: {
			title: wallet.name,
			description: `Shapeshift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: wallet.name,
			description: `Shapeshift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

export default async function WalletPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const wallet = await getSupportedWallet(slug);

	if (!wallet) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[60px] flex flex-col justify-center'}>
				<div className={'mb-12'}>
					<Hero
						url={`${process.env.STRAPI_URL}${wallet?.featuredImg?.url}`}
						name={wallet?.name}
						width={wallet?.featuredImg?.width}
						height={wallet?.featuredImg?.height}
					/>
				</div>
				<Header
					title={wallet?.name}
					description={wallet?.description}
					items={['Self-custodial', 'Private', 'Multichain trading']}
				/>

				<AccelerateData />

				<StrapiFAQ />

				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
