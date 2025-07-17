'use client';

import {usePathname, useRouter} from 'next/navigation';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';

import {
	DEFAULT_LANGUAGE,
	SUPPORTED_LANGUAGES,
	getLanguageFromPath,
	getPathWithoutLanguage
} from '@/app/[lang]/_utils/i18nconfig';

import type {TLanguage} from '@/app/[lang]/_utils/i18nconfig';

type TLanguageContext = {
	currentLanguage: string;
	supportedLanguages: TLanguage[];
	switchLanguage: (languageCode: string) => void;
};

const LanguageContext = createContext<TLanguageContext | undefined>(undefined);

export function LanguageProvider({children}: {children: React.ReactNode}): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();
	const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
	const [isInitialized, setIsInitialized] = useState(false);
	const [, setHasManuallyChangedLanguage] = useState(false);

	const switchLanguage = (languageCode: string, isScripted: boolean = false): void => {
		if (!isInitialized) {
			return;
		}
		if (languageCode === currentLanguage) {
			return;
		}

		const cleanPath = getPathWithoutLanguage(pathname);
		const targetPath = languageCode === DEFAULT_LANGUAGE ? cleanPath || '/' : `/${languageCode}${cleanPath}`;

		console.group('[switchLanguage]');
		console.log('switchLanguage called with:', languageCode, 'Current:', currentLanguage);
		console.log('Switching language to:', languageCode);
		console.log('Clean path:', cleanPath);
		console.log('Target path:', targetPath);
		console.log('Current pathname:', pathname);
		console.groupEnd();

		if (!isScripted) {
			setHasManuallyChangedLanguage(true);
		}

		const weglotInstance = (window as any)?.Weglot;
		if (weglotInstance?.initialized) {
			weglotInstance.switchTo(languageCode);
			// return;
		}

		setCurrentLanguage(languageCode);
		if (pathname !== targetPath) {
			router.push(targetPath);
		}
	};

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

	const setLanguageFromBrowser = useCallback(() => {
		const pathLanguage = getLanguageFromPath(pathname);
		if (pathLanguage === '') {
			// Then fallback to browser language
			const browserLang = getBrowserLanguage();
			const weglotInstance = (window as any)?.Weglot;
			weglotInstance.switchTo(browserLang);
			return;
		}
		if (pathLanguage === DEFAULT_LANGUAGE) {
			// Then use the default language without the language prefix

			const weglotInstance = (window as any)?.Weglot;
			weglotInstance.switchTo(DEFAULT_LANGUAGE);
			return;
		}
		// Then use path language
		const weglotInstance = (window as any)?.Weglot;
		weglotInstance.switchTo(pathLanguage);
	}, [pathname]);

	const weglotConfigIsInitialized = typeof window !== 'undefined' && (window as any)?.Weglot?.initialized;
	const handleWeglotLanguageChange = useCallback(
		(newLang: string, prevLang: string): void => {
			console.warn('[Weglot] Language changed from', prevLang, 'to', newLang);
			setCurrentLanguage(newLang);

			if (newLang !== prevLang && newLang) {
				if (!prevLang || prevLang !== DEFAULT_LANGUAGE) {
					router.replace(`/${newLang}${getPathWithoutLanguage(pathname)}`);
				}
			} else {
				console.warn('ignoring');
			}
		},
		[pathname, router]
	);
	const handleWeglotInitialized = useCallback((): void => {
		console.warn('[Weglot] Weglot has been initialized');
		setIsInitialized(true);
		setLanguageFromBrowser();
	}, [setLanguageFromBrowser]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const weglot = (window as any).Weglot;
		if (!weglot) {
			return;
		}
		weglot.on('languageChanged', handleWeglotLanguageChange);
		weglot.on('initialized', handleWeglotInitialized);

		return () => {
			if (weglot?.initialized) {
				weglot.off('languageChanged', handleWeglotLanguageChange);
				weglot.off('initialized', handleWeglotInitialized);
			}
		};
	}, [weglotConfigIsInitialized, handleWeglotLanguageChange, handleWeglotInitialized]);

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
