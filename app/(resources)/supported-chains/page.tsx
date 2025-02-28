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

import SupportedChainTable from '@/app/(resources)/_components/SupportedChainTable';
import {Banner} from '@/components/common/Banner';

import {ChainList} from '../_components/ChainList';
import {ResourceHeader} from '../_components/ResourceHeader';
import {fetchAllChains} from '../_utils/fetchUtils';

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
			<div className={'mt-[120px] flex w-full justify-center text-center lg:mt-60'}>
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

				{/* Chains grid section */}
				<section
					className={'mt-8'}
					aria-label={'Supported Blockchain Networks'}>
					<ChainList chains={chains} />
				</section>

				{/* Detailed compatibility table */}
				<section
					className={'mt-16'}
					aria-label={'Chain Compatibility Details'}>
					<SupportedChainTable />
				</section>

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
