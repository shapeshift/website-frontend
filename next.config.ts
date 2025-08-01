/** @type {import('next').NextConfig} */
const nextConfig = {
	crossOrigin: 'anonymous',
	/* config options here */
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'strapi.shapeshift.com'
			},
			{
				protocol: 'https',
				hostname: 'strapi.shapeshift.com'
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
				source: '/:path((?!chatwoot).*)',
				headers: [
					{
						key: 'cross-origin-embedder-policy',
						value: 'credentialless'
					},
					{
						key: 'cross-origin-resource-policy',
						value: 'cross-origin'
					},
					{
						key: 'cross-origin-opener-policy',
						value: 'same-origin'
					}
				]
			}
		];
	},
	async rewrites() {
		return [];
	},
	async redirects() {
		return [
			// Redirects from old blog posts to new blog posts
			{source: '/library', destination: '/blog', permanent: true},
			{source: '/library/:slug', destination: '/blog/:slug', permanent: true},
			{
				source: '/category/:slug',
				destination: '/blog/categories/:slug',
				permanent: true
			},
			{
				source: '/tag/:slug',
				destination: '/blog/tags/:slug',
				permanent: true
			},

			// Newsletter
			{source: '/newsletter', destination: '/newsroom', permanent: true},
			{
				source: '/newsletter-french',
				destination: '/newsroom',
				permanent: true
			},
			{
				source: '/newsletter-portuguese',
				destination: '/newsroom',
				permanent: true
			},
			{
				source: '/newsletter-spanish',
				destination: '/newsroom',
				permanent: true
			},

			// Chains
			{source: '/assets', destination: '/chains', permanent: true},
			{source: '/solana', destination: '/chains/solana', permanent: true},
			{source: '/optimism', destination: '/chains/optimism', permanent: true},
			{source: '/polygon', destination: '/chains/polygon', permanent: true},
			{
				source: '/avalanche',
				destination: '/chains/avalanche',
				permanent: true
			},
			{source: '/ethereum', destination: '/chains/ethereum', permanent: true},
			{source: '/bitcoin', destination: '/chains/bitcoin', permanent: true},
			{source: '/arbitrum', destination: '/chains/arbitrum', permanent: true},
			{source: '/dogecoin', destination: '/chains/dogecoin', permanent: true},
			{source: '/fox', destination: '/chains/fox', permanent: true},
			{source: '/atom', destination: '/chains/cosmos', permanent: true},
			{
				source: '/binance-chain',
				destination: '/chains/binance-chain',
				permanent: true
			},
			{source: '/rune', destination: '/chains/rune', permanent: true},
			{source: '/base', destination: '/chains/base', permanent: true},
			{
				source: '/thorchain',
				destination: '/chains/thorchain',
				permanent: true
			},
			{
				source: '/buy-and-sell-bitcoin',
				destination: '/chains/bitcoin',
				permanent: true
			},

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
			{
				source: '/reports/enter-the-metaverse',
				destination: '/reports/enter-the-metaverse.pdf',
				permanent: true
			},
			{
				source: '/reports/new-frontiers',
				destination: '/reports/new-frontiers.pdf',
				permanent: true
			},
			{
				source: '/reports/yield-unchained',
				destination: '/reports/yield-unchained.pdf',
				permanent: true
			},

			// Other
			{source: '/earn-crypto', destination: '/earn', permanent: true},
			{source: '/research', destination: '/blog', permanent: true},
			{source: '/faqs', destination: '/faq', permanent: true},
			{
				source: '/android-notify',
				destination: '/mobile-app',
				permanent: true
			},
			{source: '/download', destination: '/mobile-app', permanent: true},
			{source: '/br', destination: '/', permanent: true},
			{
				source: '/feature-requests',
				destination: 'https://shapeshift.canny.io',
				permanent: true
			},

			// Wallet redirects
			{
				source: '/wallet-connect',
				destination: 'resources/wallets/wallet-connect',
				permanent: true
			},
			{
				source: '/ledger',
				destination: 'resources/wallets/ledger',
				permanent: true
			},
			{
				source: '/coinbase-wallet',
				destination: 'resources/wallets/coinbase-wallet',
				permanent: true
			},
			{
				source: '/phantom-wallet',
				destination: 'resources/wallets/phantom',
				permanent: true
			},
			{
				source: '/keplr',
				destination: 'resources/wallets/keplr',
				permanent: true
			},
			{
				source: '/trust-wallet',
				destination: 'resources/wallets/trust-wallet',
				permanent: true
			},
			{
				source: '/rabby-wallet',
				destination: 'resources/wallets/rabby',
				permanent: true
			},
			{
				source: '/1inch-wallet',
				destination: 'resources/wallets/1inch-wallet',
				permanent: true
			},
			{
				source: '/frame-wallet',
				destination: 'resources/wallets/frame',
				permanent: true
			},
			{
				source: '/zerion-wallet',
				destination: 'resources/wallets/zerion',
				permanent: true
			},
			{
				source: '/rainbow-wallet',
				destination: 'resources/wallets/rainbow',
				permanent: true
			},
			{
				source: '/safe-wallet',
				destination: 'resources/wallets/safe-wallet',
				permanent: true
			},

			// Privacy policy
			{
				source: '/dao-privacy-policy',
				destination: '/privacy-policy',
				permanent: true
			},
			{
				source: '/recruitment-privacy-policy',
				destination: '/privacy-policy',
				permanent: true
			},
			{source: '/privacy', destination: '/privacy-policy', permanent: true},
			{
				source: '/dao-terms-of-service',
				destination: '/terms-of-service',
				permanent: true
			},
			{
				source: '/social-promotion-rules',
				destination: '/terms-of-service',
				permanent: true
			},
			{
				source: '/responsible-disclosure-program',
				destination: '/terms-of-service',
				permanent: true
			},

			// Deprecated
			{source: '/waitlist/thank-you', destination: '/', permanent: true},
			{source: '/waitlist', destination: '/', permanent: true},
			{source: '/wallet/apps', destination: '/', permanent: true},
			{source: '/wallet-backup', destination: '/', permanent: true},
			{source: '/dao-resources', destination: '/', permanent: true},
			{
				source: '/shapeshift-decentralize-airdrop',
				destination: '/',
				permanent: true
			},

			// Discover
			{
				source: '/thorchain/liquidity-pools',
				destination: '/discover/liquidity-pools',
				permanent: true
			},
			{
				source: '/thorchain/streaming-swaps',
				destination: '/discover/streaming-swaps',
				permanent: true
			},
			{
				source: '/thorchain/lend-borrow',
				destination: '/discover/lend-borrow',
				permanent: true
			},
			{
				source: '/thorchain/trade',
				destination: '/discover/trade',
				permanent: true
			},
			{
				source: '/thorchain/saver-vaults',
				destination: '/discover/saver-vaults',
				permanent: true
			},

			// App store
			{
				source: '/apple-app-store',
				destination: 'https://apps.apple.com/us/app/shapeshift-crypto-platform/id996569075',
				permanent: true
			},
			{
				source: '/google-play-store',
				destination:
					'https://play.google.com/store/apps/details?id=com.shapeshift.droid_shapeshift&hl=en_US&gl=US',
				permanent: true
			}

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

export default nextConfig;
