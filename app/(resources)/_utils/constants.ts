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
 * Common feature items displayed on protocol and wallet pages
 ************************************************************************************************/
export const DEFAULT_FEATURES = ['Self-custodial', 'Private', 'Multichain trading'];
