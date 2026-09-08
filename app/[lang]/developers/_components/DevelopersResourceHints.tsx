import type { ReactNode } from 'react'

export function DevelopersResourceHints(): ReactNode {
  return (
    <>
      <link rel={'dns-prefetch'} href={'https://widget.shapeshift.com'} />
      <link rel={'preconnect'} href={'https://widget.shapeshift.com'} crossOrigin={'anonymous'} />
    </>
  )
}
