import {cl} from '@/components/utils/cl';

import {Button} from '../common/Button';
import HeaderItem from '../common/HeaderItem';
import {appProducts, dAppUrl} from '../constants';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Products expand section in the header
 * Shows product information and navigation items
 * @param {Function} setCurrentTab - Function to update the current tab state
 ********************************************************************************************/
export function ProductsExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<div className={cl('grid grid-cols-12 h-full')}>
			{/* Left section with main CTA */}
			<div className={'col-span-4 flex flex-col border-r border-white/5 p-16'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Your Wallet. One App.'}
					<br />
					{'Endless Opportunity'}
				</p>
				<p className={'mb-10 max-w-[327px] text-sm text-gray-500'}>
					{'Trade Bitcoin, Ethereum and more with the best rates across leading DEXs and aggregators.'}
				</p>
				<Button
					variant={'blue'}
					title={'Trade Smarter'}
					href={dAppUrl}
				/>
			</div>

			{/* Right section with product grid */}
			<div className={'col-span-8 p-16'}>
				<div className={'flex flex-row flex-wrap gap-4'}>
					{appProducts.map(product => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={product.name}
							name={product.name}
							href={product.href}
							description={product.description ?? ''}
							icon={product.icon}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
