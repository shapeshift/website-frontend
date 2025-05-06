/************************************************************************************************
 ** ProductStats Component:
 **
 ** Displays a row of key statistics/metrics for product pages
 ** Used specifically by the Trade product to highlight important numbers
 **
 ** Features:
 ** - Flexible layout for displaying multiple statistics
 ** - Responsive design that adapts to mobile and desktop viewports
 ** - Consistent styling with prominent values and explanatory labels
 ** - Handles empty or missing data gracefully
 **
 ** Usage:
 ** - Import and use on product pages that need to display key metrics
 ** - Pass an array of stats with title and value properties
 ** - Stats will be arranged in a row (desktop) or column (mobile)
 ************************************************************************************************/

import type {TStat} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TProductStatsProps = {
	stats: TStat[];
};

export function ProductStats({stats = []}: TProductStatsProps): ReactNode {
	// Handle case where stats is null, undefined, or empty
	if (!stats || stats.length === 0) {
		return <div className={'mb-10 mt-16 text-center text-gray-400'}>{'No statistics available'}</div>;
	}

	return (
		<div
			className={
				'container mb-[120px] mt-2 grid w-full grid-cols-1 gap-6 rounded-2xl bg-secondBg p-6 lg:mb-60 lg:grid-cols-3'
			}>
			{stats.map(stat => (
				<div
					key={stat.id}
					className={'flex min-w-[400px] flex-col items-center lg:min-w-[245px] lg:px-[50px]'}
					aria-label={`${stat.title}: ${stat.value}`}>
					<div className={'text-2xl font-normal leading-tight md:text-3xl lg:text-[40px] lg:leading-[48px]'}>
						{stat.value}
					</div>
					<div className={'text-lg text-gray-500 lg:text-xl'}>{stat.title}</div>
				</div>
			))}
		</div>
	);
}
