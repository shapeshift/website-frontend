'use client';

import {useState} from 'react';

import {SearchBar} from '@/app/[lang]/_components/SearchBar';
import {StrapiDiscover} from '@/app/[lang]/_components/StrapiDiscover';

import type {TDiscoverData} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

type TDiscoverSearchWrapperProps = {
	discover: TDiscoverData[] | null;
};

/**************************************************************************************************
 ** DiscoverSearchWrapper Component
 **
 ** A component that provides search functionality for discover items.
 ** Allows searching by item name and filters items based on the search query.
 **
 ** @param {TDiscoverSearchWrapperProps} props - Component props containing array of discover data
 ** @returns {ReactNode} Rendered component with search and discover list
 *************************************************************************************************/
export function DiscoverSearchWrapper({discover}: TDiscoverSearchWrapperProps): ReactNode {
	const [searchQuery, setSearchQuery] = useState('');

	/**********************************************************************************************
	 ** Filter discover items by search query
	 ** Filters items by matching names with search query
	 *********************************************************************************************/
	const filteredDiscover = discover?.filter(
		item =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.tag.toLowerCase().includes(searchQuery.toLowerCase())
	);

	/**********************************************************************************************
	 ** Group discover items by type for organized display
	 ** This reduces the array of discover items into an object where:
	 ** - Keys are the different types (categories) of discover items
	 ** - Values are arrays of items belonging to each type
	 *********************************************************************************************/
	const groupedDiscover = filteredDiscover?.reduce(
		(acc, item) => {
			const type = item.type;
			if (!acc[type]) {
				acc[type] = [];
			}
			acc[type].push(item);
			return acc;
		},
		{} as Record<string, TDiscoverData[]>
	);

	return (
		<div className={'flex w-full flex-col gap-8'}>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={setSearchQuery}
			/>

			{groupedDiscover &&
				Object.entries(groupedDiscover).map(([type, items]) => (
					<section
						key={type}
						className={'mt-8'}>
						<h2 className={'mb-6 text-2xl font-medium'}>{type}</h2>
						<StrapiDiscover discover={items} />
					</section>
				))}
		</div>
	);
}
