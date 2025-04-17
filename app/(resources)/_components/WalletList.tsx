'use client';

/************************************************************************************************
 ** WalletList Component:
 **
 ** A specialized component for displaying wallet grids
 ** Uses ResourceGrid and ResourceCard for consistent display
 **
 ** Features:
 ** - Optimized for wallet data structure
 ** - Consistent loading and empty states
 ** - Type-safe implementation with proper TS typing
 **
 ** Usage:
 ** - Import in any page that needs to display wallet lists
 ** - Pass wallets data and optional loading state
 ************************************************************************************************/

import {ResourceCard} from './ResourceCard';
import {ResourceGrid} from './ResourceGrid';

import type {TSupportedWalletData} from '@/components/strapi/types';

type TWalletListProps = {
	wallets: TSupportedWalletData[] | null;
	isLoading?: boolean;
	className?: string;
};

export function WalletList({wallets, isLoading, className}: TWalletListProps): JSX.Element {
	if (!wallets?.length) {
		return <div className={'text-center text-gray-500'}>{'We couldn’t find anything matching your search.'}</div>;
	}

	return (
		<ResourceGrid
			items={wallets}
			isLoading={isLoading}
			emptyMessage={'No wallets available yet.'}
			className={className}
			renderItem={wallet => (
				<ResourceCard
					key={wallet.slug}
					slug={wallet.slug}
					title={wallet.name}
					description={wallet.description}
					imageUrl={wallet.featuredImg?.url}
					imageWidth={wallet.featuredImg?.width}
					imageHeight={wallet.featuredImg?.height}
					baseURL={'/supported-wallets'}
					imagePosition={'center'}
					altText={`${wallet.name} logo`}
				/>
			)}
		/>
	);
}
