/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import Script from 'next/script';
import {useEffect, useState} from 'react';

import type {ReactElement} from 'react';

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		chatwootSDK?: {
			run: (config: {websiteToken: string; baseUrl: string}) => void;
			isLoaded?: boolean;
		};
		$chatwoot?: {
			reset?: () => void;
		};
	}
}

export function ChatwootWidget(): ReactElement {
	const [canInit, setCanInit] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		if (!canInit || isInitialized || hasError) {
			return;
		}

		if (!process.env.NEXT_PUBLIC_CHATWOOT_API_KEY) {
			console.error('[ChatwootWidget] NEXT_PUBLIC_CHATWOOT_API_KEY is not set');
			setHasError(true);
			return;
		}

		let retryCount = 0;
		let retryTimeout: NodeJS.Timeout | undefined;
		const maxRetries = 10;
		const initialDelay = 100;

		const initChatwoot = (): void => {
			try {
				if (!window.chatwootSDK) {
					if (retryCount < maxRetries) {
						retryCount++;
						const delay = initialDelay * Math.pow(2, retryCount - 1);
						console.log(
							`[ChatwootWidget] Chatwoot SDK not found, retrying in ${delay}ms (attempt ${retryCount}/${maxRetries})`
						);
						retryTimeout = setTimeout(initChatwoot, delay);
					} else {
						console.warn('[ChatwootWidget] Chatwoot SDK not found after maximum retries');
						setHasError(true);
					}
					return;
				}

				if (window.chatwootSDK.isLoaded) {
					console.log('[ChatwootWidget] Chatwoot SDK already initialized');
					setIsInitialized(true);
					return;
				}

				console.log('[ChatwootWidget] Chatwoot SDK found, initializing');
				window.chatwootSDK.run({
					websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_API_KEY!,
					baseUrl: '/chatwoot'
				});
				window.chatwootSDK.isLoaded = true;
				setIsInitialized(true);
			} catch (error) {
				console.error('[ChatwootWidget] Error initializing Chatwoot:', error);
				setHasError(true);
			}
		};

		if (window.chatwootSDK) {
			initChatwoot();
		} else {
			initChatwoot();
		}

		return () => {
			if (retryTimeout) {
				clearTimeout(retryTimeout);
			}
		};
	}, [canInit, isInitialized, hasError]);

	return (
		<Script
			id={'chatwoot-sdk'}
			src={'/chatwoot/packs/js/sdk.js'}
			strategy={'afterInteractive'}
			defer
			async
			onLoad={() => {
				console.log('[ChatwootWidget] Script loaded successfully');
				setCanInit(true);
			}}
			onError={error => {
				console.error('[ChatwootWidget] Failed to load Chatwoot script:', error);
				setHasError(true);
			}}
		/>
	);
}
