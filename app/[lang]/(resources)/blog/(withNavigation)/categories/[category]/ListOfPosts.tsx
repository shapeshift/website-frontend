/************************************************************************************************
 ** Category Blog Posts List Component:
 **
 ** Displays a filtered list of blog posts by category
 ** Features loading state, pagination, and empty state handling
 **
 ** Features:
 ** - Uses shared PostList component for consistency
 ** - Maps category slugs to actual category types
 ** - Shows loading state during data fetching
 ** - Handles empty state when no posts are found
 **
 ** Data Flow:
 ** - Accepts category parameter from route
 ** - Converts slug to proper category type
 ** - Passes category filter to the fetch hook
 ************************************************************************************************/

'use client';

import {PostList} from '@/app/[lang]/(resources)/_components/PostList';
import {blogTypesSlugToCategory} from '@/app/[lang]/_utils/constants';

import type {ReactElement} from 'react';

export function ListOfPosts({category}: {category: string}): ReactElement {
	// Convert URL slug to proper category type for the API
	const categoryType = blogTypesSlugToCategory(category);

	// Format category name for display (capitalize first letter)
	const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

	return (
		<PostList
			category={categoryType}
			emptyMessage={`We couldn't find any posts in the ${formattedCategory} category.`}
		/>
	);
}
