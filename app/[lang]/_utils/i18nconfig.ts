/************************************************************************************************
 * Language configuration for the application
 * Defines supported languages and their properties
 ************************************************************************************************/

export type TLanguage = {
	code: string;
	name: string;
	nativeName: string;
	weglotCode: string;
};

export const SUPPORTED_LANGUAGES: TLanguage[] = [
	{
		code: 'en',
		name: 'English',
		nativeName: 'English',
		weglotCode: 'en'
	},
	{
		code: 'ru',
		name: 'Russian',
		nativeName: 'Русский',
		weglotCode: 'ru'
	},
	{
		code: 'de',
		name: 'German',
		nativeName: 'Deutsch',
		weglotCode: 'de'
	},
	{
		code: 'fr',
		name: 'French',
		nativeName: 'Français',
		weglotCode: 'fr'
	},
	{
		code: 'zh',
		name: 'Chinese',
		nativeName: '中文',
		weglotCode: 'zh'
	},
	{
		code: 'es',
		name: 'Spanish',
		nativeName: 'Español',
		weglotCode: 'es'
	}
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguageFromPath(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];

	return SUPPORTED_LANGUAGES.some(lang => lang.code === firstSegment) ? firstSegment : '';
}

export function getPathWithoutLanguage(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];

	if (SUPPORTED_LANGUAGES.some(lang => lang.code === firstSegment)) {
		return `/${segments.slice(1).join('/')}`;
	}

	return pathname || '/';
}

export function getLanguagePath(pathname: string, language: string): string {
	const pathWithoutLang = getPathWithoutLanguage(pathname);
	return language === DEFAULT_LANGUAGE ? pathWithoutLang : `/${language}${pathWithoutLang}`;
}
