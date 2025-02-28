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

export function ProductStats({stats}: TProductStatsProps): ReactNode {
	if (!stats || stats.length === 0) {
		return null;
	}
	
	return (
		<div className={'mb-16 mt-20 flex w-full flex-col items-center justify-center gap-4 lg:flex-row'}>
			{stats.map(stat => (
				<div
					key={stat.id}
					className={'flex w-min flex-col items-center lg:min-w-[245px]'}>
					<div className={'w-min text-[40px] font-normal leading-[48px]'}>{stat.value}</div>
					<div className={'text-xl text-gray-500'}>{stat.title}</div>
				</div>
			))}
		</div>
	);
}