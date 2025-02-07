import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

import {WithFonts} from '@/components/common/WithFonts';

import './globals.css';
import {LayoutClient} from './layout.client';

import type {ReactNode} from 'react';

export default async function RootLayout({children}: {children: ReactNode}): Promise<ReactNode> {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={'relative min-h-screen overflow-x-hidden bg-bg text-white'}>
				<WithFonts>
					<NextIntlClientProvider messages={messages}>
						<LayoutClient>{children}</LayoutClient>
					</NextIntlClientProvider>
				</WithFonts>
			</body>
		</html>
	);
}
