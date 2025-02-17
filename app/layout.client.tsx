'use client';

import {usePathname} from 'next/navigation';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';

import type {ReactNode} from 'react';

/********************************************************************************************
 * Client layout wrapper component
 * Handles header visibility based on current path
 ********************************************************************************************/
export function LayoutClient({children}: {children: ReactNode}): ReactNode {
	const pathname = usePathname();

	return (
		<div className={'flex flex-col px-4'}>
			<Header variant={pathname === '/' ? 'transparent' : 'default'} />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
