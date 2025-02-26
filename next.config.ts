import createNextIntlPlugin from 'next-intl/plugin';

import type {NextConfig} from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	crossOrigin: 'anonymous',
	/* config options here */
	reactStrictMode: true,
	env: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		STRAPI_URL: process.env.STRAPI_URL ?? '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ?? ''
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.ghosticmom.site'
			},
			{
				protocol: 'http',
				hostname: '172.233.242.224'
			}
		]
	},
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'cross-origin-embedder-policy',
						value: 'require-corp'
					}
				]
			}
		];
	},
	async redirects() {
		return [
			// Redirects from old blog posts to new blog posts
			{source: '/library', destination: '/resources/blog', permanent: true},
			{source: '/library/:slug', destination: '/resources/blog/:slug', permanent: true},
			{source: '/category/:slug', destination: '/resources/blog/categories/:slug', permanent: true},
			{source: '/tag/:slug', destination: '/resources/blog/tags/:slug', permanent: true},

			// Newsletter
			{source: '/newsletter', destination: '/resources/newsroom', permanent: true},
			{source: '/newsletter-french', destination: '/resources/newsroom', permanent: true},
			{source: '/newsletter-portuguese', destination: '/resources/newsroom', permanent: true},
			{source: '/newsletter-spanish', destination: '/resources/newsroom', permanent: true},
			{source: '/newsroom', destination: '/resources/newsroom', permanent: true},
			{source: '/newsroom/:slug', destination: '/resources/newsroom/:slug', permanent: true},

			// Chains
			{source: '/supported-assets', destination: '/resources/supported-chains', permanent: true},
			{source: '/solana', destination: '/resources/supported-chains/solana', permanent: true},
			{source: '/optimism', destination: '/resources/supported-chains/optimism', permanent: true},
			{source: '/polygon', destination: '/resources/supported-chains/polygon', permanent: true},
			{source: '/avalanche', destination: '/resources/supported-chains/avalanche', permanent: true},
			{source: '/ethereum', destination: '/resources/supported-chains/ethereum', permanent: true},
			{source: '/bitcoin', destination: '/resources/supported-chains/bitcoin', permanent: true},
			{source: '/arbitrum', destination: '/resources/supported-chains/arbitrum', permanent: true},
			{source: '/dogecoin', destination: '/resources/supported-chains/dogecoin', permanent: true},
			{source: '/fox', destination: '/resources/supported-chains/fox', permanent: true},
			{source: '/atom', destination: '/resources/supported-chains/cosmos', permanent: true},
			{source: '/binance-chain', destination: '/resources/supported-chains/binance-chain', permanent: true},
			{source: '/rune', destination: '/resources/supported-chains/rune', permanent: true},
			{source: '/base', destination: '/resources/supported-chains/base', permanent: true},
			{source: '/thorchain', destination: '/resources/supported-chains/thorchain', permanent: true},
			{source: '/buy-and-sell-bitcoin', destination: '/resources/supported-chains/bitcoin', permanent: true},

			// Reports
			{
				source: '/reports/algorithmic-stablecoins',
				destination: '/reports/algorithmic-stablecoins.pdf',
				permanent: true
			},
			{
				source: '/reports/decentralized-insurance',
				destination: '/reports/decentralized-insurance.pdf',
				permanent: true
			},
			{source: '/reports/enter-the-metaverse', destination: '/reports/enter-the-metaverse.pdf', permanent: true},
			{source: '/reports/new-frontiers', destination: '/reports/new-frontiers.pdf', permanent: true},
			{source: '/reports/yield-unchained', destination: '/reports/yield-unchained.pdf', permanent: true},
			{source: '/earn-crypto', destination: '/earn', permanent: true},
			{source: '/supported-chains', destination: '/resources/supported-chains', permanent: true},
			{source: '/research', destination: '/resources/blog', permanent: true},
			{source: '/faqs', destination: '/resources/faq', permanent: true},
			{source: '/android-notify', destination: '/mobile-app', permanent: true},
			{source: '/download', destination: '/mobile-app', permanent: true},
			{source: '/br', destination: '/', permanent: true},
			{source: '/feature-requests', destination: 'https://shapeshift.canny.io', permanent: true},

			// Wallet redirects
			{source: '/wallet-connect', destination: 'resources/supported-wallets/wallet-connect', permanent: true},
			{source: '/ledger', destination: 'resources/supported-wallets/ledger', permanent: true},
			{source: '/coinbase-wallet', destination: 'resources/supported-wallets/coinbase-wallet', permanent: true},
			{source: '/phantom-wallet', destination: 'resources/supported-wallets/phantom', permanent: true},
			{source: '/keplr', destination: 'resources/supported-wallets/keplr', permanent: true},
			{source: '/trust-wallet', destination: 'resources/supported-wallets/trust-wallet', permanent: true},
			{source: '/rabby-wallet', destination: 'resources/supported-wallets/rabby', permanent: true},
			{source: '/1inch-wallet', destination: 'resources/supported-wallets/1inch-wallet', permanent: true},
			{source: '/frame-wallet', destination: 'resources/supported-wallets/frame', permanent: true},
			{source: '/zerion-wallet', destination: 'resources/supported-wallets/zerion', permanent: true},
			{source: '/rainbow-wallet', destination: 'resources/supported-wallets/rainbow', permanent: true},
			{source: '/safe-wallet', destination: 'resources/supported-wallets/safe-wallet', permanent: true},

			// Privacy policy
			{source: '/dao-privacy-policy', destination: '/privacy-policy', permanent: true},
			{source: '/recruitment-privacy-policy', destination: '/privacy-policy', permanent: true},
			{source: '/privacy', destination: '/privacy-policy', permanent: true},
			{source: '/dao-terms-of-service', destination: '/terms-of-service', permanent: true},
			{source: '/social-promotion-rules', destination: '/terms-of-service', permanent: true},
			{source: '/responsible-disclosure-program', destination: '/terms-of-service', permanent: true},

			// Deprecated
			{source: '/waitlist/thank-you', destination: '/', permanent: true},
			{source: '/waitlist', destination: '/', permanent: true},
			{source: '/wallet/apps', destination: '/', permanent: true},
			{source: '/wallet-backup', destination: '/', permanent: true},
			{source: '/dao-resources', destination: '/', permanent: true},
			{source: '/shapeshift-decentralize-airdrop', destination: '/', permanent: true},

			{source: '/apple-app-store', destination: '/mobile-app', permanent: true},
			{source: '/google-play-store', destination: '/mobile-app', permanent: true}

			// {
			// 	source: '/roadmap',
			// 	destination:
			// 		'https://shapeshift.notion.site/d6e396d4e89d4264b936c2165f0f5dd1?v=502cce10c01d4a1b95eb8f96077c68ce',
			// 	permanent: true
			// },
			// {
			// 	source: '/genesis-dao-roadmap',
			// 	destination:
			// 		'https://shapeshift.notion.site/d6e396d4e89d4264b936c2165f0f5dd1?v=502cce10c01d4a1b95eb8f96077c68ce',
			// 	permanent: true
			// }
		];
	}
};

export default withNextIntl(nextConfig as NextConfig);
