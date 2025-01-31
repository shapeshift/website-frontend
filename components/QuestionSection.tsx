'use client';

import {useState} from 'react';

import {RoundButton} from './common/RoundButton';

import type {TFaqSectionItem} from '@/types/strapi';
import type {ReactNode} from 'react';

export const QuestionSection = ({faqSectionItem}: {faqSectionItem: TFaqSectionItem}): ReactNode | null => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div
			className={'rounded-2xl bg-secondBg'}
			onClick={() => setIsOpen(!isOpen)}>
			<div className={'flex items-center justify-between px-10 py-4'}>
				<div className={'text-2xl'}>{faqSectionItem.question}</div>
				<RoundButton iconName={isOpen ? 'minus' : 'plus'} />
			</div>
			{isOpen && <div className={'rounded-2xl px-10 pb-6 text-gray-500'}>{faqSectionItem.answer}</div>}
		</div>
	);
};
