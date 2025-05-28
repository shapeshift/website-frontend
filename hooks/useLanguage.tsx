import {useEffect, useState} from 'react';

export function useLanguage(): {
	currentLanguage: string;
	switchLanguage: (symbol: string) => void;
} {
	const [dynamicCurrentLang, setDynamicCurrentLang] = useState('en');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line
			//@ts-ignore
			if (window?.Weglot?.initialized) {
				// eslint-disable-next-line
				//@ts-ignore
				const staticCurrentLanguage = window.Weglot.getCurrentLang();
				console.log('[useLanguage] Weglot initialized, current language:', staticCurrentLanguage);
				setDynamicCurrentLang(staticCurrentLanguage);
			} else {
				console.log('[useLanguage] Weglot not initialized yet');

				// Listen for Weglot initialization
				const checkWeglot = setInterval(() => {
					// eslint-disable-next-line
					//@ts-ignore
					if (window?.Weglot?.initialized) {
						// eslint-disable-next-line
						//@ts-ignore
						const lang = window.Weglot.getCurrentLang();
						console.log('[useLanguage] Weglot initialized after wait, language:', lang);
						setDynamicCurrentLang(lang);
						clearInterval(checkWeglot);
					}
				}, 100);

				// Clean up after 5 seconds
				setTimeout(() => clearInterval(checkWeglot), 5000);
			}
		}
	}, []);

	const switchLanguage = (symbol: string): void => {
		console.log('[useLanguage] switchLanguage called with:', symbol);

		if (typeof window !== 'undefined') {
			// eslint-disable-next-line
			//@ts-ignore
			if (window?.Weglot?.initialized) {
				console.log('[useLanguage] Switching Weglot to:', symbol);
				// eslint-disable-next-line
				//@ts-ignore
				window.Weglot.switchTo(symbol);
				setDynamicCurrentLang(symbol);
			} else {
				console.log('[useLanguage] Weglot not initialized, cannot switch language');
			}
		}
	};

	return {
		currentLanguage: dynamicCurrentLang,
		switchLanguage
	};
}
