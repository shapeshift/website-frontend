import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersCta } from './_components/DevelopersCta'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersFaq } from './_components/DevelopersFaq'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersLaunchPath } from './_components/DevelopersLaunchPath'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersStats } from './_components/DevelopersStats'
import { DevelopersWhyShapeShift } from './_components/DevelopersWhyShapeShift'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div className={'overflow-hidden'}>
      <DevelopersHero />
      <DevelopersStats />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersWhyShapeShift />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
      <DevelopersLaunchPath />
      <div className={'pt-12 lg:pt-14'}>
        <DevelopersFaq />
      </div>
      <DevelopersCta />
    </div>
  )
}
