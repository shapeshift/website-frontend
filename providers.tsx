'use client';

import {arbitrum, base, mainnet, optimism, polygon} from 'viem/chains';
import {WagmiProvider} from 'wagmi';
import {getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import type {ReactNode} from 'react';

import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
	appName: 'Shapeshift',
	projectId: process.env.WALLETCONNECT_PROJECT_ID ?? '',
	chains: [mainnet, polygon, optimism, arbitrum, base],
	ssr: true // If your dApp uses server side rendering (SSR)
});

export function Providers({children}: {children: ReactNode}): ReactNode {
	const queryClient = new QueryClient();

	// Providing all messages to the client
	// side is the easiest way to get started

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider modalSize={'compact'}>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
