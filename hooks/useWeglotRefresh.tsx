import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

/**
 * Hook to refresh Weglot translations when navigating between pages
 * This is necessary because Next.js uses client-side navigation which
 * doesn't trigger a full page reload that Weglot would normally detect
 */
export function useWeglotRefresh(): void {
	const pathname = usePathname();

	useEffect(() => {
		// Give the DOM time to update with new content
		const timer = setTimeout(() => {
			if (typeof window !== 'undefined' && (window as any).Weglot?.initialized) {
				console.log('[useWeglotRefresh] Refreshing Weglot translations for:', pathname);

				// Get current language
				const currentLang = (window as any).Weglot.getCurrentLang();

				// If not default language, force a re-translation
				if (currentLang && currentLang !== 'en') {
					// Option 1: Force switch to same language to trigger retranslation
					(window as any).Weglot.switchTo(currentLang);

					// Option 2: If Weglot has a refresh method (check their docs)
					if ((window as any).Weglot.refresh) {
						(window as any).Weglot.refresh();
					}

					// Option 3: Manually trigger mutation observer
					// This simulates DOM changes which Weglot listens for
					const event = new Event('DOMContentLoaded');
					window.dispatchEvent(event);
				}
			}
		}, 200); // Wait 200ms for DOM to stabilize

		return () => clearTimeout(timer);
	}, [pathname]);
}
