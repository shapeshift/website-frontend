/**************************************************************************************************
 ** Terms Data Utilities
 ** Provides utility functions for transforming API data to component props
 ** Separates data fetching from component rendering for better maintainability
 ** Implements proper type transformations for privacy policy and terms of service data
 ** Enforces consistent data structure between different terms pages
 **************************************************************************************************/

import {getPrivacyPolicy, getTermsOfService} from '@/app/[lang]/_utils/query';

import type {TTermsItemData} from '@/app/[lang]/(terms)/_components/TermsAccordion';

/**************************************************************************************************
 * Transforms privacy policy data from API format to component format
 **************************************************************************************************/
export async function getPrivacyPolicyItems(): Promise<TTermsItemData[]> {
	const data = await getPrivacyPolicy();

	if (!data) {
		return [];
	}

	return data.policy.map(policy => ({
		id: policy.id,
		title: policy.title,
		date: policy.date,
		content: policy.policy
	}));
}

/**************************************************************************************************
 * Transforms terms of service data from API format to component format
 **************************************************************************************************/
export async function getTermsOfServiceItems(): Promise<TTermsItemData[]> {
	const data = await getTermsOfService();

	if (!data) {
		return [];
	}

	return data.terms.map(term => ({
		id: term.id,
		title: term.title,
		date: term.date,
		content: term.policy
	}));
}
