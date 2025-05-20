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
	const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN ?? 'WxJ5RjWcKZriX7hRjU7s1rdS';

	useEffect(() => {
		// Initialize Chatwoot when the script loads
		const initChatwoot = (): void => {
			if (window.chatwootSDK && websiteToken) {
				window.chatwootSDK.run({
					websiteToken,
					baseUrl: 'https://app.chatwoot.com/'
				});
			}
		};

		// Check if the script is already loaded
		if (window.chatwootSDK && websiteToken) {
			initChatwoot();
		}
	}, [websiteToken]);

	if (!websiteToken) {
		return <></>;
	}

	return (
		<Script
			src={'https://app.chatwoot.com/packs/js/sdk.js'}
			strategy={'afterInteractive'}
			onLoad={() => {
				if (window.chatwootSDK && websiteToken) {
					window.chatwootSDK.run({
						websiteToken,
						baseUrl: 'https://app.chatwoot.com/'
					});
				}
			}}
		/>
	);
}
