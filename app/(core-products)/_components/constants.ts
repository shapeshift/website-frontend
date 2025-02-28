/************************************************************************************************
 ** Product Section Constants:
 **
 ** Centralized configuration data for product pages
 ** Contains reusable static content to avoid duplication across components
 **
 ** Contents:
 ** - PRODUCT_FOOTER_CONFIGS: Configuration for footer banners by product type
 ** 
 ** Benefits:
 ** - Reduces duplication across components
 ** - Makes product-specific configuration easier to maintain
 ** - Allows for adding new products without modifying component logic
 ************************************************************************************************/

/**
 * Footer banner configuration for each product type
 * Contains display text, button text, and target URLs
 */
export const PRODUCT_FOOTER_CONFIGS = {
	'defi-wallet': {
		tag: 'ShapeShift DeFi wallet',
		title: 'Everything you need in one place.',
		buttonText: 'Get started',
		href: 'https://app.shapeshift.com'
	},
	earn: {
		tag: 'Earn with ShapeShift',
		title: 'Everything you need in one place.',
		buttonText: 'Start Earning',
		href: 'https://app.shapeshift.com/#/earn'
	},
	trade: {
		tag: 'Trade with ShapeShift',
		title: 'Everything you need in one place.',
		buttonText: 'Start Trading',
		href: 'https://app.shapeshift.com/'
	},
	'mobile-app': {
		tag: 'ShapeShift mobile app',
		title: 'Everything you need in one place.',
		buttonText: 'Start Earning',
		href: 'https://app.shapeshift.com/#/earn'
	}
};