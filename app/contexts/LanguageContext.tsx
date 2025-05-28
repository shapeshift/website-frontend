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
		
		// If URL has a language prefix, sync it with Weglot
		if (pathLanguage && pathLanguage !== DEFAULT_LANGUAGE) {
			console.log('[LanguageContext] Syncing Weglot to path language:', pathLanguage);
			switchWeglotLanguage(pathLanguage);
			setCurrentLanguage(pathLanguage);
		} else if (weglotLanguage) {
			// If no language in URL but Weglot has one, use Weglot's
			setCurrentLanguage(weglotLanguage);
			
			// Update URL to match Weglot's language if not default
			if (weglotLanguage !== DEFAULT_LANGUAGE) {
				const cleanPath = getPathWithoutLanguage(pathname);
				const targetPath = `/${weglotLanguage}${cleanPath}`;
				if (pathname !== targetPath) {
					console.log('[LanguageContext] Updating URL to match Weglot:', targetPath);
					router.replace(targetPath);
				}
			}
		}
	}, [pathname, router, switchWeglotLanguage, weglotLanguage]);

	// Update URL when Weglot language changes
	useEffect(() => {
		console.log('[LanguageContext - Weglot Change] Weglot:', weglotLanguage, 'Current:', currentLanguage);
		
		if (weglotLanguage && weglotLanguage !== currentLanguage) {
			console.log('[LanguageContext] Weglot language changed from', currentLanguage, 'to', weglotLanguage);
			setCurrentLanguage(weglotLanguage);
			
			// Update URL to reflect the new language
			const cleanPath = getPathWithoutLanguage(pathname);
			const targetPath = weglotLanguage === DEFAULT_LANGUAGE 
				? cleanPath || '/'
				: `/${weglotLanguage}${cleanPath}`;
			
			if (pathname !== targetPath) {
				console.log('[LanguageContext] Pushing new path:', targetPath);
				router.push(targetPath);
			}
		}
	}, [weglotLanguage, pathname, router, currentLanguage]);

	const switchLanguage = (languageCode: string): void => {
		console.log('[LanguageContext] switchLanguage called with:', languageCode, 'Current:', currentLanguage);
		
		if (languageCode === currentLanguage) {
			console.log('[LanguageContext] Language already set to:', languageCode);
			return;
		}

		// Get clean path without language prefix
		const cleanPath = getPathWithoutLanguage(pathname);
		
		// Build target path with new language
		const targetPath = languageCode === DEFAULT_LANGUAGE 
			? cleanPath || '/'
			: `/${languageCode}${cleanPath}`;

		console.log('[LanguageContext] Switching language to:', languageCode);
		console.log('[LanguageContext] Clean path:', cleanPath);
		console.log('[LanguageContext] Target path:', targetPath);

		// Switch Weglot language
		switchWeglotLanguage(languageCode);
		
		// Update URL
		router.push(targetPath);
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
