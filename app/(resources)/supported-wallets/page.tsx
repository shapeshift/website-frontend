/************************************************************************************************
 ** Supported Wallets Page:
 **
 ** Main landing page for all compatible wallets that work with ShapeShift
 ** Displays a visual grid of supported wallet options
 **
 ** Features:
 ** - Reusable ResourceHeader component for consistent UI
 ** - Server-side data fetching with error handling
 ** - Visual wallet grid with logos and descriptions
 ** - Responsive layout for all screen sizes
 **
 ** Technical Implementation:
 ** - Uses Next.js server components for data fetching
 ** - Leverages WalletList component for wallet display
 ** - Implements descriptive section headings for better accessibility
 ************************************************************************************************/

import {Banner} from '@/components/common/Banner';

import {ResourceHeader} from '../_components/ResourceHeader';
import {WalletList} from '../_components/WalletList';
import {fetchAllWallets} from '../_utils/fetchUtils';

import type {ReactNode} from 'react';

// Static content for the page
const pageContent = {
	title: 'Bring your own wallet',
	description:
		'Connect your favorite self-custody wallet to access the full ShapeShift platform and all supported chains.',
	features: ['Non-Custodial', 'Multi-Provider Support', 'Enhanced Privacy'],
	ctaButton: {
		text: 'Get Started',
		url: 'https://app.shapeshift.com/'
	}
};

export default async function WalletPage(): Promise<ReactNode> {
	// Fetch wallets data
	const wallets = await fetchAllWallets();

	const featuredWallets = wallets?.filter(wallet => wallet.isFeatured);

	// Handle loading and error states
	if (!wallets) {
		return (
			<div className={'mt-[120px] flex w-full justify-center text-center lg:mt-60'}>
				<p className={'text-red-400'}>{'Unable to load wallet data. Please try again later.'}</p>
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

				{/* Featured Wallets */}
				{featuredWallets && featuredWallets.length > 0 && (
					<div className={'mb-12'}>
						<h2 className={'mb-6 text-2xl font-medium'}>{'Featured Wallets'}</h2>
						<WalletList wallets={featuredWallets} />
					</div>
				)}

				{/* Wallets grid section */}
				<section
					className={'mt-8'}
					aria-label={'Supported Wallets'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred wallet'}</h2>
					<WalletList wallets={wallets.filter(wallet => !wallet.isFeatured)} />
				</section>

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
