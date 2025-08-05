/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
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

type WeglotInstance = {
	initialized: boolean;
	switchTo(languageCode: string): void;
	on(event: 'languageChanged', handler: (newLang: string, prevLang: string) => void): void;
	on(event: 'initialized', handler: () => void): void;
	off(event: 'languageChanged', handler: (newLang: string, prevLang: string) => void): void;
	off(event: 'initialized', handler: () => void): void;
};

declare global {
	interface Window {
		Weglot?: WeglotInstance;
	}
}

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

		if (!isScripted) {
			setHasManuallyChangedLanguage(true);
			// Set cookie when user manually changes language
			document.cookie = `locale=${languageCode}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
		}

		const weglotInstance = window.Weglot;
		if (weglotInstance?.initialized) {
			weglotInstance.switchTo(languageCode);
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
			const browserLang = getBrowserLanguage();
			const weglotInstance = window.Weglot;
			if (weglotInstance) {
				weglotInstance.switchTo(browserLang);
			}
			return;
		}
		if (pathLanguage === DEFAULT_LANGUAGE) {
			const weglotInstance = window.Weglot;
			if (weglotInstance) {
				weglotInstance.switchTo(DEFAULT_LANGUAGE);
			}
			return;
		}

		const weglotInstance = window.Weglot;
		if (weglotInstance) {
			weglotInstance.switchTo(pathLanguage);
		}
	}, [pathname]);

	const weglotConfigIsInitialized = typeof window !== 'undefined' && window.Weglot?.initialized;
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
		setIsInitialized(true);
		setLanguageFromBrowser();
	}, [setLanguageFromBrowser]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		let retryCount = 0;
		let retryTimeout: NodeJS.Timeout | undefined;
		const maxRetries = 10;
		const initialDelay = 100;

		const initializeWeglot = (): void => {
			const weglot = window.Weglot;
			if (!weglot) {
				if (retryCount < maxRetries) {
					retryCount++;
					const delay = initialDelay * Math.pow(2, retryCount - 1);
					console.log(
						`[LanguageContext] Weglot not found, retrying in ${delay}ms (attempt ${retryCount}/${maxRetries})`
					);
					retryTimeout = setTimeout(initializeWeglot, delay);
				} else {
					console.warn('[LanguageContext] Weglot not found after maximum retries');
				}
				return;
			}

			console.log('[LanguageContext] Weglot found, attaching event handlers');
			weglot.on('languageChanged', handleWeglotLanguageChange);
			weglot.on('initialized', handleWeglotInitialized);
		};

		initializeWeglot();

		return () => {
			if (retryTimeout) {
				clearTimeout(retryTimeout);
			}
			const weglot = window.Weglot;
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
