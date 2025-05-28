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
		// Skip the initial mount
		if (!pathname) {
			return;
		}

		// Give the DOM time to update with new content
		const timer = setTimeout(() => {
			if (typeof window !== 'undefined' && (window as any).Weglot?.initialized) {
				console.log('[useWeglotRefresh] Page changed to:', pathname);
				
				// Get current language
				const currentLang = (window as any).Weglot.getCurrentLang();
				console.log('[useWeglotRefresh] Current Weglot language:', currentLang);
				
				// If not in English, we need to retranslate the new content
				if (currentLang && currentLang !== 'en') {
					console.log('[useWeglotRefresh] Triggering retranslation for:', currentLang);
					
					// Method 1: Use Weglot's page view tracking for SPAs
					if ((window as any).Weglot.page) {
						console.log('[useWeglotRefresh] Using Weglot.page() for SPA navigation');
						(window as any).Weglot.page();
					}
					
					// Method 2: Try manual DOM scanning
					if ((window as any).Weglot.translatePage) {
						console.log('[useWeglotRefresh] Using Weglot.translatePage()');
						(window as any).Weglot.translatePage();
					}
					
					// Method 3: Force refresh by updating Weglot
					// This tells Weglot the page has changed
					console.log('[useWeglotRefresh] Notifying Weglot of page change');
					if ((window as any).Weglot.refresh) {
						(window as any).Weglot.refresh();
					}
				}
			}
		}, 500); // Wait 500ms for DOM to stabilize

		return () => clearTimeout(timer);
	}, [pathname]);
}
