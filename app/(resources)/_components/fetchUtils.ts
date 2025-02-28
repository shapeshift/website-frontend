/************************************************************************************************
** Resources Fetch Utilities:
**
** Centralized utilities for fetching data from Strapi API for resource pages
** Provides standardized error handling and data fetching patterns
**
** Features:
** - Type-safe fetch functions for different resource types
** - Consistent error handling and caching strategy
** - Standardized response format
**
** Usage:
** - Import and use in page components to fetch data
** - Pass specific filters to retrieve targeted content
** - Handle null returns with appropriate UI (usually notFound)
************************************************************************************************/

import type {
    TDiscoverData,
    TFaqData,
    TProtocolData,
    TWalletData,
} from '@/components/strapi/types';

/**
 * Fetch Discover data by slug
 * 
 * @param slug - Slug of the discover page to fetch
 * @returns Promise resolving to discover data or null if not found
 */
export async function fetchDiscoverBySlug(slug: string): Promise<TDiscoverData | null> {
    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/discovers?filters[slug][$eq]=${slug}&populate=*`, 
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
                },
                next: { 
                    revalidate: 3600 // Cache for 1 hour
                }
            }
        );
        
        if (!response.ok) {
            console.error(`Failed to fetch discover data for slug "${slug}": ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data.data?.[0] || null;
    } catch (error) {
        console.error(`Error fetching discover data for slug "${slug}":`, 
            error instanceof Error ? error.message : String(error));
        return null;
    }
}

/**
 * Fetch Protocol data by slug
 * 
 * @param slug - Slug of the protocol to fetch
 * @returns Promise resolving to protocol data or null if not found
 */
export async function fetchProtocolBySlug(slug: string): Promise<TProtocolData | null> {
    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/protocols?filters[slug][$eq]=${slug}&populate=*`, 
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
                },
                next: { 
                    revalidate: 3600 // Cache for 1 hour
                }
            }
        );
        
        if (!response.ok) {
            console.error(`Failed to fetch protocol data for slug "${slug}": ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data.data?.[0] || null;
    } catch (error) {
        console.error(`Error fetching protocol data for slug "${slug}":`, 
            error instanceof Error ? error.message : String(error));
        return null;
    }
}

/**
 * Fetch Wallet data by slug
 * 
 * @param slug - Slug of the wallet to fetch
 * @returns Promise resolving to wallet data or null if not found
 */
export async function fetchWalletBySlug(slug: string): Promise<TWalletData | null> {
    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/wallets?filters[slug][$eq]=${slug}&populate=*`, 
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
                },
                next: { 
                    revalidate: 3600 // Cache for 1 hour
                }
            }
        );
        
        if (!response.ok) {
            console.error(`Failed to fetch wallet data for slug "${slug}": ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data.data?.[0] || null;
    } catch (error) {
        console.error(`Error fetching wallet data for slug "${slug}":`, 
            error instanceof Error ? error.message : String(error));
        return null;
    }
}

/**
 * Fetch FAQ data
 * 
 * @returns Promise resolving to FAQ data or null if not found
 */
export async function fetchFaqData(): Promise<TFaqData | null> {
    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/faq?populate[faqSection][populate][faqSectionItem][populate]=*`, 
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
                },
                next: { 
                    revalidate: 3600 // Cache for 1 hour
                }
            }
        );
        
        if (!response.ok) {
            console.error(`Failed to fetch FAQ data: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data.data || null;
    } catch (error) {
        console.error('Error fetching FAQ data:', 
            error instanceof Error ? error.message : String(error));
        return null;
    }
}