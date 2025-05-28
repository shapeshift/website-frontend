/************************************************************************************************
 ** Supported Chains Page:
 **
 ** Main landing page displaying all blockchain networks supported by ShapeShift
 ** Shows a visual grid of chains and detailed compatibility table
 **
 ** Features:
 ** - Reusable ResourceHeader component for consistent UI
 ** - Server-side data fetching with error handling
 ** - Visual chain grid and detailed compatibility table
 ** - Responsive layout for all screen sizes
 **
 ** Technical Implementation:
 ** - Uses Next.js server components for data fetching
 ** - Leverages ChainList component for chain display
 ** - Implements SupportedChainTable for detailed compatibility information
 ************************************************************************************************/

import Image from 'next/image';

import {ChainsBanner} from '@/components/ChainsBanner';
import {Button} from '@/components/common/Button';
import {requestChainUrl} from '@/components/constants';

import {ResourceHeader} from '../_components/ResourceHeader';
import {fetchAllChains} from '../_utils/fetchUtils';
import {ChainSearchWrapper} from './_components/ChainSearchWrapper';

import type {ReactNode} from 'react';

// Static content for the page
const pageContent = {
	title: 'Supported Chains',
	description:
		'Explore all the blockchain networks integrated into the ShapeShift platform for seamless multi-chain access.',
	features: ['Multi-Chain Support', 'Self-Custody', 'Cross-Chain Trading'],
	ctaButton: {
		text: 'Get Started',
		url: 'https://app.shapeshift.com/'
	}
};

export default async function SupportedChainsPage(): Promise<ReactNode> {
	// Fetch chains data
	const chains = await fetchAllChains();

	// Handle loading and error states
	if (!chains) {
		return (
			<div className={'my-[120px] flex w-full justify-center text-center lg:my-60'}>
				<p className={'text-red-400'}>{'Unable to load chain data. Please try again later.'}</p>
			</div>
		);
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col justify-center lg:mt-60'}>
				{/* Reusable header component */}
				<ResourceHeader
					title={pageContent.title}
					description={pageContent.description}
					items={pageContent.features}
					ctaButton={pageContent.ctaButton}
					className={'mb-12'}
				/>

				<ChainSearchWrapper chains={chains} />
				<div className={'flex w-full justify-center'}>
					<div
						className={
							'relative my-16 grid h-[320px] w-full grid-cols-1 overflow-hidden rounded-2xl bg-secondBg px-10 py-12 lg:w-1/2 lg:grid-cols-2'
						}>
						<div className={'absolute left-0 top-0 max-h-[320px] w-full'}>
							<Image
								src={'/request-chain-bg.png'}
								width={1600}
								height={640}
								alt={'Request chain'}
								className={'h-[320px] w-full object-cover'}
							/>
						</div>
						<div
							className={
								'z-10 flex max-w-[312px] items-start justify-start text-[32px] leading-10 	lg:text-[40px] lg:leading-10'
							}>
							{"Don't see your chain? Request it here"}
						</div>
						<div className={'flex items-end justify-end'}>
							<Button
								hasArrow
								title={'Request chain'}
								variant={'white'}
								href={requestChainUrl}
							/>
						</div>
					</div>
				</div>

				{/* Footer banner */}
				<div className={'my-16'}>
					<ChainsBanner
						tag={'ShapeShift DeFi wallet'}
						title={'Your favorite chains. One wallet to rule them all.'}
						href={'/defi-wallet'}
						buttonText={'Get Started'}
					/>
				</div>
			</div>
		</div>
	);
}
