/************************************************************************************************
** ProductFooterBanner Component:
**
** A specialized version of the FooterBanner component tailored for product pages
** Provides product-specific CTA text and links while maintaining consistent styling
** 
** Features:
** - Customized tag text for each product (e.g., "Trade with ShapeShift")
** - Product-specific CTA button text and target URL
** - Consistent visual styling across all product pages
** - Background image with text overlay and CTA button
**
** Usage:
** - Place at the bottom of product pages to provide a final call-to-action
** - Configure with product-specific text and links
** - Maintains consistent branding and messaging
************************************************************************************************/

import {FooterBanner, FooterBannerMobileApp} from '@/components/FooterBanner';

import type {ReactNode} from 'react';

type TProductFooterBannerProps = {
	productName: 'defi-wallet' | 'earn' | 'trade' | 'mobile-app';
};

export function ProductFooterBanner({productName}: TProductFooterBannerProps): ReactNode {
	// Product-specific configuration
	const configs = {
		'defi-wallet': {
			tag: 'ShapeShift DeFi wallet',
			buttonText: 'Get started',
			href: 'https://app.shapeshift.com'
		},
		earn: {
			tag: 'Earn with ShapeShift',
			buttonText: 'Start Earning',
			href: 'https://app.shapeshift.com/#/earn'
		},
		trade: {
			tag: 'Trade with ShapeShift',
			buttonText: 'Start Trading',
			href: 'https://app.shapeshift.com/'
		},
		'mobile-app': {
			tag: 'ShapeShift mobile app',
			buttonText: 'Start Earning',
			href: 'https://app.shapeshift.com/#/earn'
		}
	};

	const config = configs[productName];
	
	// Use mobile-app specific banner for the mobile app product
	if (productName === 'mobile-app') {
		return (
			<FooterBannerMobileApp
				tag={config.tag}
				title={'Everything you need in one place.'}
				href={config.href}
				buttonText={config.buttonText}
			/>
		);
	}
	
	// Standard footer banner for other products
	return (
		<FooterBanner
			tag={config.tag}
			title={'Everything you need in one place.'}
			href={config.href}
			buttonText={config.buttonText}
		/>
	);
}