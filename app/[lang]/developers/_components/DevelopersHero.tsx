'use client'

import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { isDevelopersSwapWidgetEnabled } from '@/app/[lang]/developers/_utils/isDevelopersSwapWidgetEnabled'

import type { ReactNode } from 'react'

const DevelopersSwapWidget = dynamic(async () => (await import('./DevelopersSwapWidget')).DevelopersSwapWidget, {
  ssr: false,
  loading: () => <div className={'h-[660px] w-[420px] max-w-full rounded-[20px] bg-[#0A0A14]'} />,
})

const PALETTE = ['#386FF9aa', '#9D63ECaa', '#70E1B1aa', '#06B6D4aa']

export function DevelopersHero(): ReactNode {
  const shouldShowSwapWidget = isDevelopersSwapWidgetEnabled()
  const shouldReduceMotion = useReducedMotion()
  const glowRef = useRef<HTMLDivElement>(null)
  const glowAccent = useMotionValue(PALETTE[0])

  useEffect(() => {
    if (!shouldShowSwapWidget || shouldReduceMotion) return undefined
    const controls = animate(glowAccent, [...PALETTE, PALETTE[0]], {
      duration: PALETTE.length * 3.2,
      repeat: Infinity,
      ease: 'linear',
    })

    const el = glowRef.current
    const observer = el
      ? new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) controls.play()
          else controls.pause()
        })
      : null
    if (el && observer) observer.observe(el)

    return () => {
      controls.stop()
      observer?.disconnect()
    }
  }, [shouldShowSwapWidget, shouldReduceMotion, glowAccent])

  const glowBackground = useMotionTemplate`linear-gradient(135deg, ${glowAccent}, #9D63EC77 48%, #70E1B166)`

  return (
    <section className={'relative overflow-hidden pb-16 pt-5 lg:pb-20 lg:pt-4'}>
      <div
        className={
          shouldShowSwapWidget
            ? 'container relative mx-auto grid min-w-0 items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12'
            : 'container relative mx-auto grid min-w-0 items-center gap-8'
        }
      >
        <motion.div initial={false} className={'min-w-0 lg:pt-4'}>
          <h1
            className={
              'mb-6 max-w-full text-[46px] font-bold leading-[.98] tracking-[-0.05em] sm:text-[60px] lg:text-[68px]'
            }
          >
            {'Every chain your users need, in one place.'}
          </h1>
          <p className={'mb-7 max-w-[600px] text-lg leading-relaxed text-secondary sm:text-xl'}>
            {'Embed the Widget or call the API. ShapeShift handles the routing across every chain you need.'}
          </p>
          <div className={'mb-8 flex flex-col gap-3 sm:flex-row'}>
            <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={'Try the Widget'} hasArrow />
            <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={'Talk with us'} />
          </div>
          <div className={'flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400'}>
            {['48+ chains', '18 routing protocols'].map((benefit, index) => (
              <span key={benefit} className={'flex items-center'}>
                {index > 0 ? <span className={'mr-5 text-gray-700'}>{'/'}</span> : null}
                {benefit}
              </span>
            ))}
          </div>
          <div className={'mt-7 border-y border-white/10 py-4'}>
            <div className={'flex flex-wrap items-baseline gap-x-3 gap-y-1'}>
              <strong className={'text-lg font-semibold text-white'}>{'Earn on every attributed swap'}</strong>
              <span className={'text-base font-semibold text-mint'}>{'Set 0 to 100 bps'}</span>
            </div>
            <p className={'mt-1 text-sm text-gray-400'}>{'Your partner fee settles directly on-chain.'}</p>
          </div>
          <a
            href={'#api'}
            className={'mt-5 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white'}
          >
            {'Need more control? Build with the API'}
            <span aria-hidden={'true'}>{'→'}</span>
          </a>
        </motion.div>

        {shouldShowSwapWidget ? (
          <motion.div
            initial={false}
            className={
              'relative mx-auto flex min-h-[560px] min-w-0 w-full max-w-[660px] items-center justify-center px-2 py-10 lg:min-h-[600px] lg:px-10 lg:py-0'
            }
          >
            <motion.div
              ref={glowRef}
              aria-hidden={'true'}
              initial={false}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      borderRadius: [
                        '42% 58% 61% 39% / 46% 38% 62% 54%',
                        '58% 42% 38% 62% / 39% 61% 42% 58%',
                        '42% 58% 61% 39% / 46% 38% 62% 54%',
                      ],
                      x: ['-3%', '4%', '-3%'],
                      y: ['2%', '-3%', '2%'],
                      scale: [0.96, 1.06, 0.96],
                    }
              }
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className={'pointer-events-none absolute inset-[7%] opacity-40 blur-[64px]'}
              style={{
                background: glowBackground,
                borderRadius: '42% 58% 61% 39% / 46% 38% 62% 54%',
              }}
            />
            {/* Reserve room for the quote selector and network fee before an amount is entered.
                A minimum height keeps the widget top-aligned without clipping or scrolling taller
                states. Allow the SDK's fixed-width card to shrink on narrow screens. */}
            <div
              className={
                'relative z-10 min-h-[660px] w-[420px] max-w-full rounded-[20px] [&_.ssw-widget]:min-h-[660px] [&_.ssw-widget]:min-w-0'
              }
            >
              <DevelopersSwapWidget />
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
