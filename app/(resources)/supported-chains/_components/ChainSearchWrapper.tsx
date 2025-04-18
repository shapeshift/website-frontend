'use client';

import {useState} from 'react';

import {Dropdown} from '@/components/common/Dropdown';
import {SearchBar} from '@/components/common/SearchBar';
import {CHAIN_TYPES} from '@/components/constants';

import {ChainList} from '../../_components/ChainList';

import type {TSupportedChainData, TSupportedChainsType} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TChainSearchWrapperProps = {
	chains: TSupportedChainData[];
};

/**************************************************************************************************
 ** ChainSearchWrapper Component
 **
 ** A component that provides search and filter functionality for supported blockchain chains.
 ** Allows filtering chains by type (EVM, Solana, Bitcoin, Cosmos) and searching by chain name.
 **
 ** @param {TChainSearchWrapperProps} props - Component props containing array of chain data
 ** @returns {ReactNode} Rendered component with search, filter, and chain list
 *************************************************************************************************/
export function ChainSearchWrapper({chains}: TChainSearchWrapperProps): ReactNode {
	/** State for search query and selected chain type filter **/
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedType, setSelectedType] = useState<'All chains' | TSupportedChainsType>('All chains');

	/**********************************************************************************************
	 ** Filter chains based on selected chain type
	 ** Returns all chains if 'All chains' is selected, otherwise filters by typeOfChain
	 *********************************************************************************************/
	const chainsByType = chains.filter(chain => {
		if (selectedType === 'All chains') {
			return true;
		}
		return chain.typeOfChain === selectedType;
	});

	/**********************************************************************************************
	 ** Further filter chains by search query
	 ** Filters the type-filtered chains by matching chain names with search query
	 *********************************************************************************************/
	const filteredChains = chainsByType.filter(chain => chain.name.toLowerCase().includes(searchQuery.toLowerCase()));

	/**********************************************************************************************
	 ** Handle search input changes
	 ** Updates search query state when user types in search bar
	 *********************************************************************************************/
	const handleSearch = (query: string): void => {
		setSearchQuery(query);
	};

	/**********************************************************************************************
	 ** Handle chain type selection changes
	 ** Updates selected chain type when user selects from dropdown
	 *********************************************************************************************/
	const handleTypeChange = (value: string): void => {
		setSelectedType(value as 'All chains' | TSupportedChainsType);
	};

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/** Chains grid section **/}
			<section
				className={'mt-8'}
				aria-label={'Supported Chains'}>
				<div className={'mb-6 flex w-full justify-between'}>
					<h2 className={'text-2xl font-medium'}>{'Chains'}</h2>
					<Dropdown
						options={CHAIN_TYPES}
						value={selectedType}
						onChangeAction={handleTypeChange}
						allItemsLabel={'All chains'}
					/>
				</div>
				<ChainList
					chains={filteredChains}
					isSearchQuery={Boolean(searchQuery)}
				/>
			</section>
		</>
	);
}
