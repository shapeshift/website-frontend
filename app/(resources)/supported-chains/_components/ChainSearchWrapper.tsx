'use client';

import {useState} from 'react';

import {SearchBar} from '@/components/common/SearchBar';

import {ChainList} from '../../_components/ChainList';

import type {TSupportedChainData} from '@/components/strapi/types';

type TChainSearchWrapperProps = {
	chains: TSupportedChainData[];
};

export function ChainSearchWrapper({chains}: TChainSearchWrapperProps): JSX.Element {
	const [filteredChains, setFilteredChains] = useState(chains);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string): void => {
		setSearchQuery(query);
		const filtered = chains.filter(chain => chain.name.toLowerCase().includes(query.toLowerCase()));
		setFilteredChains(filtered);
	};

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/* Chains grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Chains'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred chain'}</h2>
				<ChainList chains={filteredChains} />
			</section>
		</>
	);
}
