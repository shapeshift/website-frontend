'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useRef} from 'react';

/**
 * Alternative hook that uses a different approach to handle Weglot translations
 * on route changes by comparing previous and current pathnames
 */
export function useWeglotPageChange(): void {
	const pathname = usePathname();
	const previousPathnameRef = useRef<string | null>(null);
	const isFirstRender = useRef(true);

	useEffect(() => {
		// Skip the first render
		if (isFirstRender.current) {
			isFirstRender.current = false;
			previousPathnameRef.current = pathname;
			return;
		}

		// Check if pathname actually changed
		if (previousPathnameRef.current === pathname) {
			return;
		}

		console.log('[useWeglotPageChange] Route changed from', previousPathnameRef.current, 'to', pathname);
		previousPathnameRef.current = pathname;

		// Wait for DOM to update
		const timer = setTimeout(() => {
			if (typeof window !== 'undefined' && (window as any).Weglot?.initialized) {
				const currentLang = (window as any).Weglot.getCurrentLang();
				console.log('[useWeglotPageChange] Current language:', currentLang);

				if (currentLang && currentLang !== 'en') {
					console.log('[useWeglotPageChange] Attempting to retranslate page');
					
					// Try different methods to trigger translation
					
					// Method 1: Dispatch a custom event that Weglot might listen to
					window.dispatchEvent(new Event('load'));
					window.dispatchEvent(new Event('DOMContentLoaded'));
					
					// Method 2: Try to find and click the Weglot switcher to force refresh
					const weglotSwitcher = document.querySelector('.weglot-switcher');
					if (weglotSwitcher) {
						console.log('[useWeglotPageChange] Found Weglot switcher, attempting to use it');
						// Find the current language option and click it
						const currentLangOption = weglotSwitcher.querySelector(`[data-l="${currentLang}"]`);
						if (currentLangOption && currentLangOption instanceof HTMLElement) {
							currentLangOption.click();
						}
					}
					
					// Method 3: Manually scan for text nodes and trigger translation
					setTimeout(() => {
						// Force Weglot to rescan the page
						const mainContent = document.querySelector('main') || document.body;
						const textNodes = [];
						const walker = document.createTreeWalker(
							mainContent,
							NodeFilter.SHOW_TEXT,
							{
								acceptNode: (node) => {
									if (node.nodeValue && node.nodeValue.trim().length > 0) {
										return NodeFilter.FILTER_ACCEPT;
									}
									return NodeFilter.FILTER_REJECT;
								}
							}
						);
						
						let node;
						while (node = walker.nextNode()) {
							textNodes.push(node);
						}
						
						console.log('[useWeglotPageChange] Found', textNodes.length, 'text nodes to translate');
						
						// Trigger a small change to make Weglot notice
						if (textNodes.length > 0) {
							const firstNode = textNodes[0];
							const originalText = firstNode.nodeValue;
							firstNode.nodeValue = originalText + ' ';
							setTimeout(() => {
								firstNode.nodeValue = originalText;
							}, 10);
						}
					}, 100);
				}
			}
		}, 600);

		return () => clearTimeout(timer);
	}, [pathname]);
}