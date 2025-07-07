import type {
	TDiscoverData,
	TFaqData,
	TPrivacyPolicyData,
	TSupportedChainData,
	TSupportedProtocolData,
	TSupportedWalletData,
	TTermsOfServiceData
} from '@/app/[lang]/_components/strapi/types';

/**
 * API utility functions to fetch data from Strapi CMS
 *
 * Each function fetches specific content types and handles error cases uniformly.
 * All API calls include authentication via STRAPI_API_TOKEN environment variable.
 */

/**
 * Common headers used for all Strapi API requests
 */
const apiHeaders = {
	headers: {
		Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
	}
};

/**
 * Fetches FAQ sections with nested items
 *
 * @returns Promise with FAQ data or null if request fails
 */
export async function getFaq(): Promise<TFaqData | null> {
	const res = await fetch(
		`${process.env.STRAPI_URL}/api/faq?populate[0]=faqSection&populate[1]=faqSection.faqSectionItem&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
		apiHeaders
	);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data;
}

/**
 * Fetches a specific wallet by its slug
 *
 * @param slug - Unique identifier for the wallet
 * @returns Promise with wallet data or null if request fails or wallet not found
 */
export async function getSupportedWallet(slug: string): Promise<TSupportedWalletData | null> {
	const res = await fetch(
		`${process.env.STRAPI_URL}/api/supported-wallets?filters[slug][$eq]=${slug}&populate=*`,
		apiHeaders
	);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data[0];
}

/**
 * Fetches a specific blockchain network by its slug
 *
 * @param slug - Unique identifier for the chain
 * @returns Promise with chain data or null if request fails or chain not found
 */
export async function getSupportedChain(slug: string): Promise<TSupportedChainData | null> {
	const res = await fetch(
		`${process.env.STRAPI_URL}/api/supported-chains?filters[slug][$eq]=${slug}&populate=*`,
		apiHeaders
	);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data[0];
}

/**
 * Fetches a specific protocol by its slug
 *
 * @param slug - Unique identifier for the protocol
 * @returns Promise with protocol data or null if request fails or protocol not found
 */
export async function getSupportedProtocol(slug: string): Promise<TSupportedProtocolData | null> {
	const res = await fetch(
		`${process.env.STRAPI_URL}/api/supported-protocols?filters[slug][$eq]=${slug}&populate=*`,
		apiHeaders
	);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data[0];
}

/**
 * Fetches all discover section entries
 *
 * @returns Promise with array of discover data or null if request fails
 */
export async function getDiscovers(): Promise<TDiscoverData[] | null> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/discovers?populate=*`, apiHeaders);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data;
}

/**
 * Fetches privacy policy content
 *
 * @returns Promise with privacy policy data or null if request fails
 */
export async function getPrivacyPolicy(): Promise<TPrivacyPolicyData | null> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/privacy-policy?populate=*`, apiHeaders);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data;
}

/**
 * Fetches terms of service content
 *
 * @returns Promise with terms of service data or null if request fails
 */
export async function getTermsOfService(): Promise<TTermsOfServiceData | null> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/terms-of-service?populate=*`, apiHeaders);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data;
}
