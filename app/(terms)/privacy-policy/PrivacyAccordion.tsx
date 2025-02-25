'use client';

import {AnimatePresence, motion} from 'framer-motion';
import 'highlight.js/styles/github-dark.css';
import {useState} from 'react';

import {TermMarkdown} from '@/app/(terms)/terms-of-service/TermMarkdown';
import {AnimatedPlusMinusIcon} from '@/components/QuestionSection';

import type {TPrivacyPolicyData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function PrivacyAccordion({policy}: {policy: TPrivacyPolicyData['policy'][number]}): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={'group rounded-2xl bg-secondBg hover:bg-secondHoverBg'}>
			<div
				className={'flex cursor-pointer items-center justify-between px-10 py-8'}
				onClick={() => setIsOpen(!isOpen)}>
				<div className={'flex flex-col gap-2 text-2xl'}>
					<span className={'font-bold'}>{policy.title}</span>
					<span className={'text-sm text-gray-500'}>{new Date(policy.date).toLocaleDateString()}</span>
				</div>
				<div
					className={
						'flex size-12 min-w-[48px] items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-[1.16] group-hover:bg-blueHover'
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
						<div className={'rounded-2xl px-10 pb-6 text-gray-500'}>
							<TermMarkdown term={policy.policy} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
