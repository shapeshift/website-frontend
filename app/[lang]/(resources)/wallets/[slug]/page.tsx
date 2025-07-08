import {notFound} from 'next/navigation';

import {SupportedWalletAccelerate} from '@/app/[lang]/(resources)/_components/SupportedWalletAccelerate';
import {SupportedWalletHeader} from '@/app/[lang]/(resources)/_components/SupportedWalletHeader';
import {SupportedWalletHero} from '@/app/[lang]/(resources)/_components/SupportedWalletHero';
import {Banner} from '@/app/[lang]/_components/Banner';
import {StrapiFAQ} from '@/app/[lang]/_components/StrapiFAQ';
import {getSupportedWallet} from '@/app/[lang]/_utils/query';

import type {TSupportedWalletData} from '@/app/[lang]/_components/strapi/types';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/supported-wallets?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const wallet = data.data[0] as TSupportedWalletData;
	if (!wallet) {
		return notFound();
	}

	const imageUrl = wallet.featuredImg?.formats?.thumbnail?.url || wallet.featuredImg?.url;
	const metadata: Metadata = {
		title: `${wallet.name} | ShapeShift Wallets`,
		description: `ShapeShift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
		keywords: `${wallet.name}, ShapeShift`,
		openGraph: {
			title: wallet.name,
			description: `ShapeShift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
			type: 'website'
		},
		twitter: {
			card: 'summary_large_image',
			title: wallet.name,
			description: `ShapeShift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`
		}
	};

	if (imageUrl) {
		metadata.openGraph!.images = [
			{
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
			}
		];
		metadata.twitter!.images = [
			{
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
			}
		];
	}

	return metadata;
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
					<SupportedWalletHero
						url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${wallet?.featuredImg?.url}`}
						name={wallet?.name}
						width={wallet?.featuredImg?.width}
						height={wallet?.featuredImg?.height}
					/>
				</div>
				<SupportedWalletHeader
					title={wallet?.name}
					description={wallet?.description}
					items={['Self-custodial', 'Private', 'Multichain trading']}
				/>

				<SupportedWalletAccelerate />

				<StrapiFAQ />

				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
