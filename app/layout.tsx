import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';

import type {ReactNode} from 'react';

import './globals.css';
import {WithFonts} from '@/components/common/WithFonts';

export default async function RootLayout({children}: {children: React.ReactNode}): Promise<ReactNode> {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={'relative min-h-screen overflow-x-hidden bg-bg text-white'}>
				<WithFonts>
					<NextIntlClientProvider messages={messages}>
						<Header />
						<div className={'flex flex-col'}>
							<main className={'mx-auto min-h-[50vh] w-full max-w-[1400px] pt-32 px-4'}>{children}</main>
							<Footer />
						</div>
					</NextIntlClientProvider>
				</WithFonts>
			</body>
		</html>
	);
}
