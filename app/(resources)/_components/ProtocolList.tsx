'use client';

/************************************************************************************************
 ** ProtocolList Component:
 **
 ** A specialized component for displaying protocol grids
 ** Uses ResourceGrid and ResourceCard for consistent display
 **
 ** Features:
 ** - Optimized for protocol data structure
 ** - Consistent loading and empty states
 ** - Type-safe implementation with proper TS typing
 **
 ** Usage:
 ** - Import in any page that needs to display protocol lists
 ** - Pass protocols data and optional loading state
 ************************************************************************************************/

import {ResourceCard} from '@/app/(resources)/_components/ResourceCard';
import {ResourceGrid} from '@/app/(resources)/_components/ResourceGrid';

import type {TSupportedProtocolData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TProtocolListProps = {
	protocols: TSupportedProtocolData[] | null;
	isLoading?: boolean;
	className?: string;
	isSearchQuery?: boolean;
};

export function ProtocolList({protocols, isLoading, className, isSearchQuery}: TProtocolListProps): ReactNode {
	return (
		<ResourceGrid
			items={protocols}
			isLoading={isLoading}
			emptyMessage={
				isSearchQuery ? "We couldn't find anything matching your search." : 'No protocols available yet.'
			}
			className={className}
			renderItem={protocol => (
				<ResourceCard
					key={protocol.slug}
					slug={protocol.slug}
					title={protocol.name}
					description={protocol.description}
					imageUrl={protocol.featuredImg?.url}
					imageWidth={protocol.featuredImg?.width}
					imageHeight={protocol.featuredImg?.height}
					baseURL={'/supported-protocols'}
					imagePosition={'center'}
					altText={`${protocol.name} logo`}
				/>
			)}
		/>
	);
}
