import {Banner} from '@/components/common/Banner';
import {ChainActions} from '@/components/strapi-sections/templates/ChainActions';
import {ChainFeatures} from '@/components/strapi-sections/templates/ChainFeatures';
import {Description} from '@/components/strapi-sections/templates/Description';
import {Header} from '@/components/strapi-sections/templates/Header';
import {Hero} from '@/components/strapi-sections/templates/Hero';

import type {TTemplateChainActionsSection, TTemplateDescriptionSection} from '@/types/strapi';
import type {ReactNode} from 'react';

const descriptionData: TTemplateDescriptionSection = {
	id: 1,
	title: 'What is Bitcoin?',
	articles: [
		'Bitcoin was the first significant cryptocurrency created. This digital currency was developed anonymously by Satoshi Nakamoto (pseudonym). Bitcoin is a digital currency that allows anyone to store, send and receive BTC from a Bitcoin wallet. Bitcoin uses a decentralized public ledger known as the blockchain to keep track of all accounts and balances.',
		'Users can send funds by writing transactions to the blockchain when using a Bitcoin wallet. Those transactions are sent to miners with fees  to pay the miners, who will verify the transaction to be added to the public ledger, making the transaction complete.'
	]
};

const chainActionsData: TTemplateChainActionsSection = {
	id: 1,
	title: 'What can I do with Bitcoin?',
	actions: [
		{
			id: 1,
			title: 'Hodl',
			description: 'Stack Bitcoin and never let it go.',
			icon: {
				url: '/templates/templateHeroBg.png',
				width: 1400,
				height: 360,
				formats: {thumbnail: {url: '/templates/templateHeroBg.png', width: 3840, height: 2256}}
			}
		},
		{
			id: 2,
			title: 'Earn',
			description: 'Earn Bitcoin passively and permissionlessly.',
			icon: {
				url: '/templates/templateHeroBg.png',
				width: 1400,
				height: 360,
				formats: {thumbnail: {url: '/templates/templateHeroBg.png', width: 3840, height: 2256}}
			}
		},
		{
			id: 3,
			title: 'Trade',
			description: 'Trade Bitcoin with 10,000+ assets across 14 chains.',
			icon: {
				url: '/templates/templateHeroBg.png',
				width: 1400,
				height: 360,
				formats: {thumbnail: {url: '/templates/templateHeroBg.png', width: 3840, height: 2256}}
			}
		},
		{
			id: 4,
			title: 'Borrow',
			description: 'Borrow against Bitcoin and with 0% APY.',
			icon: {
				url: '/templates/templateHeroBg.png',
				width: 1400,
				height: 360,
				formats: {thumbnail: {url: '/templates/templateHeroBg.png', width: 3840, height: 2256}}
			}
		},
		{
			id: 5,
			title: 'Buy & Sell',
			description: 'Buy and sell Bitcoin instantly.',
			icon: {
				url: '/templates/templateHeroBg.png',
				width: 1400,
				height: 360,
				formats: {thumbnail: {url: '/templates/templateHeroBg.png', width: 3840, height: 2256}}
			}
		},
		{
			id: 6,
			title: 'Send & Receive',
			description: 'Send and receive Bitcoin instantly.',
			icon: {
				url: '/templates/templateHeroBg.png',
				width: 1400,
				height: 360,
				formats: {thumbnail: {url: '/templates/templateHeroBg.png', width: 3840, height: 2256}}
			}
		}
	]
};

export default function TemplatesPage(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'context mt-[220px] flex flex-col justify-center'}>
				<Header chainName={'Bitcoin'} />

				<div className={'mb-[240px] mt-16'}>
					<Hero featuredImg={'/templates/templateHeroBg.png'} />
				</div>
				<Description data={descriptionData} />

				<div className={'mt-[240px]'}>
					<ChainActions data={chainActionsData} />
				</div>

				<div className={'mt-[240px]'}>
					<ChainFeatures
						chainName={'Bitcoin'}
						data={chainActionsData}
					/>
				</div>

				<div className={'mt-[240px]'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
