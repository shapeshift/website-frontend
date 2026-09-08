'use client'

import Image from 'next/image'

import { Carousel } from '@/app/[lang]/_components/Carousel'

import type { ReactNode } from 'react'

const imageLogos = [
  {
    key: 'thorchain',
    alt: 'THORChain',
    src: '/landing/thorchain.png',
    width: 192,
    height: 40,
  },
  {
    key: 'chainflip',
    alt: 'Chainflip',
    src: '/landing/chainflip.png',
    width: 238,
    height: 40,
  },
  {
    key: 'cowSwap',
    alt: 'CoW Swap',
    src: '/landing/cow-swap.png',
    width: 218,
    height: 40,
  },
  {
    key: 'relay',
    alt: 'Relay',
    src: '/landing/relay.png',
    width: 158,
    height: 40,
  },
  { key: 'Ox', alt: '0x', src: '/landing/0x.png', width: 65, height: 40 },
  {
    key: 'mayaProtocol',
    alt: 'MAYAChain',
    src: '/landing/maya-protocol.png',
    width: 171,
    height: 40,
  },
  {
    key: 'butterNetwork',
    alt: 'Butter Network',
    src: '/landing/butter-network.png',
    width: 231,
    height: 40,
  },
  {
    key: 'jupiter',
    alt: 'Jupiter',
    src: '/landing/jupiter.png',
    width: 150,
    height: 40,
  },
] as const

function ProtocolRow(): ReactNode {
  return (
    <div className={'flex shrink-0 items-center gap-14 pr-14'}>
      {imageLogos.map(({ key, alt, src, width, height }) => (
        <div
          key={key}
          className={'flex h-10 shrink-0 items-center brightness-0 invert transition-opacity hover:opacity-75'}
        >
          <Image src={src} alt={alt} width={width} height={height} style={{ width: 'auto', height: 'auto' }} />
        </div>
      ))}
    </div>
  )
}

export function DevelopersPartnerLogos(): ReactNode {
  return (
    <section className={'mt-7 overflow-hidden border-b border-white/[0.07] py-5 lg:mt-8'}>
      <div
        className={
          'relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'
        }
      >
        <Carousel speed={52} className={'[&_.animate-carousel]:motion-reduce:animate-none'}>
          <ProtocolRow />
        </Carousel>
      </div>
    </section>
  )
}
