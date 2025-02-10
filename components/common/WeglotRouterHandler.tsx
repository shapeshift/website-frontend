'use client';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

// export async function getSubdomain(): Promise<string | null> {
// 	const headersList = await headers();

// 	const host = headersList.get('host');

// 	if (!host) {
// 		return null;
// 	}

// 	// Remove port number if present
// 	const hostname = host.split(':')[0];

// 	// Split hostname into parts
// 	const parts = hostname.split('.');

// 	// Check if we have a subdomain
// 	if (parts.length > 2) {
// 		// Return first part as subdomain
// 		return parts[0] === 'www' ? null : parts[0];
// 	}

// 	return null;
// }

export function WeglotRouteHandler(): null {
	const pathname = usePathname();
	// const subdomain = getSubdomain();

	useEffect(() => {
		// Check if Weglot is available and initialized
		if (typeof window !== 'undefined' && (window as any).Weglot) {
			const currentLang = (window as any).Weglot.getCurrentLang();
			console.log({currentLang});
			console.log((window as any).Weglot);
			console.log((window as any).Weglot.options);
			// Only trigger if not in default language
			if (currentLang !== (window as any).Weglot.options.language_from) {
				// Force retranslation by switching to the current language
				(window as any).Weglot.switchTo(currentLang);
				console.log('switched');
			}
		}
	}, [pathname]); // Re-run when pathname changes

	return null;
}
