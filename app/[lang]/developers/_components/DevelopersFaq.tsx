'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import { AnimatedPlusMinusIcon } from '@/app/[lang]/_components/QuestionSection'
import { developerDocsSectionUrl } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

// Mirrors QuestionSection's accordion exactly, but accepts a ReactNode answer instead of a
// plain string, so the chains question can end in a real button instead of a raw URL.
function FaqItem({ question, answer }: { question: string; answer: ReactNode }): ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={'border-t border-white/10 last:border-b'}>
      <button
        type={'button'}
        aria-expanded={isOpen}
        className={'group flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={'text-lg font-medium tracking-[-0.015em] text-white sm:text-xl'}>{question}</span>
        <div
          className={
            'flex size-9 min-w-9 items-center justify-center text-gray-500 transition-colors group-hover:text-white group-focus-visible:text-white'
          }
        >
          {shouldReduceMotion ? (
            <span aria-hidden={'true'} className={'text-2xl leading-none'}>
              {isOpen ? '−' : '+'}
            </span>
          ) : (
            <AnimatedPlusMinusIcon isOpen={isOpen} />
          )}
        </div>
      </button>
      <AnimatePresence initial={!shouldReduceMotion}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
            className={'overflow-hidden'}
          >
            <div className={'max-w-[760px] pb-6 pr-12 text-[15px] leading-relaxed text-gray-400'}>{answer}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function DevelopersFaq(): ReactNode {
  const { items } = DEVELOPERS_DICT.page.faq

  return (
    <div className={'container mx-auto grid gap-6 lg:grid-cols-[.65fr_1.35fr] lg:gap-16'}>
      <div>
        <h2 className={'max-w-[360px] text-[34px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[42px]'}>
          {DEVELOPERS_DICT.page.faq.title}
        </h2>
        <p className={'mt-4 max-w-[360px] text-sm leading-relaxed text-gray-500'}>
          {'Straight answers for product and engineering teams evaluating the integration.'}
        </p>
      </div>
      <div className={'min-w-0'}>
        {items.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={
              item.hasChainsLink ? (
                <>
                  <p>
                    {
                      'Bitcoin, Ethereum and the major L2s (Arbitrum, Base, Optimism), Solana, Avalanche, BNB Chain, Cosmos, and more. 48+ chains today, with new routes added as the underlying aggregators support them.'
                    }
                  </p>
                  <a
                    href={developerDocsSectionUrl('#tag/supported-chains')}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    className={
                      'mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10'
                    }
                  >
                    {'View supported chains'}
                    <span aria-hidden={'true'}>{'→'}</span>
                  </a>
                </>
              ) : (
                item.answer
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
