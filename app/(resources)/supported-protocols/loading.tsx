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

import {ProtocolList} from '../_components/ProtocolList';
import {ResourceHeader} from '../_components/ResourceHeader';

import type {ReactNode} from 'react';

// Static content for the page
const pageContent = {
	title: 'Shift into DeFi with ShapeShift',
	description: 'Explore all the DeFi protocols integrated into the ShapeShift platform.',
	features: ['Multi-Chain Support', 'Non-Custodial', 'User-Friendly Interface'],
	ctaButton: {
		text: 'Get Started',
		url: 'https://app.shapeshift.com/'
	}
};

export default async function Loading(): Promise<ReactNode> {
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

				{/* Protocols list section */}
				<section
					className={'mt-8'}
					aria-label={'Supported Protocols'}>
					<ProtocolList
						isLoading
						protocols={null}
					/>
				</section>

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
