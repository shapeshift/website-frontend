/**************************************************************************************************
 ** Shared Accordion Component for Terms Pages
 ** Provides expandable/collapsible sections for privacy policy and terms of service
 ** Uses framer-motion for smooth animations
 ** Implements proper accessibility attributes for screen readers and keyboard navigation
 ** Optimized with React.memo to prevent unnecessary re-renders
 ** Takes generic terms data to work with both privacy policy and terms of service content
 **************************************************************************************************/
'use client';

import {AnimatePresence, motion} from 'framer-motion';
import 'highlight.js/styles/github-dark.css';
import {memo, useCallback, useState} from 'react';

import TermsMarkdown from '@/app/(terms)/_components/TermsMarkdown';
import {AnimatedPlusMinusIcon} from '@/app/_components/QuestionSection';

import type {KeyboardEvent, ReactNode} from 'react';

export type TTermsItemData = {
	id: number;
	title: string;
	date: string;
	content: string;
};

type TTermsAccordionProps = {
	item: TTermsItemData;
};

/**************************************************************************************************
 * TermsAccordion component
 **************************************************************************************************/
function TermsAccordion({item}: TTermsAccordionProps): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = useCallback(() => {
		setIsOpen(prevState => !prevState);
	}, []);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				handleToggle();
			}
		},
		[handleToggle]
	);

	return (
		<div className={'group rounded-2xl bg-secondBg hover:bg-secondHoverBg'}>
			<div
				className={'flex cursor-pointer items-center justify-between px-10 py-8'}
				onClick={handleToggle}
				onKeyDown={handleKeyDown}
				role={'button'}
				tabIndex={0}
				aria-expanded={isOpen}
				aria-controls={`content-${item.id}`}>
				<div className={'flex flex-col gap-2 text-2xl'}>
					<span className={'font-bold'}>{item.title}</span>
					<span className={'text-sm text-gray-500'}>
						{new Date(item.date).toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
				</div>
				<div
					className={
						'flex size-12 min-w-[48px] items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-[1.16] group-hover:bg-blueHover'
					}
					aria-hidden={'true'}>
					<AnimatedPlusMinusIcon isOpen={isOpen} />
				</div>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						id={`content-${item.id}`}
						initial={{height: 0, opacity: 0}}
						animate={{height: 'auto', opacity: 1}}
						exit={{height: 0, opacity: 0}}
						transition={{
							duration: 0.3,
							ease: 'easeInOut'
						}}
						className={'overflow-hidden'}>
						<div className={'rounded-2xl px-10 pb-6 text-gray-500'}>
							<TermsMarkdown content={item.content} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default memo(TermsAccordion);
