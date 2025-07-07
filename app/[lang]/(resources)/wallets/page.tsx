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

import {Banner} from '@/app/[lang]/_components/Banner';
import {WalletRequestCard} from '@/app/[lang]/_components/WalletRequestCard';
import {requestUrl} from '@/app/[lang]/_utils/constants';

import {ResourceHeader} from '../_components/ResourceHeader';
import {fetchAllWallets} from '../_utils/fetchUtils';
import {WalletSearchWrapper} from './_components/WalletSearchWrapper';

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

				<WalletSearchWrapper wallets={wallets} />

				<div className={'flex w-full justify-center'}>
					<div className={'my-16 grid h-[1000px] grid-cols-1 gap-4 lg:h-[480px] lg:grid-cols-2'}>
						<WalletRequestCard
							title={"Don't see your wallet? Request it here"}
							buttonTitle={'Request wallet'}
							buttonHref={requestUrl}
							bgImage={'/request-card-bg.png'}
						/>

						<WalletRequestCard
							title={'Or create a new ShapeShift wallet'}
							buttonTitle={'Create wallet'}
							buttonHref={'/defi-wallet'}
							bgImage={'/create-wallet-bg.png'}
							buttonVariant={'blue'}
						/>
					</div>
				</div>

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
