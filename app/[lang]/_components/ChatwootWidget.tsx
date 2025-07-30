/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import Script from 'next/script';
import {useEffect, useState} from 'react';

import type {ReactElement} from 'react';

type SecureMessageEvent = {
	data: {
		type?: string;
		eventName?: string;
		config?: Record<string, string | number | boolean>;
		payload?: Record<string, string | number | boolean>;
	};
} & MessageEvent;

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

const ALLOWED_CHATWOOT_ORIGINS = ['https://app.chatwoot.com', 'https://widget.chatwoot.com'];

const ALLOWED_MESSAGE_TYPES = [
	'chatwoot:ready',
	'chatwoot:resize',
	'chatwoot:toggle',
	'chatwoot:unread-message-count'
];

const BLOCKED_MESSAGE_TYPES = [
	'popoutChatWindow',
	'chatwoot:popout'
];

const ALLOWED_CHATWOOT_DOMAINS = [
	'app.chatwoot.com',
	'widget.chatwoot.com'
];

function isValidUrl(urlString: string): boolean {
	try {
		const url = new URL(urlString);
		
		if (url.protocol !== 'https:') {
			return false;
		}
		
		if (!ALLOWED_CHATWOOT_DOMAINS.includes(url.hostname)) {
			return false;
		}
		
		if (url.pathname.includes('..') || 
			url.pathname.includes('%') || 
			url.search.includes('javascript') ||
			url.hash.includes('javascript')) {
			return false;
		}
		
		return true;
	} catch {
		return false;
	}
}

function sanitizeValue(value: unknown, isUrl = false): string | number | boolean | null {
	if (typeof value === 'string') {
		if (isUrl) {
			return isValidUrl(value) ? value : null;
		}
		
		const sanitized = value
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/javascript\s*:/gi, '')
			.replace(/data\s*:/gi, '')
			.replace(/vbscript\s*:/gi, '')
			.replace(/on\w+\s*=/gi, '')
			.replace(/eval\s*\(/gi, '')
			.replace(/Function\s*\(/gi, '')
			.replace(/setTimeout\s*\(/gi, '')
			.replace(/setInterval\s*\(/gi, '')
			.replace(/%0[ad]/gi, '')
			.replace(/%2[ef]/gi, '')
			.replace(/[\r\n\t]/g, '');
			
		return sanitized === value ? sanitized : null;
	}
	if (typeof value === 'number' || typeof value === 'boolean') {
		return value;
	}
	return null;
}

function validateMessageData(data: unknown): data is SecureMessageEvent['data'] {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const obj = data as Record<string, unknown>;

	if (obj.type && typeof obj.type !== 'string') {
		return false;
	}
	if (obj.eventName && typeof obj.eventName !== 'string') {
		return false;
	}

	if (obj.config && typeof obj.config === 'object' && obj.config !== null) {
		for (const [key, value] of Object.entries(obj.config)) {
			const isUrlField = key.toLowerCase().includes('url') || key.toLowerCase().includes('baseurl');
			if (typeof key !== 'string' || sanitizeValue(value, isUrlField) === null) {
				return false;
			}
		}
	}

	if (obj.payload && typeof obj.payload === 'object' && obj.payload !== null) {
		for (const [key, value] of Object.entries(obj.payload)) {
			const isUrlField = key.toLowerCase().includes('url') || key.toLowerCase().includes('baseurl');
			if (typeof key !== 'string' || sanitizeValue(value, isUrlField) === null) {
				return false;
			}
		}
	}

	return true;
}

function createSecureMessageHandler(): (event: MessageEvent) => void {
	return (event: MessageEvent) => {
		if (!event.origin || !ALLOWED_CHATWOOT_ORIGINS.includes(event.origin)) {
			console.warn('[ChatwootWidget] Blocked message from unauthorized origin:', event.origin);
			return;
		}

		if (!validateMessageData(event.data)) {
			console.warn('[ChatwootWidget] Blocked message with invalid or potentially malicious data');
			return;
		}

		const data = event.data as SecureMessageEvent['data'];
		const messageType = data.type || data.eventName;

		if (!messageType || !ALLOWED_MESSAGE_TYPES.includes(messageType) || BLOCKED_MESSAGE_TYPES.includes(messageType)) {
			console.warn('[ChatwootWidget] Blocked unauthorized message type:', messageType);
			return;
		}

		const sanitizedData = {
			...data,
			config: data.config
				? Object.fromEntries(Object.entries(data.config).map(([k, v]) => {
					const isUrlField = k.toLowerCase().includes('url') || k.toLowerCase().includes('baseurl');
					return [k, sanitizeValue(v, isUrlField)];
				}))
				: undefined,
			payload: data.payload
				? Object.fromEntries(Object.entries(data.payload).map(([k, v]) => {
					const isUrlField = k.toLowerCase().includes('url') || k.toLowerCase().includes('baseurl');
					return [k, sanitizeValue(v, isUrlField)];
				}))
				: undefined
		};

		if (process.env.NODE_ENV !== 'production') {
			console.log('[ChatwootWidget] Authorized message received:', {
				origin: event.origin,
				type: messageType,
				data: sanitizedData
			});
		}
	};
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

		const secureMessageHandler = createSecureMessageHandler();
		window.addEventListener('message', secureMessageHandler);
		console.log('[ChatwootWidget] Secure message handler registered');

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
			window.removeEventListener('message', secureMessageHandler);
			console.log('[ChatwootWidget] Secure message handler removed');
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
