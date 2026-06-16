/**************************************************************************************************
 ** Terms Data Utilities
 ** Provides utility functions for transforming API data to component props
 ** Separates data fetching from component rendering for better maintainability
 ** Implements proper type transformations for privacy policy and terms of service data
 ** Enforces consistent data structure between different terms pages
 **************************************************************************************************/

import 'server-only'

import { strapiServerFetch } from '@/app/[lang]/_utils/strapiServer'

import type { TTermsItemData } from '@/app/[lang]/(terms)/_components/TermsAccordion'
import type { TPrivacyPolicyData, TTermsOfServiceData } from '@/app/[lang]/_components/strapi/types'

/**************************************************************************************************
 * Transforms privacy policy data from API format to component format
 **************************************************************************************************/
export async function getPrivacyPolicyItems(): Promise<TTermsItemData[]> {
  try {
    const res = await strapiServerFetch(`privacy-policy?populate=*`)

    if (!res.ok) {
      return []
    }
    const { data } = (await res.json()) as { data: TPrivacyPolicyData | null }

    if (!data) {
      return []
    }

    return data.policy.map((policy) => ({
      id: policy.id,
      title: policy.title,
      date: policy.date,
      content: policy.policy,
    }))
  } catch (error) {
    console.error('Error fetching privacy policy data:', error instanceof Error ? error.message : String(error))
    return []
  }
}

/**************************************************************************************************
 * Transforms terms of service data from API format to component format
 **************************************************************************************************/
export async function getTermsOfServiceItems(): Promise<TTermsItemData[]> {
  try {
    const res = await strapiServerFetch(`terms-of-service?populate=*`)

    if (!res.ok) {
      return []
    }
    const { data } = (await res.json()) as { data: TTermsOfServiceData | null }

    if (!data) {
      return []
    }

    return data.terms.map((term) => ({
      id: term.id,
      title: term.title,
      date: term.date,
      content: term.policy,
    }))
  } catch (error) {
    console.error('Error fetching terms of service data:', error instanceof Error ? error.message : String(error))
    return []
  }
}
