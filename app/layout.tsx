import {headers} from 'next/headers';
import Script from 'next/script';

import {ChatwootWidget} from '@/app/[lang]/_components/ChatwootWidget';
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

	return (
		<html lang={'en'}>
			<head>
				<Script
					strategy={'beforeInteractive'}
					type={'text/javascript'}
					src={'https://cdn.weglot.com/weglot.min.js'}
					crossOrigin={'anonymous'}
				/>
				<Script
					strategy={'afterInteractive'}
					id={'weglot'}
					crossOrigin={'anonymous'}>
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
				/>
				<Script
					id={'organization-schema'}
					type={'application/ld+json'}
					dangerouslySetInnerHTML={{
						// eslint-disable-next-line @typescript-eslint/naming-convention
						__html: JSON.stringify(organizationSchema)
					}}
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
										<ChatwootWidget />
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
