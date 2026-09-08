import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersStats(): ReactNode {
  const stats = Object.values(DEVELOPERS_DICT.page.stats)

  return (
    <div className={'container mx-auto border-y border-white/10'}>
      <div className={'grid w-full grid-cols-1 sm:grid-cols-3'}>
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={
              'flex flex-col items-center border-b border-white/10 px-4 py-5 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0'
            }
          >
            <div className={'text-3xl font-semibold leading-tight text-white lg:text-[42px] lg:leading-[50px]'}>
              {stat.value}
            </div>
            <div className={'mt-1 text-sm text-gray-500'}>{stat.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
