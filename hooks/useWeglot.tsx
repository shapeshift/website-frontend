import {useEffect, useState} from 'react';

export const useWeglot = (apiKey: string, defaultLanguage: string = 'en'): [string, (language: string) => void] => {
	const [language, setLanguage] = useState<string>(defaultLanguage);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://cdn.weglot.com/weglot.min.js';
		script.async = true;
		document.body.appendChild(script);

		const x = setInterval(() => {
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
			Weglot.initialize({api_key: apiKey});

			//@ts-ignore
			if (Weglot.initialized) {
				//@ts-ignore
				Weglot.switchTo(language);
				clearInterval(x);
			}
		}, 500);
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		// @ts-ignore
		if (window.Weglot) {
			// @ts-ignore
			if (window.Weglot.initialized) {
				// @ts-ignore
				window.Weglot.switchTo(language);
			}
		}
	}, [language]);

	return [language, setLanguage] as const;
};
