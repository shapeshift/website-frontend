'use client'

import { SwapWidget } from '@shapeshiftoss/swap-widget'
import '@shapeshiftoss/swap-widget/style.css'
import { useState } from 'react'

import { initDevelopersAppKit } from '@/app/[lang]/developers/_utils/initDevelopersAppKit'

import type { ReactNode } from 'react'

// This module is only ever loaded through DevelopersHero's `dynamic(..., { ssr: false })`, so it
// is client-only, per the SDK's own docs: AppKit reads browser-only state and the widget has no
// meaningful server-rendered output.
export function DevelopersSwapWidget(): ReactNode {
  // The host owns the AppKit instance so it can hand AppKit chain icons and RPC endpoints the
  // widget's self-init doesn't. It has to exist before <SwapWidget> mounts, hence a lazy state
  // initialiser rather than an effect. The widget detects the singleton and reuses it.
  useState(() => initDevelopersAppKit(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID))

  return (
    <>
      {/*
        Upstream bug in @shapeshiftoss/swap-widget's own ≤600px CSS: .ssw-modal only sets a
        max-height there, so its flex children (chain sidebar + token list) have no definite space
        to distribute — the virtualized token list resolves to 0px tall and renders zero rows.
        Giving the modal a real height (still capped well under the viewport) fixes the flex
        cascade without changing anything about its layout/content.
      */}
      <style>{'@media (max-width: 600px) { .ssw-modal { height: min(600px, 90vh) !important; } }'}</style>
      <SwapWidget
        partnerCode={process.env.NEXT_PUBLIC_SHAPESHIFT_PARTNER_CODE}
        onSwapSuccess={(txHash) => console.log('Success:', txHash)}
        onSwapError={(error) => console.error('Error:', error)}
        theme={'dark'}
      />
    </>
  )
}
