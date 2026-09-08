import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const milestones = [
  {
    icon: '</>',
    label: 'Your product',
    title: 'Create your partner code',
    description: 'One parameter in the Widget or API.',
  },
  {
    icon: '⇄',
    label: 'ShapeShift',
    title: 'We route every swap',
    description: 'The trade stays attributed to your product.',
  },
  {
    icon: '$',
    label: 'Your wallet',
    title: 'Your fee settles on-chain',
    description: 'Your share arrives with the transaction.',
  },
] as const

function MilestoneMarker({ index }: { index: number }): ReactNode {
  return (
    <div
      className={'relative z-10 flex size-12 shrink-0 items-center justify-center border border-white/15 bg-[#0A0D13]'}
    >
      <span className={'font-mono text-sm font-semibold text-blueLight'}>{milestones[index].icon}</span>
    </div>
  )
}

function MilestoneCopy({ index }: { index: number }): ReactNode {
  const milestone = milestones[index]

  return (
    <div className={'max-w-[200px] text-center'}>
      <div className={'mb-1.5 text-xs text-gray-500'}>{milestone.label}</div>
      <h3 className={'mb-1.5 text-lg font-semibold tracking-[-0.025em]'}>{milestone.title}</h3>
      <p className={'text-xs leading-relaxed text-gray-400'}>{milestone.description}</p>
    </div>
  )
}

export function DevelopersEconomicsSection(): ReactNode {
  const { economics } = DEVELOPERS_DICT.page

  return (
    <section id={'economics'} className={'container mx-auto pt-14 lg:pt-16'}>
      <div className={'mx-auto mb-8 max-w-[780px] text-center'}>
        <h2 className={'mb-4 text-[38px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[50px]'}>
          {economics.title}
        </h2>
        <p className={'mx-auto max-w-[650px] text-base leading-relaxed text-secondary sm:text-lg'}>
          {economics.description}
        </p>
      </div>

      <div className={'relative border-y border-white/10 px-1 py-8 sm:px-4 lg:px-6 lg:py-10'}>
        <div className={'relative hidden items-start justify-between gap-6 lg:flex'}>
          <div className={'pointer-events-none absolute left-[60px] right-[60px] top-6 h-px bg-white/15'} />
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className={'relative z-10 flex flex-1 flex-col items-center gap-5'}>
              <MilestoneMarker index={index} />
              <MilestoneCopy index={index} />
            </div>
          ))}
        </div>

        <div className={'relative flex flex-col gap-6 lg:hidden'}>
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className={'relative flex items-start gap-4'}>
              {index < milestones.length - 1 ? <div className={'absolute left-6 top-12 h-6 w-px bg-white/15'} /> : null}
              <MilestoneMarker index={index} />
              <div className={'flex-1 pt-2 text-left'}>
                <div className={'mb-1 text-xs text-gray-500'}>{milestone.label}</div>
                <h3 className={'mb-1 text-base font-semibold tracking-[-0.02em]'}>{milestone.title}</h3>
                <p className={'text-xs leading-relaxed text-gray-400'}>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={'relative mt-10 grid gap-6 border-t border-white/10 pt-7 lg:grid-cols-[.9fr_1.1fr]'}>
          <div className={'flex flex-col justify-between py-1'}>
            <div>
              <div className={'font-semibold'}>{'One integration. Revenue from every attributed swap.'}</div>
              <p className={'mt-2 max-w-[500px] text-sm leading-relaxed text-gray-500'}>
                {'Create your partner code, configure the fee, and review attributed swaps from the Partner Portal.'}
              </p>
            </div>
            <div className={'mt-6'}>
              <div className={'text-xs text-gray-500'}>{'Configurable partner fee'}</div>
              <div className={'mt-1 text-2xl font-semibold text-mint'}>{'0 to 100 bps'}</div>
            </div>
          </div>

          <div className={'border border-white/10 bg-[#0A0D13] p-5 sm:p-6'}>
            <div className={'flex items-center justify-between border-b border-white/10 pb-4'}>
              <div>
                <div className={'text-sm font-semibold'}>{'Partner Portal'}</div>
                <div className={'mt-1 text-xs text-gray-500'}>{'Integration overview'}</div>
              </div>
              <span className={'flex items-center gap-2 text-xs text-mint'}>
                <span className={'size-1.5 rounded-full bg-mint'} aria-hidden={'true'} />
                {'Live attribution'}
              </span>
            </div>
            <dl className={'grid grid-cols-2 gap-x-5 gap-y-5 py-5 sm:grid-cols-3'}>
              <div>
                <dt className={'text-[11px] uppercase tracking-[.08em] text-gray-500'}>{'Partner code'}</dt>
                <dd className={'mt-1.5 font-mono text-sm text-white'}>{'your-product'}</dd>
              </div>
              <div>
                <dt className={'text-[11px] uppercase tracking-[.08em] text-gray-500'}>{'Fee setting'}</dt>
                <dd className={'mt-1.5 text-sm font-semibold text-white'}>{'Your fee'}</dd>
              </div>
              <div>
                <dt className={'text-[11px] uppercase tracking-[.08em] text-gray-500'}>{'Settlement'}</dt>
                <dd className={'mt-1.5 text-sm font-semibold text-white'}>{'On-chain'}</dd>
              </div>
            </dl>
            <div className={'border-t border-white/10 pt-4 text-xs'}>
              <span className={'text-gray-500'}>{'Monitor attributed swaps and fee history'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={'mt-7 flex justify-center'}>
        <Button
          href={'https://dashboard.affiliate.shapeshift.com/'}
          variant={'blue'}
          title={'Open the partner portal'}
          hasArrow
        />
      </div>
    </section>
  )
}
