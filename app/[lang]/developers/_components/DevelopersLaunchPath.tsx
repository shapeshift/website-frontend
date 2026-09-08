import { Button } from '@/app/[lang]/_components/Button'

import type { ReactNode } from 'react'

const integrationAnswers = [
  {
    question: 'How long does integration take?',
    answer:
      'You can configure and preview the Widget in minutes. Production timing depends on your wallet flow, supported assets, and QA. The API requires your team to build the interface and transaction flow.',
  },
  {
    question: 'Who owns what?',
    answer:
      'ShapeShift maintains routing and returns executable transactions. You own the product experience, wallet connection, transaction signing, support flow, and final integration testing.',
  },
  {
    question: 'How do partner earnings work?',
    answer:
      'Create a partner code in the Portal, add it to the Widget or API, and monitor attributed swaps there. Fees settle directly to your configured wallet on-chain. There is no balance to withdraw.',
  },
] as const

export function DevelopersLaunchPath(): ReactNode {
  return (
    <section className={'container mx-auto pt-12 lg:pt-14'}>
      <div className={'border-y border-white/10 py-8 lg:py-9'}>
        <div className={'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'}>
          <div>
            <h2 className={'text-[34px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[40px]'}>
              {'Know what shipping involves'}
            </h2>
            <p className={'mt-3 max-w-[560px] text-base leading-relaxed text-secondary'}>
              {'The three answers most teams need before choosing an integration path.'}
            </p>
          </div>
          <div className={'shrink-0'}>
            <Button
              href={'https://api.shapeshift.com/docs'}
              variant={'white'}
              title={'Review the documentation'}
              hasArrow
            />
          </div>
        </div>

        <dl className={'mt-8 grid gap-0 border-t border-white/10 md:grid-cols-3'}>
          {integrationAnswers.map((item) => (
            <div
              key={item.question}
              className={
                'border-b border-white/10 py-5 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0'
              }
            >
              <dt className={'text-base font-semibold tracking-[-0.02em] text-white'}>{item.question}</dt>
              <dd className={'mt-2 text-sm leading-relaxed text-gray-400'}>{item.answer}</dd>
            </div>
          ))}
        </dl>

        <div className={'mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500'}>
          <span>{'No integration fee'}</span>
          <span>{'Non-custodial execution'}</span>
          <span>{'Documentation and Discord support'}</span>
        </div>
      </div>
    </section>
  )
}
