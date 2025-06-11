export const PRODUCTS_DICT = {
	header: {
		titleLine1: 'Your Wallet. One App.',
		titleLine2: 'Endless Opportunity',
		description: 'Trade Bitcoin, Ethereum and more with the best rates across leading DEXs and aggregators.',
		ctaButton: 'Trade Smarter'
	},
	buyCrypto: {
		title: 'Buy Crypto',
		description: 'Need to top up your crypto balance? ShapeShift has you covered with',
		widgetTitle: 'Onramper Widget'
	},
	chainBubbles: {
		defaultChains: [
			{url: '/chains/ethereum', image: {url: '/eth.png'}},
			{url: '/chains/bitcoin', image: {url: '/bitcoin.png'}},
			{url: '/chains/solana', image: {url: '/sol.png'}},
			{url: '/chains/ethereum', image: {url: '/eth.png'}},
			{url: '/chains/bitcoin', image: {url: '/bitcoin.png'}}
		]
	}
} as const;
