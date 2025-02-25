import {notFound} from 'next/navigation';

import {AccelerateData} from '@/app/resources/supported-wallets/AccelerateData';
import {Header} from '@/app/resources/supported-wallets/Header';
import {Hero} from '@/app/resources/supported-wallets/Hero';
import {Banner} from '@/components/common/Banner';
import {StrapiFAQ} from '@/components/StrapiFAQ';
import {getSupportedWallet} from '@/components/utils/query';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

const WALLET_NAME = 'KeepKey';
const WALLET_DESCRIPTION =
	'ShapeShift is the main interface for KeepKey, letting you manage and trade your assets securely and easily. With this combo, you get strong security and user-friendly features for a great crypto experience';

export const metadata: Metadata = {
	title: `ShapeShift supports ${WALLET_NAME}`,
	description: WALLET_DESCRIPTION
};

export default async function WalletPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const wallet = await getSupportedWallet(slug);

	if (!wallet) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'context mt-[220px] flex flex-col justify-center'}>
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
