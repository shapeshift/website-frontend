/************************************************************************************************
 ** ResourceGrid Component:
 **
 ** A reusable grid component for displaying resource items in a consistent format
 ** Provides standardized layout, loading states, and empty states
 **
 ** Features:
 ** - Responsive grid layout with configurable columns
 ** - Consistent empty and loading states
 ** - Flexible content rendering via children prop
 ** - Type-safe implementation
 **
 ** Usage:
 ** - Import for any resource listing that requires a grid layout
 ** - Pass isLoading prop to show loading state
 ** - Pass items array and renderItem function to customize display
 ************************************************************************************************/

import type {ReactElement, ReactNode} from 'react';

type TResourceGridProps<T> = {
	items: T[] | null | undefined;
	renderItem: (item: T, index: number) => ReactNode;
	isLoading?: boolean;
	emptyMessage?: string;
	className?: string;
};

export function ResourceGrid<T>({
	items,
	renderItem,
	isLoading = false,
	emptyMessage = 'No items available yet.',
	className = ''
}: TResourceGridProps<T>): ReactNode {
	// Handle loading state
	if (isLoading) {
		return (
			<div
				className={'h-[50vh]'}
				aria-busy={true}
				aria-label={'Loading content'}
			/>
		);
	}

	// Handle empty state
	if (!items || items.length === 0) {
		return (
			<div className={'flex w-full justify-center'}>
				<div className={'container flex flex-col items-center justify-center py-16'}>
					<p className={'text-xl text-gray-400'}>{emptyMessage}</p>
				</div>
			</div>
		);
	}

	// Render grid with items
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={`mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
					{items.map((item, index) => renderItem(item, index) as ReactElement)}
				</div>
			</div>
		</div>
	);
}
