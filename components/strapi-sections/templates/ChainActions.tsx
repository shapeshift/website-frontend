import {useMemo} from 'react';

import {IconBorrow} from '@/components/common/icons/IconBorrow';
import {IconBuySell} from '@/components/common/icons/IconBuySell';
import {IconEarn} from '@/components/common/icons/IconEarn';
import {IconHold} from '@/components/common/icons/IconHold';
import {IconSendReceive} from '@/components/common/icons/IconSendReceive';
import {IconTrade} from '@/components/common/icons/IconTrade';

import type {ReactNode} from 'react';

function Feature({title, description, icon}: {title: string; description: string; icon: ReactNode}): ReactNode {
	return (
		<div className={'flex gap-6 rounded-2xl bg-secondBg px-10 py-[30px]'}>
			<div className={'size-16 rounded-2xl bg-white/5 p-5'}>{icon}</div>

			<div className={'flex flex-col gap-1'}>
				<h2 className={'text-2xl'}>{title}</h2>
				<p className={'text-gray-500'}>{description}</p>
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
					description={`Trade ${chainName} with 10,000+ assets across 14 chains.`}
					icon={<IconTrade />}
				/>
			);
		}

		if (features.includes('Hodl')) {
			featuresToDisplay.push(
				<Feature
					key={'Hodl'}
					title={'Hodl'}
					description={`Stack ${chainName} and never let it go.`}
					icon={<IconHold />}
				/>
			);
		}

		if (features.includes('Earn')) {
			featuresToDisplay.push(
				<Feature
					key={'Earn'}
					title={'Earn'}
					description={`Earn ${chainName} passively and permissionlessly.`}
					icon={<IconEarn />}
				/>
			);
		}

		if (features.includes('Borrow')) {
			featuresToDisplay.push(
				<Feature
					key={'Borrow'}
					title={'Borrow'}
					description={`Borrow against ${chainName} and with 0% APY.`}
					icon={<IconBorrow />}
				/>
			);
		}

		if (features.includes('Buy & Sell')) {
			featuresToDisplay.push(
				<Feature
					key={'Buy & Sell'}
					title={'Buy & Sell'}
					description={`Buy and sell ${chainName} instantly.`}
					icon={<IconBuySell />}
				/>
			);
		}

		if (features.includes('Send & Receive')) {
			featuresToDisplay.push(
				<Feature
					key={'Send & Receive'}
					title={'Send & Receive'}
					description={`Send and receive ${chainName} instantly.`}
					icon={<IconSendReceive />}
				/>
			);
		}

		return featuresToDisplay;
	}, [features, chainName]);

	return (
		<section className={'container flex flex-col gap-16'}>
			<h1 className={'max-w-[700px] text-7xl'}>{`What can I do with ${chainName}?`}</h1>
			<div className={'grid grid-cols-1  gap-1 md:grid-cols-3'}>{featuresComponents}</div>
		</section>
	);
}
