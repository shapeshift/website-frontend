/********************************************************************************************
 * FAQ Section Component
 *
 * Renders a list of FAQ items fetched from Strapi CMS with expandable questions and answers.
 ********************************************************************************************/

'use client';

import {useCallback, useEffect, useState} from 'react';

import {QuestionSection} from '@/components/QuestionSection';
import {getFaq} from '@/components/utils/query';

import type {TFaqSectionItem} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export function StrapiFAQ(): ReactNode {
	const [faqItems, setFaqItems] = useState<TFaqSectionItem[]>([]);

	/* Callback: Fetches FAQ items from Strapi CMS
	 * No dependencies as it's a static fetch
	 */
	const handleFAQItems = useCallback(async () => {
		const data = await getFaq();
		const allQuestions = data?.faqSection.flatMap(section => section.faqSectionItem) ?? [];
		setFaqItems(allQuestions);
	}, []);

	/* Effect: Loads FAQ items on component mount
	 * Deps: handleFAQItems - Reruns if the callback changes
	 */
	useEffect(() => {
		handleFAQItems();
	}, [handleFAQItems]);

	return (
		<div>
			<div className={'mb-6 text-[40px] leading-10 lg:mb-[77px] lg:text-7xl'}>{'FAQ'}</div>
			<div className={'flex flex-col gap-2'}>
				{faqItems.slice(0, 7).map(question => (
					<div key={question.id}>
						<QuestionSection faqSectionItem={question} />
					</div>
				))}
			</div>
		</div>
	);
}
