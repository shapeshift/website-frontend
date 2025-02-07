import Script from 'next/script';
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
			<link
				rel={'alternate'}
				hrefLang={'en'}
				href={'https://shapeshift.builtby.dad'}
			/>
			<link
				rel={'alternate'}
				hrefLang={'fr'}
				href={'https://fr.shapeshift.builtby.dad'}
			/>
			<Script
				type={'text/javascript'}
				src={'https://cdn.weglot.com/weglot.min.js'}
			/>
			<Script
				id={'weglot'}
				dangerouslySetInnerHTML={{
					// eslint-disable-next-line @typescript-eslint/naming-convention
					__html: ` Weglot.initialize({
        api_key: 'wg_d200799f995ece1df7fb54af8c7397f82'
    });`
				}}
			/>
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
