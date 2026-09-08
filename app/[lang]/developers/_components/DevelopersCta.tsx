import Image from 'next/image'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersCta(): ReactNode {
  const { cta } = DEVELOPERS_DICT.page

  return (
    <section className={'container mx-auto pb-14 pt-12 lg:pb-16 lg:pt-14'}>
      <div
        className={
          'relative isolate min-h-[300px] overflow-hidden rounded-[20px] border border-stroke p-8 text-center sm:p-10 lg:min-h-[340px] lg:p-12'
        }
      >
        <Image
          src={'/bannerFooterBg.png'}
          alt={''}
          aria-hidden={'true'}
          fill
          sizes={'(min-width: 1400px) 1400px, 100vw'}
          className={'-z-20 object-cover'}
        />
        {/* Sized and positioned to match the fox's own real usage on the official site
            (app/[lang]/dao/fox-token/page.tsx: h-[398px] in a lg:h-[552px] banner, ~72% of the
            container's height, bottom-right at a 5% inset, hidden below the lg breakpoint —
            not a guessed scale. */}
        <Image
          src={'/cta/fox-silhouette.png'}
          alt={''}
          aria-hidden={'true'}
          width={685}
          height={686}
          className={'pointer-events-none absolute bottom-0 right-[5%] -z-10 hidden h-[72%] w-auto opacity-80 lg:block'}
        />
        <div
          className={
            'pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,11,17,.55),rgba(10,11,17,.1)_45%,transparent_75%)]'
          }
        />
        <div className={'relative flex h-full min-h-[236px] flex-col justify-center lg:min-h-[276px]'}>
          <h2 className={'mb-4 text-[32px] font-bold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl'}>
            {cta.title}
          </h2>
          <p className={'mb-8 text-lg text-white'}>{cta.description}</p>
          <div className={'flex flex-wrap items-center justify-center gap-3.5'}>
            <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={cta.ctaPrimary} hasArrow />
            <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={cta.ctaSecondary} />
          </div>
        </div>
      </div>
    </section>
  )
}
