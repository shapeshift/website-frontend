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
			console.log(window.Weglot);
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
			window.Weglot.initialize({api_key: apiKey});
			// @ts-ignore
			console.log(window.Weglot.initialized);
			//@ts-ignore
			if (window.Weglot.initialized) {
				//@ts-expect-error
				window.Weglot.switchTo(language);
				console.log('switched to:', language);
				clearInterval(x);
			}
		}, 500);
		return () => {
			document.body.removeChild(script);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// @ts-ignore
		if (window.Weglot.initialized) {
			// @ts-ignore
			window.Weglot.switchTo(language);
			console.log('switched to', language);
		}
	}, [language]);

	return [language, setLanguage] as const;
};
