/************************************************************************************************
 ** Support List Page:
 **
 ** Displays a paginated grid of support articles
 ** Features loading state, pagination, and empty state handling
 **
 ** Features:
 ** - Client-side pagination for better UX
 ** - Loading skeletons during data fetch
 ** - Responsive grid layout for different screen sizes
 ** - Accessible navigation controls
 **
 ** Data Flow:
 ** - Uses useFetchSupportArticles hook to retrieve support data
 ** - Handles pagination state in client component
 ** - Manages loading and empty states appropriately
 ************************************************************************************************/

'use client';

import {SupportArticleList} from '../../_components/SupportArticleList';

import type {ReactNode} from 'react';

export default function SupportListPage(): ReactNode {
	return (
		<>
			<SupportArticleList emptyMessage={"We couldn't find any support articles matching your criteria."} />
		</>
	);
}
