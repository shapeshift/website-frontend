import { DevelopersResourceHints } from './_components/DevelopersResourceHints'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ShapeShift for Developers',
    description:
      'Add multichain swaps to your product. Embed the ShapeShift widget or build directly on the swap API. 48+ chains, 30,000+ assets, non-custodial.',
    keywords: 'ShapeShift, Developers, Swap API, Swap Widget, SDK',
    openGraph: {
      title: 'ShapeShift for Developers',
      description:
        'Add multichain swaps to your product. Embed the ShapeShift widget or build directly on the swap API.',
      type: 'website',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/og.png`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ShapeShift for Developers',
      description:
        'Add multichain swaps to your product. Embed the ShapeShift widget or build directly on the swap API.',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/og.png`,
        },
      ],
    },
  }
}

export default function Layout({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <DevelopersResourceHints />
      {children}
    </>
  )
}
