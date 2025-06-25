/* eslint-disable @typescript-eslint/naming-convention */
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
 ** - Uses centralized configuration from constants.ts
 **
 ** Usage:
 ** - Place at the bottom of product pages to provide a final call-to-action
 ** - Specify the product name to automatically apply correct configuration
 ** - Maintains consistent branding and messaging
 ************************************************************************************************/

import {FooterBanner, FooterBannerMobileApp} from '@/app/[lang]/_components/FooterBanner';

import {PRODUCT_FOOTER_CONFIGS} from './constants';

import type {ReactNode} from 'react';

type TProductFooterBannerProps = {
	productName: keyof typeof PRODUCT_FOOTER_CONFIGS;
};

export function ProductFooterBanner({productName}: TProductFooterBannerProps): ReactNode {
	// Get configuration for the specified product
	const config = PRODUCT_FOOTER_CONFIGS[productName];

	// Verify config exists to prevent runtime errors
	if (!config) {
		console.error(`No footer configuration found for product: ${productName}`);
		return null;
	}

	// Use mobile-app specific banner for the mobile app product
	if (productName === 'mobile-app') {
		return (
			<FooterBannerMobileApp
				tag={config.tag}
				title={config.title}
				href={config.href}
				buttonText={config.buttonText}
			/>
		);
	}

	// Standard footer banner for other products
	return (
		<FooterBanner
			tag={config.tag}
			title={config.title}
			href={config.href}
			buttonText={config.buttonText}
		/>
	);
}
