import {Banner} from '@/components/common/Banner';
import {ChainActions} from '@/components/strapi-sections/templates/ChainActions';
import {ChainDescription} from '@/components/strapi-sections/templates/ChainDescription';
import {ChainFeatures} from '@/components/strapi-sections/templates/ChainFeatures';
import {ChainHeader} from '@/components/strapi-sections/templates/ChainHeader';
import {ChainHero} from '@/components/strapi-sections/templates/ChainHero';

import type {ReactNode} from 'react';

export default function TemplatesPage(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[220px] flex flex-col justify-center'}>
				<ChainHeader chainName={'Bitcoin'} />

				<div className={'mb-[240px] mt-16'}>
					<ChainHero
						url={'/templates/templateHeroBg.png'}
						name={'Bitcoin'}
						width={1400}
						height={360}
					/>
				</div>
				<ChainDescription
					chainName={'Bitcoin'}
					description={
						'Bitcoin was the first significant cryptocurrency created. This digital currency was developed anonymously by Satoshi Nakamoto (pseudonym). Bitcoin is a digital currency that allows anyone to store, send and receive BTC from a Bitcoin wallet. Bitcoin uses a decentralized public ledger known as the blockchain to keep track of all accounts and balances.\n\nUsers can send funds by writing transactions to the blockchain when using a Bitcoin wallet. Those transactions are sent to miners with fees  to pay the miners, who will verify the transaction to be added to the public ledger, making the transaction complete.'
					}
				/>

				<div className={'mt-[240px]'}>
					<ChainActions
						features={['Hodl', 'Earn', 'Trade', 'Borrow', 'Buy & Sell', 'Send & Receive']}
						chainName={'Bitcoin'}
					/>
				</div>

				<div className={'mt-[240px]'}>
					<ChainFeatures
						chainName={'Bitcoin'}
						foxImg={{
							url: '/templates/fox.png',
							width: 100,
							height: 100,
							formats: {thumbnail: {url: '/templates/fox.png', width: 100, height: 100}}
						}}
					/>
				</div>

				<div className={'mt-[240px]'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
