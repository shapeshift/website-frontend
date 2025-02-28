/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 ** Resources Section Constants:
 **
 ** Centralized configuration and constants for the resources section
 ** Provides reusable data structures across different resource pages
 **
 ** Contents:
 ** - DEFAULT_PAGINATION: Default pagination settings for list pages
 ** - RESOURCE_METADATA: Default metadata templates for resource pages
 ** - DEFAULT_FEATURES: Common feature items used across protocol/wallet pages
 **
 ** Benefits:
 ** - Ensures consistency across similar pages
 ** - Makes site-wide updates easier to manage
 ** - Provides central location for reused values
 ************************************************************************************************/

/************************************************************************************************
 * Default pagination settings used across resource list pages
 ************************************************************************************************/
export const DEFAULT_PAGINATION = {
	PAGE_SIZE: 12,
	SORT: 'desc' as const,
	INITIAL_PAGE: 1
};

/************************************************************************************************
 * Metadata templates for different resource types
 * Used for SEO and social sharing
 ************************************************************************************************/
export const RESOURCE_METADATA = {
	blog: {
		titleTemplate: '%s | ShapeShift Blog',
		defaultDescription: "Explore ShapeShift's blog for the latest updates on DeFi and crypto.",
		defaultKeywords: 'ShapeShift, blog, cryptocurrency, DeFi, blockchain'
	},
	discover: {
		titleTemplate: '%s | Discover with ShapeShift',
		defaultDescription: 'Discover %s with ShapeShift!',
		defaultKeywords: '%s, ShapeShift, discover, cryptocurrency'
	},
	protocol: {
		titleTemplate: '%s Protocol | ShapeShift',
		defaultDescription: 'Learn about %s protocol and how to use it with ShapeShift.',
		defaultKeywords: '%s, protocol, ShapeShift, DeFi'
	},
	wallet: {
		titleTemplate: '%s Wallet | ShapeShift',
		defaultDescription: 'Connect your %s wallet to ShapeShift.',
		defaultKeywords: '%s, wallet, ShapeShift, cryptocurrency'
	}
};

/************************************************************************************************
 * Common feature items displayed on protocol and wallet pages
 ************************************************************************************************/
export const DEFAULT_FEATURES = ['Self-custodial', 'Private', 'Multichain trading'];
