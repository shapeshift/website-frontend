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

import 'server-only'

import { strapiServerFetch } from '@/app/[lang]/_utils/strapiServer'

import type {
  TDiscoverData,
  TFaqData,
  TSupportedChainData,
  TSupportedProtocolData,
  TSupportedWalletData,
} from '@/app/[lang]/_components/strapi/types'

/************************************************************************************************
 * Fetch all Protocols
 *
 * @returns Promise resolving to array of protocol data or null if error
 ************************************************************************************************/
export async function fetchAllProtocols(): Promise<TSupportedProtocolData[] | null> {
  try {
    const response = await strapiServerFetch(
      `supported-protocols?populate=*&pagination[page]=1&pagination[pageSize]=500`,
      { revalidate: 3600 }
    )

    if (!response.ok) {
      console.error(`Failed to fetch protocols: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching protocols:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch all Chains
 *
 * @returns Promise resolving to array of chain data or null if error
 ************************************************************************************************/
export async function fetchAllChains(): Promise<TSupportedChainData[] | null> {
  try {
    const response = await strapiServerFetch(
      `supported-chains?populate=*&pagination[page]=1&pagination[pageSize]=500`,
      { revalidate: 3600 }
    )

    if (!response.ok) {
      console.error(`Failed to fetch chains: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching chains:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch all Wallets
 *
 * @returns Promise resolving to array of wallet data or null if error
 ************************************************************************************************/
export async function fetchAllWallets(): Promise<TSupportedWalletData[] | null> {
  try {
    const response = await strapiServerFetch(
      `supported-wallets?populate=*&pagination[page]=1&pagination[pageSize]=500`,
      { revalidate: 3600 }
    )

    if (!response.ok) {
      console.error(`Failed to fetch wallets: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching wallets:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch Discover data by slug
 *
 * @param slug - Slug of the discover page to fetch
 * @returns Promise resolving to discover data or null if not found
 ************************************************************************************************/
export async function fetchDiscoverBySlug(slug: string): Promise<TDiscoverData | null> {
  try {
    const response = await strapiServerFetch(
      `discovers?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=features&fields[1]=title&fields[2]=description&populate[3]=featuredImg&populate[4]=features.image&fields[5]=tag&populate[6]=features.buttonCta&pagination[page]=1&pagination[pageSize]=500`,
      { revalidate: 3600 }
    )

    if (!response.ok) {
      console.error(`Failed to fetch discover data for slug "${slug}": ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error(
      `Error fetching discover data for slug "${slug}":`,
      error instanceof Error ? error.message : String(error)
    )
    return null
  }
}

/************************************************************************************************
 * Fetch FAQ data
 *
 * @returns Promise resolving to FAQ data or null if not found
 ************************************************************************************************/
export async function fetchFaqData(): Promise<TFaqData | null> {
  try {
    const response = await strapiServerFetch(
      `faq?populate[faqSection][populate][faqSectionItem][populate]=*&pagination[page]=1&pagination[pageSize]=500`,
      { revalidate: 3600 }
    )

    if (!response.ok) {
      console.error(`Failed to fetch FAQ data: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching FAQ data:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch a single Protocol by slug
 *
 * @param slug - Unique identifier for the protocol
 * @returns Promise resolving to protocol data or null if not found
 ************************************************************************************************/
export async function fetchSupportedProtocol(slug: string): Promise<TSupportedProtocolData | null> {
  try {
    const res = await strapiServerFetch(`supported-protocols?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)

    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data[0] ?? null
  } catch (error) {
    console.error('Error fetching protocol data:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch a single Chain by slug
 *
 * @param slug - Unique identifier for the chain
 * @returns Promise resolving to chain data or null if not found
 ************************************************************************************************/
export async function fetchSupportedChain(slug: string): Promise<TSupportedChainData | null> {
  try {
    const res = await strapiServerFetch(`supported-chains?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)

    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data[0] ?? null
  } catch (error) {
    console.error('Error fetching chain data:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch a single Wallet by slug
 *
 * @param slug - Unique identifier for the wallet
 * @returns Promise resolving to wallet data or null if not found
 ************************************************************************************************/
export async function fetchSupportedWallet(slug: string): Promise<TSupportedWalletData | null> {
  try {
    const res = await strapiServerFetch(`supported-wallets?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)

    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data[0] ?? null
  } catch (error) {
    console.error('Error fetching wallet data:', error instanceof Error ? error.message : String(error))
    return null
  }
}

/************************************************************************************************
 * Fetch all Discover entries
 *
 * @returns Promise resolving to array of discover data or null if error
 ************************************************************************************************/
export async function fetchDiscovers(): Promise<TDiscoverData[] | null> {
  try {
    const res = await strapiServerFetch(`discovers?populate=*`)

    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching discover data:', error instanceof Error ? error.message : String(error))
    return null
  }
}
