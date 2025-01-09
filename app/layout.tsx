import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

import type {ReactNode} from 'react';

import './globals.css';

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>): Promise<ReactNode> {
	const locale = await getLocale();

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
			</body>
		</html>
	);
}
