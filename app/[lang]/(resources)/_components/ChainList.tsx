/************************************************************************************************
 ** ChainList Component:
 **
 ** A specialized component for displaying blockchain network grids
 ** Uses ResourceGrid and ResourceCard for consistent display
 **
 ** Features:
 ** - Optimized for blockchain data structure
 ** - Consistent loading and empty states
 ** - Type-safe implementation with proper TS typing
 **
 ** Usage:
 ** - Import in any page that needs to display blockchain network lists
 ** - Pass chains data and optional loading state
 ************************************************************************************************/

import {ResourceCard} from '@/app/[lang]/(resources)/_components/ResourceCard';
import {ResourceGrid} from '@/app/[lang]/(resources)/_components/ResourceGrid';

import type {TSupportedChainData} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

type TChainListProps = {
	chains: TSupportedChainData[] | null;
	isLoading?: boolean;
	className?: string;
	isSearchQuery?: boolean;
};

export function ChainList({chains, isLoading, className, isSearchQuery}: TChainListProps): ReactNode {
	return (
		<ResourceGrid
			items={chains}
			isLoading={isLoading}
			emptyMessage={
				isSearchQuery
					? "We couldn't find anything matching your search."
					: 'No blockchain networks available yet.'
			}
			className={className}
			renderItem={chain => (
				<ResourceCard
					key={chain.slug}
					slug={chain.slug}
					title={chain.name}
					description={chain.description}
					imageUrl={chain.featuredImg?.url}
					imageWidth={chain.featuredImg?.width}
					imageHeight={chain.featuredImg?.height}
					baseURL={'/chains'}
					imagePosition={'bottom'}
					altText={`${chain.name} logo`}
				/>
			)}
		/>
	);
}
