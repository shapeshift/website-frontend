export const appResources = [
	{name: 'Blog', href: '/resources/blog', description: 'Latest news and updates'},
	{name: 'FAQ', href: '/resources/faq', description: 'Frequently asked questions'},
	{name: 'Supported chains', href: '/resources/supported-chains', description: 'Blockchain networks we support'},
	{name: 'Terms of Service', href: '/resources/terms-of-service', description: 'Our terms and conditions'},
	{name: 'Privacy Policy', href: '/resources/privacy-policy', description: 'How we handle your data'}
];

export const appDao = [
	{name: 'Fox token', href: '/dao/fox-token', description: 'Our governance token'},
	{name: 'Governance', href: '/dao/governance', description: 'Participate in decision making'},
	{name: 'Docs', href: '/dao/docs', description: 'Technical documentation'},
	{name: 'Forum', href: '/dao/forum', description: 'Community discussions'}
];

export const appProducts = [
	{name: 'dApp', href: '/products/dapp', description: 'A decentralized finance wallet'},
	{name: 'Trade', href: '/products/trade', description: 'A decentralized finance wallet'},
	{name: 'DeFi Wallet', href: '/products/defi-wallet', description: 'A decentralized finance wallet'},
	{name: 'Earn', href: '/products/earn', description: 'A decentralized finance wallet'},
	{name: 'Mobile app', href: '/products/mobile-app', description: 'A decentralized finance wallet'},
	{name: 'KeepKey', href: '/products/keep-key', description: 'A decentralized finance wallet'}
];

export const headerTabs = [
	{name: 'Products', href: '/products', value: 'products'},
	{name: 'Resources', href: '/resources', value: 'resources'},
	{name: 'DAO', href: '/dao', value: 'dao'}
];

export const allWallets = [
	'KeepKey',
	'ShapeShift Wallet',
	'MetaMask',
	'XDEFI',
	'Wallet Connect',
	'Ledger',
	'Coinbase Wallet',
	'Phantom Wallet',
	'Keplr'
];

export const supportedChains = {
	btc: {
		name: 'BTC',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Coinbase Wallet']
	},
	eth: {
		name: 'ETH + ERC-20',
		supported: [
			'KeepKey',
			'ShapeShift Wallet',
			'MetaMask',
			'XDEFI',
			'Wallet Connect',
			'Ledger',
			'Coinbase Wallet',
			'Phantom Wallet',
			'Keplr'
		]
	},
	base: {
		name: 'Base',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	atom: {
		name: 'ATOM',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Keplr']
	},
	gnosis: {
		name: 'Gnosis',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'Ledger', 'Coinbase Wallet']
	},
	doge: {
		name: 'DOGE',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Coinbase Wallet']
	},
	avalanche: {
		name: 'Avalanche',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	bch: {
		name: 'BCH',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger']
	},
	bnbs: {
		name: 'BNB',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Coinbase Wallet']
	},
	arb: {
		name: 'ARB',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	optimism: {
		name: 'Optimism',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'Wallet Connect', 'Ledger']
	},
	polygon: {
		name: 'Polygon',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	thorchain: {
		name: 'THORChain',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger']
	},
	ltc: {
		name: 'LTC',
		supported: ['KeepKey', 'ShapeShift Wallet', 'Ledger', 'Coinbase Wallet']
	},
	sol: {
		name: 'SOL',
		supported: ['Phantom Wallet']
	}
};
