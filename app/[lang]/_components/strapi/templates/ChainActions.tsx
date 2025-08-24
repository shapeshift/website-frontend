import {useMemo} from 'react';

import {IconBorrow} from '@/app/[lang]/_icons/IconBorrow';
import {IconBuySell} from '@/app/[lang]/_icons/IconBuySell';
import {IconEarn} from '@/app/[lang]/_icons/IconEarn';
import {IconHold} from '@/app/[lang]/_icons/IconHold';
import {IconSendReceive} from '@/app/[lang]/_icons/IconSendReceive';
import {IconTrade} from '@/app/[lang]/_icons/IconTrade';

import type {ReactNode} from 'react';

function Feature({title, description, icon}: {title: string; description: string; icon: ReactNode}): ReactNode {
	return (
		<div className={'flex items-center gap-6 rounded-2xl bg-secondBg px-6 py-[26px] lg:px-10 lg:py-[30px]'}>
			<div className={'size-12 rounded-[12px] bg-white/5 p-[12px] lg:size-16 lg:rounded-2xl lg:p-5'}>{icon}</div>

			<div className={'flex flex-col gap-1'}>
				<h2 className={'lg:text-2xl'}>{title}</h2>
				<p className={'text-sm text-gray-500 lg:text-base'}>{description}</p>
			</div>
		</div>
	);
}

export function ChainActions({features, chainName}: {features: string[]; chainName: string}): ReactNode {
	const featuresComponents = useMemo((): ReactNode[] => {
		const featuresToDisplay = [];
		if (features.includes('Trade')) {
			featuresToDisplay.push(
				<Feature
					key={'Trade'}
					title={'Trade'}
					description={`Trade 10,000+ assets on ${chainName} across 15 chains.`}
					icon={<IconTrade />}
				/>
			);
		}

		if (features.includes('Hodl')) {
			featuresToDisplay.push(
				<Feature
					key={'Hodl'}
					title={'Hodl'}
					description={`Stack crypto on ${chainName} and never let it go.`}
					icon={<IconHold />}
				/>
			);
		}

		if (features.includes('Earn')) {
			featuresToDisplay.push(
				<Feature
					key={'Earn'}
					title={'Earn'}
					description={`Put your assets to work with one-click ${chainName} DeFi yield.`}
					icon={<IconEarn />}
				/>
			);
		}

		if (features.includes('Borrow')) {
			featuresToDisplay.push(
				<Feature
					key={'Borrow'}
					title={'Discover'}
					description={`Explore new tokens and rising DeFi projects on ${chainName}.`}
					icon={<IconBorrow />}
				/>
			);
		}

		if (features.includes('Buy & Sell')) {
			featuresToDisplay.push(
				<Feature
					key={'Buy & Sell'}
					title={'Buy & Sell'}
					description={`Buy and sell assets on ${chainName} instantly.`}
					icon={<IconBuySell />}
				/>
			);
		}

		if (features.includes('Send & Receive')) {
			featuresToDisplay.push(
				<Feature
					key={'Send & Receive'}
					title={'Send & Receive'}
					description={`Send and receive crypto on ${chainName} with ease.`}
					icon={<IconSendReceive />}
				/>
			);
		}

		return featuresToDisplay;
	}, [features, chainName]);

	return (
		<section className={'container flex flex-col gap-6 lg:gap-16'}>
			<h1 className={'max-w-[700px] text-[28px] leading-[32px] lg:text-7xl'}>
				{`What can I do on ${chainName}?`}
			</h1>
			<div className={'grid grid-cols-1 gap-6 md:grid-cols-3'}>{featuresComponents}</div>
		</section>
	);
}
