import {headers} from 'next/headers';
import Script from 'next/script';

import {ChatwootWidget} from '@/app/_components/ChatwootWidget';
import {Footer} from '@/app/_components/Footer';
import {Header} from '@/app/_components/header/Header';
import {WithFonts} from '@/app/_components/WithFonts';
import {CachedArticlesProvider} from '@/app/_contexts/CachedArticlesContext';
import {CachedNewsProvider} from '@/app/_contexts/CachedNewsContext';
import {CachedPostsProvider} from '@/app/_contexts/CachedPostsContext';
import {LanguageProvider} from '@/app/_contexts/LanguageContext';
import {SUPPORTED_LANGUAGES} from '@/app/_utils/i18nconfig';
import {generateOrganizationSchema, generateWebsiteSchema} from '@/app/_utils/schema';

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
	console.log('host:', hostname);
	// Split hostname into parts
	const parts = hostname.split('.');
	console.log('parts:', parts);
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
							console.log('[Weglot] Initializing Weglot');
							console.log('[Weglot] Languages:', [${weglotLanguages
								.split(',')
								.map(lang => `'${lang}'`)
								.join(', ')}]);

							try {
								Weglot.initialize({
									api_key: '${process.env.WEGLOT_API_KEY}',
									original_language: 'en',
									languages: [${weglotLanguages
										.split(',')
										.map(lang => `'${lang}'`)
										.join(', ')}],
									exclude_blocks: ['.no-translate'],
									wait_transition: true
								});

								// For SPA support - listen to Weglot initialization
								Weglot.on('initialized', function() {
									console.log('[Weglot] Weglot has been initialized');
								});

								// Listen for language changes
								Weglot.on('languageChanged', function(newLang, prevLang) {
									console.log('[Weglot] Language changed from', prevLang, 'to', newLang);
								});
								console.log('[Weglot] Initialization successful');
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
