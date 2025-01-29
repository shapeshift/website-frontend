import {motion} from 'framer-motion';

import {Button} from '../common/Button';
import HeaderItem from '../common/HeaderItem';
import {appProducts} from '../constants';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Products expand section in the header
 * Shows product information and navigation items
 * @param {Function} setCurrentTab - Function to update the current tab state
 ********************************************************************************************/
export function ProductsExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<motion.div
			className={'mt-16 flex max-w-[1400px] justify-between pb-10'}
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{
				y: {duration: 0.4, ease: [0.23, 1, 0.32, 1]},
				opacity: {duration: 0.3}
			}}>
			{/* Left section with main CTA */}
			<div className={'flex flex-col border-r border-stoke pr-10'}>
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
					href={'/products/dapp'}
				/>
			</div>

			{/* Right section with product grid */}
			<div>
				<div className={'grid grid-cols-3 gap-4'}>
					{appProducts.map(product => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={product.name}
							name={product.name}
							href={product.href}
							description={product.description}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
}
