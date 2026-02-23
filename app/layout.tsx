import { headers } from 'next/headers'
import Script from 'next/script'

import { ChatwootWidgetWrapper } from '@/app/[lang]/_components/ChatwootWidgetWrapper'
import { Footer } from '@/app/[lang]/_components/Footer'
import { Header } from '@/app/[lang]/_components/header/Header'
import { WithFonts } from '@/app/[lang]/_components/WithFonts'
import { CachedArticlesProvider } from '@/app/[lang]/_contexts/CachedArticlesContext'
import { CachedNewsProvider } from '@/app/[lang]/_contexts/CachedNewsContext'
import { CachedPostsProvider } from '@/app/[lang]/_contexts/CachedPostsContext'
import { LanguageProvider } from '@/app/[lang]/_contexts/LanguageContext'
import { SUPPORTED_LANGUAGES } from '@/app/[lang]/_utils/i18nconfig'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/app/[lang]/_utils/schema'

import './globals.css'
import { defaultMetadata } from './metadata'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function getSubdomain(): Promise<string | null> {
  const headersList = await headers()
  const host = headersList.get('host')

  if (!host) {
    return null
  }

  // Remove port number if present
  const hostname = host.split(':')[0]
  // Split hostname into parts
  const parts = hostname.split('.')
  // Check if we have a subdomain
  if (parts.length > 2) {
    // Return first part as subdomain
    return parts[0] === 'www' || parts[0] === 'shapeshift' ? null : parts[0]
  }

  return null
}

export const metadata: Metadata = defaultMetadata

export default async function RootLayout({ children }: { children: ReactNode }): Promise<ReactNode> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com'
  const websiteSchema = generateWebsiteSchema(baseUrl)
  const organizationSchema = generateOrganizationSchema()
  const weglotLanguages = SUPPORTED_LANGUAGES.map((lang) => lang.weglotCode).join(',')
  // Get nonce from headers
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || undefined

  return (
    <html lang={'en'}>
      <head>
        <Script id={'hypelab'} strategy={'beforeInteractive'} nonce={nonce}>
          {`!(function(h,y,p,e,l,a,b){
    ((window.__hype_analytics=[]),(window.__hype_wids=[])),
    (window.HypeLabAnalytics={
      logEvent:function(){window.__hype_analytics.push(Array.prototype.slice.call(arguments))},
      setWalletAddresses:function(w){window.__hype_wids=w}
    }),
    ((a=document.createElement(h)).async=!0),
    (a.src=y),
    (a.onload=function(){
      (l.environment=p),(l.propertySlug=e),
      HypeLabAnalytics.setClient(new HypeLabAnalytics.Client(l))
    }),
    (b=document.getElementsByTagName(h)[0]).parentNode.insertBefore(a,b)
  })('script','https://api.hypelab.com/v1/scripts/ha-sdk.js?v=0','production','4793fe16ca',{privacy:{trackAllSessions:true}});`}
        </Script>
        <Script
          strategy={'beforeInteractive'}
          type={'text/javascript'}
          src={'https://cdn.weglot.com/weglot.min.js'}
          crossOrigin={'anonymous'}
          nonce={nonce}
        />
        <Script strategy={'afterInteractive'} id={'weglot'} crossOrigin={'anonymous'} nonce={nonce}>
          {`
						if (typeof Weglot !== 'undefined') {
							try {
								Weglot.initialize({
									api_key: '${process.env.NEXT_PUBLIC_WEGLOT_API_KEY}',
									original_language: 'en',
									languages: [${weglotLanguages
                    .split(',')
                    .map((lang) => `'${lang}'`)
                    .join(', ')}],
									exclude_blocks: ['.no-translate'],
									wait_transition: true
								});
							} catch (error) {
								console.error('[Weglot] Initialization error:', error);
							}
						} else {
							console.warn('Weglot is not defined. Translation service may not be available.');
						}
					`}
        </Script>
        <Script
          id={'website-schema'}
          type={'application/ld+json'}
          // eslint-disable-next-line @typescript-eslint/naming-convention
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          nonce={nonce}
        />
        <Script
          id={'organization-schema'}
          type={'application/ld+json'}
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __html: JSON.stringify(organizationSchema),
          }}
          nonce={nonce}
        />
      </head>
      <body className={'relative min-h-screen overflow-x-hidden bg-bg px-4 pb-4 text-white'}>
        <WithFonts>
          <LanguageProvider>
            <CachedNewsProvider>
              <CachedPostsProvider>
                <CachedArticlesProvider>
                  <div className={'flex flex-col'}>
                    <Header />
                    {children}
                    <Footer />
                    <ChatwootWidgetWrapper />
                  </div>
                </CachedArticlesProvider>
              </CachedPostsProvider>
            </CachedNewsProvider>
          </LanguageProvider>
        </WithFonts>
      </body>
    </html>
  )
}
