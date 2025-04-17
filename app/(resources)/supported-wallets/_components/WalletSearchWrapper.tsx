'use client';

import {useEffect, useState} from 'react';

import {Search} from '@/components/common/SearchBar';

import {WalletList} from '../../_components/WalletList';

import type {TSupportedWalletData} from '@/components/strapi/types';

type TWalletSearchWrapperProps = {
	wallets: TSupportedWalletData[];
};

export function WalletSearchWrapper({wallets}: TWalletSearchWrapperProps): JSX.Element {
	const [filteredWallets, setFilteredWallets] = useState(wallets);

	const [searchQuery, setSearchQuery] = useState('');

	const featuredWallets = filteredWallets?.filter(wallet => wallet.isFeatured);
	const nonFeaturedWallets = filteredWallets?.filter(wallet => !wallet.isFeatured);

	useEffect(() => {
		const filtered = wallets.filter(wallet => wallet.name.toLowerCase().includes(searchQuery.toLowerCase()));

		setFilteredWallets(filtered);
	}, [searchQuery, wallets]);

	return (
		<>
			<Search
				searchQuery={searchQuery}
				setSearchQueryAction={setSearchQuery}
			/>

			{/* Featured Wallets */}
			{featuredWallets && featuredWallets.length > 0 && (
				<div className={'mb-12'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Featured Wallets'}</h2>
					<WalletList wallets={featuredWallets} />
				</div>
			)}

			{/* Wallets grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Wallets'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred wallet'}</h2>
				<WalletList wallets={nonFeaturedWallets} />
			</section>
		</>
	);
}
