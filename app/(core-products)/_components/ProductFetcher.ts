/************************************************************************************************
 ** ProductFetcher Utility:
 **
 ** A centralized, type-safe data fetching module for all core product pages
 **
 ** Purpose:
 ** - Provides consistent, reusable data fetching patterns across product pages
 ** - Enforces proper typing for all API responses
 ** - Encapsulates Strapi API query structure complexity
 ** - Implements proper error handling and caching strategies
 **
 ** Data Architecture:
 ** - Uses TBaseProductPage for common properties across products
 ** - Extends base type with product-specific data requirements
 ** - Ensures all complex nested Strapi relationships are properly typed
 **
 ** Features:
 ** - Automatic error handling with detailed error logging
 ** - HTTP status code validation
 ** - Consistent 1-hour cache revalidation strategy
 ** - Secure API token handling through environment variables
 ** - Standardized null return for error conditions (to trigger notFound())
 **
 ** Usage Example:
 **   const page = await fetchTradePage();
 **   if (!page) return notFound();
 **   // Use typed page data safely in your component
 ************************************************************************************************/

import {fetchWithErrorHandling} from './fetchUtils';

import type {
	TButton,
	TCardsRowSection,
	TDownloadButton,
	TFooterSection,
	TGridDisplacedSection,
	TGridLadderSection,
	TGridSection,
	TStat,
	TStrapiImage
} from '@/components/strapi/types';

/************************************************************************************************
 ** Product Page Type Definitions
 **
 ** These types define the data structure expected from the Strapi API for each product page
 ** All types extend the TBaseProductPage which contains common properties across products
 ** Each product has unique content sections requiring specialized data types
 ************************************************************************************************/

/************************************************************************************************
 * Base type containing properties common to all product pages
 ************************************************************************************************/
type TBaseProductPage = {
	title: string;
	description: string;
	featuredImg: TStrapiImage;
	footer: TFooterSection;
};

/************************************************************************************************
 * DeFi Wallet page data structure
 * Features card row layout highlighting wallet capabilities
 ************************************************************************************************/
export type TDeFiWalletPage = TBaseProductPage & {
	buttonCta: TButton;
	buttonDownload: TButton[];
	cardsRow: TCardsRowSection;
};

/************************************************************************************************
 * Earn page data structure
 * Features grid layout showcasing earning opportunities
 ************************************************************************************************/
export type TEarnPage = TBaseProductPage & {
	buttonCta: TButton;
	buttonDownload: TButton[];
	grid: TGridSection;
};

/************************************************************************************************
 * Mobile App page data structure
 * Features step-by-step ladder grid and download buttons
 ************************************************************************************************/
export type TMobileAppPage = TBaseProductPage & {
	buttonCta: TButton;
	buttonDownload: TDownloadButton[];
	gridLadder: TGridLadderSection;
};

/************************************************************************************************
 * Trade page data structure
 * Features statistics, card row, and displaced grid layout
 ************************************************************************************************/
export type TTradePage = TBaseProductPage & {
	buttonCta: TButton;
	stats: TStat[];
	cardsRow: TCardsRowSection;
	gridDisplaced: TGridDisplacedSection;
};

/************************************************************************************************
 * Fetches DeFi Wallet page data from Strapi API
 *
 * Retrieves complete page content including:
 * - Basic page information (title, description)
 * - Featured image for hero section
 * - CTA button configuration
 * - Cards row with individual card data and images
 *
 * @returns Promise resolving to page data or null if not found/error
 ************************************************************************************************/
export async function fetchDeFiWalletPage(): Promise<TDeFiWalletPage | null> {
	const queryParams = 'fields[0]=title&populate[1]=buttonCta&fields[2]=description&populate[3]=featuredImg&populate[4]=cardsRow&populate[5]=cardsRow.cards&populate[6]=cardsRow.cards.image&populate[7]=cardsRow.ctaBlock&populate[8]=cardsRow.ctaBlock.icon&pagination[pageSize]=1&pagination[page]=1&status=published';
	
	return fetchWithErrorHandling<TDeFiWalletPage>(
		'defi-wallet', 
		queryParams, 
		'DeFi Wallet page'
	);
}

/************************************************************************************************
 * Fetches Earn page data from Strapi API
 *
 * Retrieves complete page content including:
 * - Basic page information (title, description)
 * - Featured image for hero section
 * - CTA button configuration
 * - Grid layout with cards and CTA blocks
 *
 * @returns Promise resolving to page data or null if not found/error
 ************************************************************************************************/
export async function fetchEarnPage(): Promise<TEarnPage | null> {
	const queryParams = 'fields[0]=title&populate[1]=buttonCta&populate[3]=featuredImg&fields[4]=description&populate[10]=grid&populate[11]=grid.cardCta&populate[12]=grid.cardCta.buttonCta&populate[13]=grid.cardCta.imageBg&populate[14]=grid.card&populate[15]=grid.card.image&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en';
	
	return fetchWithErrorHandling<TEarnPage>(
		'earn', 
		queryParams, 
		'Earn page'
	);
}

/************************************************************************************************
 * Fetches Mobile App page data from Strapi API
 *
 * Retrieves complete page content including:
 * - Basic page information (title, description)
 * - Featured image for hero section
 * - App store download buttons
 * - Step-by-step ladder grid with images
 *
 * @returns Promise resolving to page data or null if not found/error
 ************************************************************************************************/
export async function fetchMobileAppPage(): Promise<TMobileAppPage | null> {
	const queryParams = 'fields[0]=title&populate[1]=buttonDownload&fields[2]=description&populate[3]=featuredImg&populate[4]=gridLadder&populate[5]=gridLadder.steps&populate[6]=gridLadder.steps.buttonCta&populate[7]=gridLadder.steps.image&pagination[pageSize]=1&pagination[page]=1&status=published';
	
	return fetchWithErrorHandling<TMobileAppPage>(
		'mobile-app', 
		queryParams, 
		'Mobile App page'
	);
}

/************************************************************************************************
 * Fetches Trade page data from Strapi API
 *
 * Retrieves complete page content including:
 * - Basic page information (title, description)
 * - Featured image for hero section
 * - CTA button configuration
 * - Statistics data for metrics display
 * - Cards row with feature highlights
 * - Displaced grid layout for additional content
 *
 * @returns Promise resolving to page data or null if not found/error
 ************************************************************************************************/
export async function fetchTradePage(): Promise<TTradePage | null> {
	const queryParams = 'fields[0]=title&populate[1]=buttonCta&fields[2]=description&populate[3]=featuredImg&populate[4]=stats&populate[5]=cardsRow&populate[6]=cardsRow.cards&populate[7]=cardsRow.cards.image&populate[8]=cardsRow.ctaBlock&populate[9]=cardsRow.ctaBlock.icon&populate[20]=gridDisplaced&populate[21]=gridDisplaced.cards&populate[22]=gridDisplaced.cards.image&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en';
	
	return fetchWithErrorHandling<TTradePage>(
		'trade', 
		queryParams, 
		'Trade page'
	);
}
