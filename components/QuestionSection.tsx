'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {useState} from 'react';

import type {TFaqSectionItem} from '@/types/strapi';
import type {ReactNode} from 'react';

/**
 * AnimatedPlusMinusIcon renders a plus icon that animates into a minus icon
 * by collapsing the vertical stroke. The horizontal stroke remains constant.
 * @param isOpen - if true, the vertical stroke scales to 0 (minus state)
 */
const AnimatedPlusMinusIcon = ({isOpen}: {isOpen: boolean}): ReactNode => {
	return (
		<motion.svg
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}>
			{/* Horizontal stroke as specified */}
			<path
				d={'M2 12L22 12'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
			/>
			{/* Vertical stroke animates its scaleY to collapse when open */}
			<motion.path
				d={'M12 2L12 22'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
				animate={{rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1}}
				initial={{rotate: 0, scaleY: 1}}
				transition={{duration: 0.2, ease: 'easeInOut'}}
				// Set transform origin at the center (12,12) so it rotates and scales symmetrically
				style={{transformOrigin: '12px 12px'}}
			/>
		</motion.svg>
	);
};

/**
 * QuestionSection component displays a single FAQ item.
 * On click, it toggles the answer and animates the plus icon to a minus by collapsing the vertical stroke.
 * @param {TFaqSectionItem} faqSectionItem - The FAQ section item data.
 */
export const QuestionSection = ({faqSectionItem}: {faqSectionItem: TFaqSectionItem}): ReactNode | null => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={'group cursor-pointer rounded-2xl bg-secondBg hover:bg-secondHoverBg'}
			onClick={() => setIsOpen(!isOpen)}>
			<div className={'flex items-center justify-between px-10 py-8'}>
				<div className={'text-2xl'}>{faqSectionItem.question}</div>
				{/* Render the animated icon inside a button-like container with blue hover background */}
				<div
					className={
						'flex size-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-[1.16] group-hover:bg-blueHover'
					}>
					<AnimatedPlusMinusIcon isOpen={isOpen} />
				</div>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{height: 0, opacity: 0}}
						animate={{height: 'auto', opacity: 1}}
						exit={{height: 0, opacity: 0}}
						transition={{
							duration: 0.3,
							ease: 'easeInOut'
						}}
						className={'overflow-hidden'}>
						<div className={'rounded-2xl px-10 pb-6 text-gray-500'}>{faqSectionItem.answer}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
