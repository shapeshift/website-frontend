import { motion } from 'framer-motion'

import { Button } from '@/app/[lang]/_components/Button'
import { LocalizedLink } from '@/app/[lang]/_components/LocalizedLink'
import { appDevelopers, developerDocsUrl } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import { expandAnimation } from './animations'

import type { TAppLink } from '@/app/[lang]/_utils/constants'
import type { ReactNode } from 'react'

function DeveloperItem({
  name,
  href,
  target,
  description,
  icon,
  onClick,
}: TAppLink & { onClick: () => void }): ReactNode {
  return (
    <LocalizedLink
      href={href}
      target={target}
      className={
        'flex w-1/3 max-w-[232px] grow gap-2 rounded-lg px-6 py-4 transition-colors duration-300 hover:bg-white/10'
      }
      onClick={onClick}
    >
      <div className={'w-6 shrink-0'}>{icon}</div>
      <div className={'ml-4 flex max-h-[120px] flex-col gap-1'}>
        <span className={'whitespace-normal break-words text-sm font-medium leading-5'}>{name}</span>
        {description && (
          <span className={'whitespace-normal break-words text-xs leading-5 text-gray-500'}>{description}</span>
        )}
      </div>
    </LocalizedLink>
  )
}

export function DevelopersExpand({ setCurrentTab }: { setCurrentTab: (tab: string) => void }): ReactNode {
  return (
    <motion.div className={'grid grid-cols-12'} {...expandAnimation}>
      <div className={'col-span-4 flex flex-col border-r border-white/5 p-16'}>
        <p className={'mb-4 text-2xl font-medium'}>
          {DEVELOPERS_DICT.expand.titleLine1} <br />
          {DEVELOPERS_DICT.expand.titleLine2}
        </p>
        <p className={'mb-10 max-w-[327px] text-sm text-gray-500'}>{DEVELOPERS_DICT.expand.description}</p>
        <Button
          variant={'blue'}
          className={'whitespace-nowrap'}
          title={DEVELOPERS_DICT.expand.ctaButton}
          href={developerDocsUrl}
        />
      </div>

      <div className={'col-span-8 p-16'}>
        <div className={'flex flex-row flex-wrap gap-4'}>
          {appDevelopers.map((developerResource) => (
            <DeveloperItem
              onClick={() => setCurrentTab('empty')}
              key={developerResource.name}
              name={developerResource.name}
              href={developerResource.href}
              description={developerResource.description}
              icon={developerResource.icon}
              target={developerResource.target}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
