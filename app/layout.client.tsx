'use client';

import {usePathname} from 'next/navigation';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';
import {useWeglot} from '@/hooks/useWeglot';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Client layout wrapper component
 * Handles header visibility based on current path
 ********************************************************************************************/
export function LayoutClient({children}: {children: ReactNode}): ReactNode {
	const pathname = usePathname();
	const weglotApiKey = process.env.WELGOT_API_KEY || '';

	useWeglot(weglotApiKey, 'en');

	return (
		<div className={'flex flex-col px-4'}>
			{pathname === '/' ? null : <Header />}

			<main>{children}</main>
			<Footer />
		</div>
	);
}
