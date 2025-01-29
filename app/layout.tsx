import {headers} from 'next/headers';
import Image from 'next/image';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

import {WithFonts} from '@/components/common/WithFonts';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';

import './globals.css';

import type {ReactNode} from 'react';

export default async function RootLayout({children}: {children: ReactNode}): Promise<ReactNode> {
	const locale = await getLocale();
	const messages = await getMessages();

	const headerList = await headers();
	const pathname = headerList.get('x-current-path');

	return (
		<html lang={locale}>
			<body className={'relative min-h-screen overflow-x-hidden bg-bg text-white'}>
				<WithFonts>
					<NextIntlClientProvider messages={messages}>
						{pathname?.startsWith('/products') ? (
							<Image
								src={'/hero-bg.png'}
								alt={'Hero background'}
								width={5000}
								height={4180}
								className={'absolute left-0 top-0 -z-10'}
							/>
						) : null}
						<div className={'flex flex-col'}>
							<Header />
							<main className={'mx-auto min-h-[50vh] w-full max-w-[1400px]'}>{children}</main>
							<Footer />
						</div>
					</NextIntlClientProvider>
				</WithFonts>
			</body>
		</html>
	);
}
