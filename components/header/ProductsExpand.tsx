import {Button} from '../common/Button';
import HeaderItem from '../common/HeaderItem';
import {appProducts, dAppUrl} from '../constants';
import {expandAnimation} from './animations';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Products expand section in the header
 * Shows product information and navigation items
 * @param {Function} setCurrentTab - Function to update the current tab state
 ********************************************************************************************/
export function ProductsExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<div
			className={'flex max-w-[1400px] justify-between'}
			{...expandAnimation}>
			{/* Left section with main CTA */}
			<div className={'mt-16 flex flex-col pb-10 pr-10'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Your Wallet. One App.'}
					<br />
					{'Endless Opportunity'}
				</p>
				<p className={'mb-10 max-w-[327px] text-sm text-gray-500'}>
					{'Trade Bitcoin, Ethereum, and more with top rates across leading DEXs and aggregators.'}
				</p>
				<Button
					variant={'blue'}
					title={'Get Started'}
					href={dAppUrl}
				/>
			</div>
			<div className={'mx-16 border border-white/5'} />

			{/* Right section with product grid */}
			<div className={'mt-16 pb-10'}>
				<div className={'grid grid-cols-3 gap-4'}>
					{appProducts.map(product => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={product.name}
							name={product.name}
							href={product.href}
							description={product.description}
							icon={product.icon}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
