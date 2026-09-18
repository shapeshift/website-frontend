'use client'

import { SwapWidget } from '@shapeshiftoss/swap-widget'
import '@shapeshiftoss/swap-widget/style.css'

import type { ReactNode } from 'react'

// Loaded only via DevelopersHero's `dynamic(..., { ssr: false })`. AppKit is browser-only and
// the widget has no meaningful server-rendered output.
export function DevelopersSwapWidget(): ReactNode {
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
        walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
        partnerCode={process.env.NEXT_PUBLIC_SHAPESHIFT_PARTNER_CODE}
        onSwapSuccess={(txHash) => console.log('Success:', txHash)}
        onSwapError={(error) => console.error('Error:', error)}
        theme={'dark'}
      />
    </>
  )
}
