/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import Script from 'next/script';
import {useEffect} from 'react';

// Declare Chatwoot SDK types
declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		chatwootSDK: {
			run: (config: {websiteToken: string; baseUrl: string}) => void;
		};
	}
}

export function ChatwootWidget(): JSX.Element {
	useEffect(() => {
		// Initialize Chatwoot when the script loads
		const initChatwoot = (): void => {
			if (window.chatwootSDK) {
				if (!process.env.NEXT_PUBLIC_CHATWOOT_API_KEY) {
					console.error('NEXT_PUBLIC_CHATWOOT_API_KEY is not set');
					return;
				}
				window.chatwootSDK.run({
					websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_API_KEY || '',
					baseUrl: 'https://app.chatwoot.com/'
				});
			}
		};

		// Check if the script is already loaded
		if (window.chatwootSDK) {
			initChatwoot();
		}
	}, []);

	return (
		<Script
			src={'https://app.chatwoot.com/packs/js/sdk.js'}
			strategy={'afterInteractive'}
			onLoad={() => {
				if (window.chatwootSDK) {
					if (!process.env.NEXT_PUBLIC_CHATWOOT_API_KEY) {
						console.error('NEXT_PUBLIC_CHATWOOT_API_KEY is not set');
						return;
					}
					window.chatwootSDK.run({
						websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_API_KEY || '',
						baseUrl: 'https://app.chatwoot.com/'
					});
				}
			}}
		/>
	);
}
