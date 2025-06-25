import {Button} from '@/app/[lang]/_components/Button';
import HeaderItem from '@/app/[lang]/_components/HeaderItem';
import {cl} from '@/app/[lang]/_utils/cl';
import {appProducts, dAppUrl} from '@/app/[lang]/_utils/constants';
import {PRODUCTS_DICT} from '@/app/[lang]/_utils/dictionary/products';

import type {TAppLink} from '@/app/[lang]/_utils/constants';
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
					{PRODUCTS_DICT.header.titleLine1} <br /> {PRODUCTS_DICT.header.titleLine2}
				</p>
				<p className={'mb-10 max-w-[327px] text-sm text-gray-500'}>{PRODUCTS_DICT.header.description}</p>
				<Button
					variant={'blue'}
					className={'whitespace-nowrap'}
					title={PRODUCTS_DICT.header.ctaButton}
					href={dAppUrl}
				/>
			</div>

			{/* Right section with product grid */}
			<div className={'col-span-8 p-16'}>
				<div className={'flex flex-row flex-wrap gap-4'}>
					{appProducts.map((product: TAppLink) => (
						<HeaderItem
							onClick={() => setCurrentTab(product.name)}
							key={product.name}
							name={product.name}
							href={product.href}
							description={product.description ?? ''}
							icon={product.icon}
							target={product.target}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
