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

import {ResourceCard} from '@/app/(resources)/_components/ResourceCard';
import {ResourceGrid} from '@/app/(resources)/_components/ResourceGrid';

import type {TSupportedWalletData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TWalletListProps = {
	wallets: TSupportedWalletData[] | null;
	isLoading?: boolean;
	className?: string;
};

export function WalletList({wallets, isLoading, className}: TWalletListProps): ReactNode {
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
