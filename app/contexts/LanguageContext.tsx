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
		
		// If URL has a language prefix, sync it with Weglot
		if (pathLanguage && pathLanguage !== DEFAULT_LANGUAGE) {
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
					router.replace(targetPath);
				}
			}
		}
	}, [pathname, router, switchWeglotLanguage, weglotLanguage]);

	// Update URL when Weglot language changes
	useEffect(() => {
		if (weglotLanguage && weglotLanguage !== currentLanguage) {
			setCurrentLanguage(weglotLanguage);
			
			// Update URL to reflect the new language
			const cleanPath = getPathWithoutLanguage(pathname);
			const targetPath = weglotLanguage === DEFAULT_LANGUAGE 
				? cleanPath || '/'
				: `/${weglotLanguage}${cleanPath}`;
			
			if (pathname !== targetPath) {
				router.push(targetPath);
			}
		}
	}, [weglotLanguage, pathname, router, currentLanguage]);

	const switchLanguage = (languageCode: string): void => {
		if (languageCode === currentLanguage) {
			return;
		}

		// Get clean path without language prefix
		const cleanPath = getPathWithoutLanguage(pathname);
		
		// Build target path with new language
		const targetPath = languageCode === DEFAULT_LANGUAGE 
			? cleanPath || '/'
			: `/${languageCode}${cleanPath}`;

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
