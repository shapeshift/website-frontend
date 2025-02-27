import {headers} from 'next/headers';
import Script from 'next/script';

import {WithFonts} from '@/components/common/WithFonts';
import {CachedNewsProvider} from '@/components/contexts/CachedNews';
import {CachedPostsProvider} from '@/components/contexts/CachedPosts';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';
import {Notification} from '@/components/Notification';

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
	return (
		<html>
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
					{"Weglot.initialize({api_key: 'wg_b6fdc2a2e16175fd09ce44998516155b3'});"}
				</Script>
			</head>
			<body className={'relative min-h-screen overflow-x-hidden bg-bg text-white'}>
				<WithFonts>
					<CachedNewsProvider>
						<CachedPostsProvider>
							<>
								<Notification />
								<div className={'flex flex-col px-4'}>
									<Header />
									<main>{children}</main>
									<Footer />
								</div>
							</>
						</CachedPostsProvider>
					</CachedNewsProvider>
				</WithFonts>
			</body>
		</html>
	);
}
