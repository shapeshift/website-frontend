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
		if (!pathname) return;

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
					
					// Create a small DOM mutation to trigger Weglot's MutationObserver
					const tempDiv = document.createElement('div');
					tempDiv.style.display = 'none';
					tempDiv.className = 'weglot-trigger';
					document.body.appendChild(tempDiv);
					
					// Remove it immediately - this mutation will trigger Weglot
					setTimeout(() => {
						document.body.removeChild(tempDiv);
					}, 10);
				}
			}
		}, 300); // Wait 300ms for DOM to stabilize

		return () => clearTimeout(timer);
	}, [pathname]);
}
