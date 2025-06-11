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

import type {TSupportedWalletData} from '@/app/_components/strapi/types';

type TWalletListProps = {
	wallets: TSupportedWalletData[] | null;
	isLoading?: boolean;
	className?: string;
	isSearchQuery?: boolean;
};

export function WalletList({wallets, isLoading, className, isSearchQuery}: TWalletListProps): JSX.Element {
	return (
		<ResourceGrid
			items={wallets}
			isLoading={isLoading}
			emptyMessage={
				isSearchQuery ? "We couldn't find anything matching your search." : 'No wallets available yet.'
			}
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
					baseURL={'/wallets'}
					imagePosition={'center'}
					altText={`${wallet.name} logo`}
				/>
			)}
		/>
	);
}
