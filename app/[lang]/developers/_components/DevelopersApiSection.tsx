'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const codePanels = [
  {
    label: 'GET /v1/assets',
    lines: [
      '$ # chains',
      'curl "https://api.shapeshift.com/v1/chains"',
      '',
      '# assets, filtered by chain',
      'curl --get "https://api.shapeshift.com/v1/assets" \\',
      '  --data-urlencode "chainId=eip155:1" \\',
      '  --data-urlencode "limit=100"',
      '',
      '# response · 200',
      '{',
      '  "assets": [{',
      '    "assetId": "eip155:1/slip44:60",',
      '    "chainId": "eip155:1",',
      '    "name": "Ethereum",',
      '    "symbol": "ETH",',
      '    "precision": 18,',
      '    "icon": "https://…/eth@2x.png"',
      '  }, …],',
      '  "timestamp": 1754241000000',
      '}',
    ],
  },
  {
    label: 'GET /v1/swap/rates',
    lines: [
      '$ curl --get "https://api.shapeshift.com/v1/swap/rates" \\',
      '  --data-urlencode "sellAssetId=eip155:1/slip44:60" \\',
      '  --data-urlencode "buyAssetId=bip122:000000000019d6689c085ae165831e93/slip44:0" \\',
      '  --data-urlencode "sellAmountCryptoBaseUnit=1000000000000000000" \\',
      '  -H "X-Partner-Code: your-partner-code"',
      '',
      '# response · 200',
      '{',
      '  "rates": [{',
      '    "swapperName": "THORChain",',
      '    "rate": "0.04829",',
      '    "buyAmountCryptoBaseUnit": "4829000",',
      '    "steps": 1,',
      '    "estimatedExecutionTimeMs": 60000,',
      '    "affiliateBps": "10"',
      '  }, …one entry per swapper…],',
      '  "expiresAt": 1754241060000',
      '}',
    ],
  },
  {
    label: 'POST /v1/swap/quote',
    lines: [
      '$ curl -X POST "https://api.shapeshift.com/v1/swap/quote" \\',
      '  -H "X-Partner-Code: your-partner-code" \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '{",
      '    "sellAssetId": "eip155:1/slip44:60",',
      '    "buyAssetId": "bip122:00000000...93/slip44:0",',
      '    "sellAmountCryptoBaseUnit": "1000000000000000000",',
      '    "receiveAddress": "bc1qar0s...f5mdq",',
      '    "swapperName": "Relay"',
      "  }'",
      '',
      '# response · 200',
      '{',
      '  "quoteId": "0f8e2b1a-…",',
      '  "swapperName": "Relay",',
      '  "rate": "0.04829",',
      '  "affiliateBps": "10",',
      '  "steps": [{',
      '    "transactionData": {',
      '      "to": "0xdef1c0de…", "data": "0x…",',
      '      "value": "1000000000000000000"',
      '    }',
      '  }],',
      '  "expiresAt": 1754241060000',
      '}',
    ],
  },
]

function TypedCodePanel({ activeTab }: { activeTab: number }): ReactNode {
  const panelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(panelRef, { amount: 0.25, once: true })
  const shouldReduceMotion = useReducedMotion()
  const source = codePanels[activeTab].lines.join('\n')
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (!isInView) {
      setVisibleCharacters(0)
      return undefined
    }
    if (shouldReduceMotion) {
      setVisibleCharacters(source.length)
      return undefined
    }

    setVisibleCharacters(0)
    const interval = window.setInterval(() => {
      setVisibleCharacters((value) => {
        if (value >= source.length) {
          window.clearInterval(interval)
          return value
        }
        return Math.min(value + 12, source.length)
      })
    }, 12)

    return () => window.clearInterval(interval)
  }, [activeTab, isInView, shouldReduceMotion, source.length])

  useEffect(() => setHasCopied(false), [activeTab])

  return (
    <div ref={panelRef} className={'sticky top-[120px] overflow-hidden rounded-2xl border border-stroke bg-[#0d1117]'}>
      <div className={'flex items-center gap-3.5 border-b border-stroke px-5 py-3.5'}>
        <div className={'flex gap-1.5'}>
          <span className={'size-2.5 rounded-full bg-stroke'} />
          <span className={'size-2.5 rounded-full bg-stroke'} />
          <span className={'size-2.5 rounded-full bg-stroke'} />
        </div>
        <span className={'font-mono text-xs text-gray-500'}>{codePanels[activeTab].label}</span>
        <button
          type={'button'}
          onClick={() => {
            navigator.clipboard
              .writeText(
                source
                  .split('# response · 200')[0]
                  .replace(/^\$\s?/gm, '')
                  .trim()
              )
              .then(() => {
                setHasCopied(true)
                window.setTimeout(() => setHasCopied(false), 1800)
              })
              .catch(() => undefined)
          }}
          className={'ml-auto font-mono text-[10px] text-gray-500 transition-colors hover:text-white'}
        >
          {hasCopied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre
        className={
          'min-h-[390px] overflow-x-auto whitespace-pre p-6 font-mono text-[12.5px] leading-[1.7] text-[#c9d1d9] sm:p-7'
        }
      >
        {source.slice(0, visibleCharacters)}
        {visibleCharacters < source.length ? (
          <motion.span
            aria-hidden={'true'}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className={'ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-mint'}
          />
        ) : null}
      </pre>
    </div>
  )
}

export function DevelopersApiSection(): ReactNode {
  const { api } = DEVELOPERS_DICT.page
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id={'api'} className={'container mx-auto scroll-mt-28 pt-14 lg:scroll-mt-32 lg:pt-16'}>
      <h2 className={'mb-4 text-[38px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[50px]'}>{api.title}</h2>
      <p className={'mb-8 max-w-[640px] text-base leading-relaxed text-secondary sm:text-lg'}>{api.description}</p>

      <div className={'grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14'}>
        <div>
          {api.endpoints.map((endpoint, index) => (
            <button
              type={'button'}
              key={endpoint.method}
              onClick={() => setActiveTab(index)}
              onMouseEnter={() => setActiveTab(index)}
              onFocus={() => setActiveTab(index)}
              aria-pressed={activeTab === index}
              className={
                activeTab === index
                  ? 'group block w-full border-t border-stroke bg-white/[0.02] py-6 text-left transition-colors'
                  : 'group block w-full border-t border-stroke py-6 text-left transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.02] focus-visible:outline-none'
              }
            >
              <div className={'flex flex-col gap-2 pl-5'}>
                <div className={'flex flex-wrap items-center gap-3'}>
                  <span
                    className={
                      activeTab === index
                        ? 'text-lg font-semibold tracking-[-0.01em] text-white transition-colors'
                        : 'text-lg font-semibold tracking-[-0.01em] text-gray-500 transition-colors group-hover:text-white group-focus-visible:text-white'
                    }
                  >
                    {endpoint.title}
                  </span>
                  <span
                    className={
                      'whitespace-nowrap rounded-md bg-blue/10 px-2.5 py-1 font-mono text-[11.5px] text-blueLight'
                    }
                  >
                    {endpoint.method}
                  </span>
                </div>
                <p className={'text-[14.5px] leading-relaxed text-gray-500'}>{endpoint.description}</p>
              </div>
            </button>
          ))}
          <div className={'border-t border-stroke pt-7'}>
            <Button
              href={'https://api.shapeshift.com/docs'}
              variant={'white'}
              title={'Open the API reference'}
              hasArrow
              className={'w-full whitespace-nowrap sm:w-fit'}
            />
          </div>
        </div>

        <TypedCodePanel activeTab={activeTab} />
      </div>
    </section>
  )
}
