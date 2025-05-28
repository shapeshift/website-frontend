'use client';

import {usePathname, useRouter} from 'next/navigation';
import {createContext, useContext, useEffect, useState} from 'react';

import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES} from '@/app/i18n/config';
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

	useEffect(() => {
		if (weglotLanguage) {
			setCurrentLanguage(weglotLanguage);
		}
	}, [weglotLanguage]);

	const switchLanguage = (languageCode: string): void => {
		if (languageCode === currentLanguage) {
			return;
		}

		const newPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
		const targetPath = languageCode === DEFAULT_LANGUAGE ? newPath : `/${languageCode}${newPath}`;

		switchWeglotLanguage(languageCode);
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
