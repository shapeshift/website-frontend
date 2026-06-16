/********************************************************************************************
 * FAQ Section Component
 *
 * Renders a list of FAQ items fetched from Strapi CMS with expandable questions and answers.
 ********************************************************************************************/

'use client'

import { useCallback, useEffect, useState } from 'react'

import { QuestionSection } from '@/app/[lang]/_components/QuestionSection'

import type { TFaqData, TFaqSectionItem } from '@/app/[lang]/_components/strapi/types'
import type { ReactNode } from 'react'

export function StrapiFAQ(): ReactNode {
  const [faqItems, setFaqItems] = useState<TFaqSectionItem[]>([])

  const handleFAQItems = useCallback(async () => {
    const res = await fetch(
      `/api/strapi/faq?populate[0]=faqSection&populate[1]=faqSection.faqSectionItem&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`
    )
    if (!res.ok) {
      return
    }
    const { data } = (await res.json()) as { data: TFaqData | null }
    const allQuestions = data?.faqSection.flatMap((section) => section.faqSectionItem) ?? []
    setFaqItems(allQuestions)
  }, [])

  /* Effect: Loads FAQ items on component mount
   * Deps: handleFAQItems - Reruns if the callback changes
   */
  useEffect(() => {
    handleFAQItems()
  }, [handleFAQItems])

  return (
    <div>
      <div className={'mb-6 text-[40px] leading-10 lg:mb-[77px] lg:text-7xl'}>{'FAQ'}</div>
      <div className={'flex flex-col gap-2'}>
        {faqItems.slice(0, 7).map((question) => (
          <div key={question.id}>
            <QuestionSection faqSectionItem={question} />
          </div>
        ))}
      </div>
    </div>
  )
}
