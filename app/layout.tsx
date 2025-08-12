import {headers} from 'next/headers';
import Script from 'next/script';

import {ChatwootWidgetWrapper} from '@/app/[lang]/_components/ChatwootWidgetWrapper';
import {Footer} from '@/app/[lang]/_components/Footer';
import {Header} from '@/app/[lang]/_components/header/Header';
import {WithFonts} from '@/app/[lang]/_components/WithFonts';
import {CachedArticlesProvider} from '@/app/[lang]/_contexts/CachedArticlesContext';
import {CachedNewsProvider} from '@/app/[lang]/_contexts/CachedNewsContext';
import {CachedPostsProvider} from '@/app/[lang]/_contexts/CachedPostsContext';
import {LanguageProvider} from '@/app/[lang]/_contexts/LanguageContext';
import {SUPPORTED_LANGUAGES} from '@/app/[lang]/_utils/i18nconfig';
import {generateOrganizationSchema, generateWebsiteSchema} from '@/app/[lang]/_utils/schema';

import './globals.css';
import {defaultMetadata} from './metadata';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function getSubdomain(): Promise<string | null> {
	const headersList = await headers();
	const host = headersList.get('host');

	if (!host) {
		return null;
	}

	// Remove port number if present
	const hostname = host.split(':')[0];
	// Split hostname into parts
	const parts = hostname.split('.');
	// Check if we have a subdomain
	if (parts.length > 2) {
		// Return first part as subdomain
		return parts[0] === 'www' || parts[0] === 'shapeshift' ? null : parts[0];
	}

	return null;
}

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({children}: {children: ReactNode}): Promise<ReactNode> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com';
	const websiteSchema = generateWebsiteSchema(baseUrl);
	const organizationSchema = generateOrganizationSchema();
	const weglotLanguages = SUPPORTED_LANGUAGES.map(lang => lang.weglotCode).join(',');

	// Get nonce from headers
	const headersList = await headers();
	const nonce = headersList.get('x-nonce') || undefined;

	return (
		<html lang={'en'}>
			<head>
				<link
					rel={'preconnect'}
					href={'https://tag.adrsbl.io'}
					crossOrigin={'anonymous'}
				/>

				<Script
					id={'adrsbl'}
					strategy={'beforeInteractive'}
					nonce={nonce}
					data-tid={'de008d61a08d42559c3c09a539728156'}>
					{`!function(w,d){
    w.__adrsbl=w.__adrsbl||{queue:[],run:function(){this.queue.push(arguments)}};
    var s=d.createElement('script');
    s.async=true;
    s.crossOrigin='anonymous';
    s.referrerPolicy='no-referrer';

    var cs=d.currentScript;
    var tid=(cs && cs.getAttribute && cs.getAttribute('data-tid'))||'';
    try { if (cs && 'nonce' in cs) { s.nonce = cs.nonce || ''; } } catch(e) {}

    s.src='https://tag.adrsbl.io/p.js?tid='+tid;

    var first=d.getElementsByTagName('script')[0];
    if(first && first.parentNode){
      first.parentNode.insertBefore(s, first);
    } else {
      (d.head||d.body||d.documentElement).appendChild(s);
    }
  }(window,document);`}
				</Script>
				<Script
					strategy={'beforeInteractive'}
					type={'text/javascript'}
					src={'https://cdn.weglot.com/weglot.min.js'}
					crossOrigin={'anonymous'}
					nonce={nonce}
				/>
				<Script
					strategy={'afterInteractive'}
					id={'weglot'}
					crossOrigin={'anonymous'}
					nonce={nonce}>
					{`
						if (typeof Weglot !== 'undefined') {
							try {
								Weglot.initialize({
									api_key: '${process.env.NEXT_PUBLIC_WEGLOT_API_KEY}',
									original_language: 'en',
									languages: [${weglotLanguages
										.split(',')
										.map(lang => `'${lang}'`)
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
					dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema)}}
					nonce={nonce}
				/>
				<Script
					id={'organization-schema'}
					type={'application/ld+json'}
					dangerouslySetInnerHTML={{
						// eslint-disable-next-line @typescript-eslint/naming-convention
						__html: JSON.stringify(organizationSchema)
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
	);
}
