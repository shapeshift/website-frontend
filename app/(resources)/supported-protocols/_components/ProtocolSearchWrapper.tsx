/**
 * ProtocolSearchWrapper Component
 *
 * A wrapper component that provides search functionality for protocols.
 * It displays protocols in two sections: featured and non-featured protocols.
 * The search functionality filters protocols based on their names.
 */

'use client';

import {useState} from 'react';

import {SearchBar} from '@/components/common/SearchBar';

import {ProtocolList} from '../../_components/ProtocolList';

import type {TSupportedProtocolData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/**************************************************************************************************
 ** ProtocolSearchWrapper Component provides search functionality for protocols
 ** and displays them in featured and non-featured sections
 *************************************************************************************************/

/**************************************************************************************************
 ** Props for the ProtocolSearchWrapper component
 ** @property {TSupportedProtocolData[]} protocols - Array of protocol data to be displayed and filtered
 *************************************************************************************************/
type TProtocolSearchWrapperProps = {
	protocols: TSupportedProtocolData[];
};

/**************************************************************************************************
 ** ProtocolSearchWrapper Component
 **
 ** @param {TProtocolSearchWrapperProps} props - Component props
 ** @returns {ReactNode} Rendered component
 *************************************************************************************************/
export function ProtocolSearchWrapper({protocols}: TProtocolSearchWrapperProps): ReactNode {
	/**********************************************************************************************
	 ** State Management
	 ** - filteredProtocols: protocols filtered by search query
	 ** - searchQuery: current search input value
	 *********************************************************************************************/
	const [filteredProtocols, setFilteredProtocols] = useState(protocols);
	const [searchQuery, setSearchQuery] = useState('');

	/**********************************************************************************************
	 ** Search Handler
	 ** Filters protocols based on name matches (case-insensitive)
	 *********************************************************************************************/
	const handleSearch = (query: string): void => {
		setSearchQuery(query);
		const filtered = protocols.filter(protocol => protocol.name.toLowerCase().includes(query.toLowerCase()));
		setFilteredProtocols(filtered);
	};

	/**********************************************************************************************
	 ** Protocol Filtering
	 ** Split protocols into featured and non-featured categories
	 *********************************************************************************************/
	const featuredProtocols = filteredProtocols?.filter(protocol => protocol.isFeatured);
	const nonFeaturedProtocols = filteredProtocols?.filter(protocol => !protocol.isFeatured);

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/* Featured Protocols */}
			{featuredProtocols && featuredProtocols.length > 0 && (
				<div className={'mb-12'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Featured Protocols'}</h2>
					<ProtocolList
						protocols={featuredProtocols}
						isSearchQuery={Boolean(searchQuery)}
					/>
				</div>
			)}

			{/* Protocols grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Protocols'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred protocol'}</h2>
				<ProtocolList
					protocols={nonFeaturedProtocols}
					isSearchQuery={Boolean(searchQuery)}
				/>
			</section>
		</>
	);
}
