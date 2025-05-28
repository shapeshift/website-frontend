'use client';

import {useWeglotRefresh} from '@/hooks/useWeglotRefresh';

import type {ReactNode} from 'react';

/**
 * Client component that manages Weglot functionality
 * This needs to be a separate component because hooks can only be used in client components
 */
export function WeglotManager({children}: {children: ReactNode}): JSX.Element {
	// This hook will refresh Weglot translations on route changes
	useWeglotRefresh();

	return <>{children}</>;
}
