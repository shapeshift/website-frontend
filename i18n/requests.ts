import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
	/**********************************************************************************************
	 ** To add language support, add a new locale to the locales array in next.config.js
	 ** Then add a new file in the locales folder with the language code as the filename
	 ** Then add the messages to the new file
	 ** Change the locale const to some state in the app to allow for dynamic language support.
	 **********************************************************************************************/
	const locale = 'en';

	return {
		locale,
		messages: (await import(`../locales/${locale}.json`)).default
	};
});
