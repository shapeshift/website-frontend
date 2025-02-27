'use client';

import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

export function WeglotRouteHandler(): null {
	const pathname = usePathname();

	useEffect(() => {
		// Check if Weglot is available and initialized
		if (typeof window !== 'undefined' && (window as any).Weglot) {
			const currentLang = (window as any).Weglot.getCurrentLang();
			// Only trigger if not in default language
			if (currentLang !== (window as any).Weglot.options.language_from) {
				(window as any).Weglot.switchTo(currentLang);
			}
		}
	}, [pathname]); // Re-run when pathname changes

	return null;
}
