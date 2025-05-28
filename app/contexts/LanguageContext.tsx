'use client';

import {usePathname, useRouter} from 'next/navigation';
import {createContext, useContext, useEffect, useState} from 'react';

import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getLanguageFromPath, getPathWithoutLanguage} from '@/app/i18n/config';
import {useLanguage as useWeglotLanguage} from '@/hooks/useLanguage';

import type {TLanguage} from '@/app/i18n/config';

type TLanguageContext = {
	currentLanguage: string;
	supportedLanguages: TLanguage[];
	switchLanguage: (languageCode: string) => void;
};

const LanguageContext = createContext<TLanguageContext | undefined>(undefined);

export function LanguageProvider({children}: {children: React.ReactNode}): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();
	const {currentLanguage: weglotLanguage, switchLanguage: switchWeglotLanguage} = useWeglotLanguage();
	const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);

	// Sync Weglot language with URL on mount and when pathname changes
	useEffect(() => {
		const pathLanguage = getLanguageFromPath(pathname);

		console.log('[LanguageContext] Path language:', pathLanguage);
		console.log('[LanguageContext] Weglot language:', weglotLanguage);
		console.log('[LanguageContext] Current language:', currentLanguage);
		console.log('[LanguageContext] Pathname:', pathname);

		// Always update current language from path first
		if (pathLanguage !== currentLanguage) {
			console.log('[LanguageContext] Updating current language from path:', pathLanguage);
			setCurrentLanguage(pathLanguage);
		}

		// Sync Weglot with the path language
		if (pathLanguage !== weglotLanguage) {
			console.log('[LanguageContext] Syncing Weglot to path language:', pathLanguage);
			switchWeglotLanguage(pathLanguage);
		}

		// Trigger Weglot to retranslate the page when pathname changes
		if (typeof window !== 'undefined' && (window as any).Weglot?.initialized) {
			console.log('[LanguageContext] Triggering Weglot page retranslation');
			// Tell Weglot the page has changed
			(window as any).Weglot.on('languageChanged', () => {
				console.log('[LanguageContext] Weglot language changed event fired');
			});
			// Force Weglot to re-scan the page for new content
			setTimeout(() => {
				if ((window as any).Weglot?.switchTo) {
					console.log('[LanguageContext] Re-applying Weglot language:', pathLanguage);
					(window as any).Weglot.switchTo(pathLanguage);
				}
			}, 100);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]); // Intentionally limited deps to prevent loops

	// Update state when Weglot language changes (but not URL - that's handled by switchLanguage)
	useEffect(() => {
		console.log('[LanguageContext - Weglot Change] Weglot:', weglotLanguage, 'Current:', currentLanguage);

		if (weglotLanguage && weglotLanguage !== currentLanguage) {
			console.log('[LanguageContext] Weglot language changed from', currentLanguage, 'to', weglotLanguage);
			setCurrentLanguage(weglotLanguage);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weglotLanguage]);

	const switchLanguage = (languageCode: string): void => {
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
		switchWeglotLanguage(languageCode);

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
