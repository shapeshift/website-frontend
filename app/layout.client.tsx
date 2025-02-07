'use client';

import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';

import type {ReactNode} from 'react';

function WeglotRouteHandler(): null {
	const pathname = usePathname();

	useEffect(() => {
		// Check if Weglot is available in window
		if (typeof window !== 'undefined' && (window as any).Weglot.refresh) {
			(window as any).Weglot.refresh();
		}
	}, [pathname]); // Re-run when pathname changes

	return null;
}

/********************************************************************************************
 * Client layout wrapper component
 * Handles header visibility based on current path
 ********************************************************************************************/
export function LayoutClient({children}: {children: ReactNode}): ReactNode {
	const pathname = usePathname();
	// const [, setLang] = useWeglot('wg_b6fdc2a2e16175fd09ce44998516155b3', 'en');
	return (
		<div className={'flex flex-col px-4'}>
			<WeglotRouteHandler />
			{/* <button onClick={() => setLang('en')}>{'EN'}</button>
			<button onClick={() => setLang('fr')}>{'FR'}</button> */}
			{pathname === '/' ? null : <Header />}
			<main>{children}</main>
			<Footer />
		</div>
	);
}
