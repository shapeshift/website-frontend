/************************************************************************************************
 ** Protocols Page:
 **
 ** Main landing page for supported protocols
 ** Displays a list of all protocols supported by ShapeShift
 **
 ** Features:
 ** - Reusable components for consistent UI
 ** - Server-side data fetching with error handling
 ** - Responsive layout for all screen sizes
 **
 ** Technical Implementation:
 ** - Uses Next.js server components for data fetching
 ** - Leverages ResourceHeader for consistent header structure
 ** - Implements responsive design with Tailwind CSS
 ************************************************************************************************/

import {Banner} from '@/components/common/Banner';

import {ResourceHeader} from '../_components/ResourceHeader';
import {fetchAllProtocols} from '../_utils/fetchUtils';
import {ProtocolSearchWrapper} from './_components/ProtocolSearchWrapper';

import type {ReactNode} from 'react';

// Static content for the page
const pageContent = {
	title: 'Shift into DeFi with ShapeShift',
	description: 'Enter and exit top DeFi protocols in one-click with ShapeShift',
	features: ['Multi-Chain Support', 'Non-Custodial', 'User-Friendly Interface'],
	ctaButton: {
		text: 'Get Started',
		url: 'https://app.shapeshift.com/'
	}
};

export default async function ProtocolsPage(): Promise<ReactNode> {
	// Fetch protocols data
	const protocols = await fetchAllProtocols();

	// Handle loading and error states
	if (!protocols) {
		return (
			<div className={'mt-[120px] flex w-full justify-center text-center lg:mt-60'}>
				<p className={'text-red-400'}>{'Unable to load protocols. Please try again later.'}</p>
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

				<ProtocolSearchWrapper protocols={protocols} />

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
