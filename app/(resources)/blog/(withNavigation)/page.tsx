/************************************************************************************************
** Blog List Page:
**
** Displays a paginated grid of blog posts
** Features loading state, pagination, and empty state handling
**
** Features:
** - Client-side pagination for better UX
** - Loading skeletons during data fetch
** - Responsive grid layout for different screen sizes
** - Accessible navigation controls
**
** Data Flow:
** - Uses useFetchPosts hook to retrieve blog data
** - Handles pagination state in client component
** - Manages loading and empty states appropriately
************************************************************************************************/

'use client';

import {PostList} from '@/app/(resources)/_components/blog/PostList';

import type {ReactNode} from 'react';

export default function BlogListPage(): ReactNode {
	return (
		<PostList 
			emptyMessage="We couldn't find any blog posts matching your criteria."
		/>
	);
}
