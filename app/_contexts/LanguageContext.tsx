'use client';

import {usePathname, useRouter} from 'next/navigation';
import {createContext, useContext, useEffect, useState} from 'react';

import {
	DEFAULT_LANGUAGE,
	SUPPORTED_LANGUAGES,
	getLanguageFromPath,
	getPathWithoutLanguage
} from '@/app/_utils/i18nconfig';

import type {TLanguage} from '@/app/_utils/i18nconfig';

type TLanguageContext = {
	currentLanguage: string;
	supportedLanguages: TLanguage[];
	switchLanguage: (languageCode: string) => void;
};

const LanguageContext = createContext<TLanguageContext | undefined>(undefined);

export function LanguageProvider({children}: {children: React.ReactNode}): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();
	const [weglotLanguage, setWeglotLanguage] = useState(DEFAULT_LANGUAGE);
	const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
	const [isInitialized, setIsInitialized] = useState(false);
	const [hasCheckedBrowserLang, setHasCheckedBrowserLang] = useState(false);

	// Helper function to get browser language
	const getBrowserLanguage = (): string => {
		if (typeof window === 'undefined') {
			return DEFAULT_LANGUAGE;
		}

		// Get browser language and extract the language code (e.g., 'fr' from 'fr-FR')
		const browserLang = navigator.language.toLowerCase().split('-')[0];

		// Check if browser language is supported
		const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang);
		return supportedLang ? browserLang : DEFAULT_LANGUAGE;
	};

	// Retrieve the language from Weglot and set weglotLanguage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line
			//@ts-ignore
			if (window?.Weglot?.initialized) {
				// eslint-disable-next-line
				//@ts-ignore
				const staticCurrentLanguage = window.Weglot.getCurrentLang();
				console.log('[useLanguage] Weglot initialized, current language:', staticCurrentLanguage);
				setWeglotLanguage(staticCurrentLanguage);
				setIsInitialized(true);
			} else {
				console.log('[useLanguage] Weglot not initialized yet');

				// Listen for Weglot initialization
				const checkWeglot = setInterval(() => {
					// eslint-disable-next-line
					//@ts-ignore
					if (window?.Weglot?.initialized) {
						// eslint-disable-next-line
						//@ts-ignore
						const lang = window.Weglot.getCurrentLang();
						console.log('[useLanguage] Weglot initialized after wait, language:', lang);
						setWeglotLanguage(lang);
						setIsInitialized(true);
						clearInterval(checkWeglot);
					}
				}, 100);
				// Clean up after 5 seconds
				setTimeout(() => clearInterval(checkWeglot), 5000);
			}
		}
	}, []);

	// Check browser language on initial load (before Weglot initializes)
	useEffect(() => {
		if (hasCheckedBrowserLang || typeof window === 'undefined') {
			return;
		}

		const pathLanguage = getLanguageFromPath(pathname);

		// Only check browser language if:
		// 1. We're on the default language path
		// 2. We haven't already checked
		// 3. The path doesn't already have a language prefix
		if (pathLanguage === DEFAULT_LANGUAGE) {
			const browserLang = getBrowserLanguage();

			if (browserLang !== DEFAULT_LANGUAGE) {
				console.log('[LanguageContext] Browser language detected:', browserLang);
				console.log('[LanguageContext] Redirecting based on browser language');

				const pathWithoutLanguage = getPathWithoutLanguage(pathname);
				const targetPath = `/${browserLang}${pathWithoutLanguage || '/'}`;

				// Mark as checked before redirecting to avoid loops
				setHasCheckedBrowserLang(true);
				router.push(targetPath);
			}
		}

		setHasCheckedBrowserLang(true);
	}, [pathname, hasCheckedBrowserLang, router]);

	// Sync Weglot language with URL on mount and when pathname changes
	useEffect(() => {
		if (!isInitialized || typeof window === 'undefined') {
			return;
		}
		const pathLanguage = getLanguageFromPath(pathname);
		const pathWithoutLanguage = getPathWithoutLanguage(pathname);

		console.log('[LanguageContext] Path language:', pathLanguage);
		console.log('[LanguageContext] Weglot language:', weglotLanguage);
		console.log('[LanguageContext] Current language:', currentLanguage);
		console.log('[LanguageContext] Pathname:', pathname);
		console.log('[LanguageContext] Browser language:', navigator.language);

		// If Weglot detected a non-English language but URL doesn't have it, redirect
		if (
			weglotLanguage !== DEFAULT_LANGUAGE &&
			pathLanguage === DEFAULT_LANGUAGE &&
			!pathname.includes(`/${weglotLanguage}`)
		) {
			console.log('[LanguageContext] Redirecting to add language prefix:', weglotLanguage);
			const targetPath = `/${weglotLanguage}${pathWithoutLanguage || '/'}`;
			router.push(targetPath);
			return;
		}

		// Always update current language from path first
		if (pathLanguage !== currentLanguage) {
			console.log('[LanguageContext] Updating current language from path:', pathLanguage);
			setCurrentLanguage(pathLanguage);
		}

		// Sync Weglot with the path language
		if (pathLanguage !== weglotLanguage) {
			console.log('[LanguageContext] Syncing Weglot to path language:', pathLanguage);
			if (typeof window !== 'undefined') {
				// eslint-disable-next-line
				//@ts-ignore
				if (window?.Weglot?.initialized) {
					console.log('[useLanguage] Switching Weglot to:', pathLanguage);
					// eslint-disable-next-line
					//@ts-ignore
					window.Weglot.switchTo(pathLanguage);
					setCurrentLanguage(pathLanguage);
				} else {
					console.log('[useLanguage] Weglot not initialized, cannot switch language');
				}
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, weglotLanguage, isInitialized]); // Intentionally limited deps to prevent loops

	// Update state when Weglot language changes (but not URL - that's handled by switchLanguage)
	useEffect(() => {
		if (!isInitialized) {
			return;
		}
		console.log('[LanguageContext - Weglot Change] Weglot:', weglotLanguage, 'Current:', currentLanguage);

		if (weglotLanguage && weglotLanguage !== currentLanguage) {
			console.log('[LanguageContext] Weglot language changed from', currentLanguage, 'to', weglotLanguage);
			setCurrentLanguage(weglotLanguage);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weglotLanguage]);

	const switchLanguage = (languageCode: string): void => {
		if (!isInitialized) {
			return;
		}
		console.log('[LanguageContext] switchLanguage called with:', languageCode, 'Current:', currentLanguage);

		// Get clean path without language prefix
		const cleanPath = getPathWithoutLanguage(pathname);

		// Build target path with new language
		const targetPath = languageCode === DEFAULT_LANGUAGE ? cleanPath || '/' : `/${languageCode}${cleanPath}`;

		console.log('[LanguageContext] Switching language to:', languageCode);
		console.log('[LanguageContext] Clean path:', cleanPath);
		console.log('[LanguageContext] Target path:', targetPath);
		console.log('[LanguageContext] Current pathname:', pathname);

		// Always update state and Weglot, even if it seems like the same language
		// This ensures sync when URL and state are out of sync
		setCurrentLanguage(languageCode);
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line
			//@ts-ignore
			if (window?.Weglot?.initialized) {
				console.log('[useLanguage] Switching Weglot to:', languageCode);
				// eslint-disable-next-line
				//@ts-ignore
				window.Weglot.switchTo(languageCode);
				setCurrentLanguage(languageCode);
			} else {
				console.log('[useLanguage] Weglot not initialized, cannot switch language');
			}
		}

		// Only update URL if it's actually different
		if (pathname !== targetPath) {
			router.push(targetPath);
		}
	};

	return (
		<LanguageContext.Provider
			value={{
				currentLanguage,
				supportedLanguages: SUPPORTED_LANGUAGES,
				switchLanguage
			}}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage(): TLanguageContext {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
}
