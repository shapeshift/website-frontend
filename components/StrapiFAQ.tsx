'use client';

import {useCallback, useEffect, useState} from 'react';

import {QuestionSection} from '@/components/QuestionSection';
import {getFaq} from '@/components/utils/query';

import type {TFaqSectionItem} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiFAQ(): ReactNode {
	const [faqItems, setFaqItems] = useState<TFaqSectionItem[]>([]);

	const handleFAQItems = useCallback(async () => {
		const data = await getFaq();
		const allQuestions = data?.faqSection.map(section => section.faqSectionItem).flat() ?? [];
		setFaqItems(allQuestions);
	}, []);

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
