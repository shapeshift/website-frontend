import {ElementCard} from '@/components/ElementCard';

import type {TSupportedWalletData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiWallets(props: {wallets?: TSupportedWalletData[] | null; isLoading?: boolean}): ReactNode {
	const {wallets, isLoading} = props;
	if (isLoading) {
		return <div className={'h-[50vh]'} />;
	}

	if (!wallets || wallets.length === 0) {
		return (
			<div className={'flex w-full justify-center'}>
				<div className={'container flex flex-col items-center justify-center py-16'}>
					<p className={'text-xl text-gray-400'}>{'No protocols items available yet.'}</p>
				</div>
			</div>
		);
	}
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{(wallets || []).map(wallet => {
						return (
							<ElementCard
								key={wallet.slug}
								slug={wallet.slug}
								title={wallet.name}
								description={wallet.description}
								featuredImg={wallet.featuredImg}
								baseURL={'/supported-wallets'}
								position={'center'}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
