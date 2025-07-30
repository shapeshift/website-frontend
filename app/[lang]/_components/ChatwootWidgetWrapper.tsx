import {headers} from 'next/headers';

import {ChatwootWidget} from './ChatwootWidget';

import type {ReactElement} from 'react';

export async function ChatwootWidgetWrapper(): Promise<ReactElement> {
	const headersList = await headers();
	const nonce = headersList.get('x-nonce') || undefined;

	return <ChatwootWidget nonce={nonce} />;
}