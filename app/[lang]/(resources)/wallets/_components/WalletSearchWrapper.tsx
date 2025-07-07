'use client';

import {useState} from 'react';

import {SearchBar} from '@/app/[lang]/_components/SearchBar';

import {WalletList} from '../../_components/WalletList';

import type {TSupportedWalletData} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

type TWalletSearchWrapperProps = {
	wallets: TSupportedWalletData[];
};

export function WalletSearchWrapper({wallets}: TWalletSearchWrapperProps): ReactNode {
	const [filteredWallets, setFilteredWallets] = useState(wallets);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string): void => {
		setSearchQuery(query);
		const filtered = wallets.filter(wallet => wallet.name.toLowerCase().includes(query.toLowerCase()));
		setFilteredWallets(filtered);
	};

	const featuredWallets = filteredWallets?.filter(wallet => wallet.isFeatured);
	const nonFeaturedWallets = filteredWallets?.filter(wallet => !wallet.isFeatured);

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/* Featured Wallets */}
			{featuredWallets && featuredWallets.length > 0 && (
				<div className={'mb-12'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Featured Wallets'}</h2>
					<WalletList
						wallets={featuredWallets}
						isSearchQuery={!!searchQuery}
					/>
				</div>
			)}

			{/* Wallets grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Wallets'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred wallet'}</h2>
				<WalletList
					wallets={nonFeaturedWallets}
					isSearchQuery={!!searchQuery}
				/>
			</section>
		</>
	);
}
