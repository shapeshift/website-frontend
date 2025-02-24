import {AccelerateData} from '@/app/resources/supported-wallets/AccelerateData';
import {Header} from '@/app/resources/supported-wallets/Header';
import {Banner} from '@/components/common/Banner';
import {Hero} from '@/components/strapi-sections/templates/Hero';
import {StrapiFAQ} from '@/components/StrapiFAQ';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

const WALLET_NAME = 'KeepKey';
const WALLET_DESCRIPTION =
	'ShapeShift is the main interface for KeepKey, letting you manage and trade your assets securely and easily. With this combo, you get strong security and user-friendly features for a great crypto experience';

export const metadata: Metadata = {
	title: `ShapeShift supports ${WALLET_NAME}`,
	description: WALLET_DESCRIPTION
};

export default function WalletPage(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'context mt-[220px] flex flex-col justify-center'}>
				<div className={'mb-12'}>
					<Hero
						data={{
							id: 1,
							image: {
								url: '/supported-wallets/keepkey.jpg',
								width: 1400,
								height: 360,
								formats: {
									thumbnail: {url: '/templates/keepkey.jpg', width: 3840, height: 2256}
								}
							}
						}}
					/>
				</div>
				<Header
					title={WALLET_NAME}
					description={WALLET_DESCRIPTION}
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
