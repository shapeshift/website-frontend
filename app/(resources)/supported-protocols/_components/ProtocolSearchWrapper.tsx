'use client';

import {useState} from 'react';

import {SearchBar} from '@/components/common/SearchBar';

import {ProtocolList} from '../../_components/ProtocolList';

import type {TSupportedProtocolData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TProtocolSearchWrapperProps = {
	protocols: TSupportedProtocolData[];
};

export function ProtocolSearchWrapper({protocols}: TProtocolSearchWrapperProps): ReactNode {
	const [filteredProtocols, setFilteredProtocols] = useState(protocols);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string): void => {
		setSearchQuery(query);
		const filtered = protocols.filter(protocol => protocol.name.toLowerCase().includes(query.toLowerCase()));
		setFilteredProtocols(filtered);
	};

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/* Protocols grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Protocols'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred protocol'}</h2>
				<ProtocolList
					protocols={filteredProtocols}
					isSearchQuery={Boolean(searchQuery)}
				/>
			</section>
		</>
	);
}
