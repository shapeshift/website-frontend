'use client';

import {usePathname} from 'next/navigation';
import {useWeglot} from 'react-weglot';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Client layout wrapper component
 * Handles header visibility based on current path
 ********************************************************************************************/
export function LayoutClient({children}: {children: ReactNode}): ReactNode {
	const pathname = usePathname();
	const [lang, setLang] = useWeglot('wg_d200799f995ece1df7fb54af8c7397f82', 'en');

	return (
		<div className={'flex flex-col px-4'}>
			{pathname === '/' ? null : <Header />}
			<button onClick={() => setLang('en')}>{'EN'}</button>
			<button onClick={() => setLang('fr')}>{'FR'}</button>
			<main>{children}</main>
			<Footer />
		</div>
	);
}
