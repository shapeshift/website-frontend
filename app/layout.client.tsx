'use client';

import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';
import {useWeglot} from '@/hooks/useWeglot';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Client layout wrapper component
 * Handles header visibility based on current path
 ********************************************************************************************/
export function LayoutClient({children, lang}: {children: ReactNode; lang: string}): ReactNode {
	const pathname = usePathname();
	const [, setLang] = useWeglot('wg_b6fdc2a2e16175fd09ce44998516155b3', lang);

	useEffect(() => {
		console.log('set:', lang);
		setLang(lang);
	}, [lang, pathname, setLang]);

	return (
		<div className={'flex flex-col px-4'}>
			{/* <button onClick={() => setLang('en')}>{'EN'}</button>
			<button onClick={() => setLang('fr')}>{'FR'}</button> */}
			{pathname === '/' ? null : <Header />}
			<main>{children}</main>
			<Footer />
		</div>
	);
}
