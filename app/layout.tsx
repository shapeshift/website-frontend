import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

import type {ReactNode} from 'react';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import {Providers} from '@/providers';

export default async function RootLayout({children}: {children: React.ReactNode}): Promise<ReactNode> {
	const locale = await getLocale();

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<Providers>
					<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
}
