import {IconBlog} from './common/icons/IconBlog';
import {IconChains} from './common/icons/IconChains';
import {IconDapp} from './common/icons/IconDapp';
import {IconDiscord} from './common/icons/IconDiscord';
import {IconDocs} from './common/icons/IconDocs';
import {IconFox} from './common/icons/IconFox';
import {IconGovern} from './common/icons/IconGovern';
import {IconKey} from './common/icons/IconKey';
import {IconMedium} from './common/icons/IconMedium';
import {IconMobile} from './common/icons/IconMobile';
import {IconPercent} from './common/icons/IconPercent';
import {IconQuestion} from './common/icons/IconQuestion';
import {IconResource} from './common/icons/IconResource';
import {IconTelegram} from './common/icons/IconTelegram';
import {IconTrade} from './common/icons/IconTrade';
import {IconTwitter} from './common/icons/IconTwitter';
import {IconWarpcast} from './common/icons/IconWarpcast';

import type {TCardsRowSection} from '@/types/strapi';

export const dAppUrl =
	'https://app.shapeshift.com/?utm_source=mainpage&utm_medium=launchdapp&utm_campaign=top#/trade/eip155:1/erc20:0xc770eefad204b5180df6a14ee197d99d808ee52d/eip155:1/slip44:60/0';

export const docsUrl = 'https://docs.shapeshift.com/';

export const appResources = [
	{name: 'Blog', href: '/resources/blog', description: 'Latest news and updates', icon: <IconBlog />},
	{name: 'FAQ', href: '/resources/faq', description: 'Frequently asked questions', icon: <IconQuestion />},
	{
		name: 'Supported chains',
		href: '/resources/supported-chains',
		description: 'Blockchain networks we support',
		icon: <IconChains />
	},
	{name: 'Terms of Service', href: '/resources/terms-of-service', description: 'Our terms and conditions'},
	{name: 'Privacy Policy', href: '/resources/privacy-policy', description: 'How we handle your data'}
];

export const appDao = [
	{name: 'Fox token', href: '/dao/fox-token', description: 'Our governance token', icon: <IconFox />},
	{
		name: 'Governance',
		href: 'https://snapshot.box/#/s:shapeshiftdao.eth',
		description: 'Participate in decision making',
		icon: <IconGovern />
	},
	{name: 'Docs', href: docsUrl, description: 'Technical documentation', icon: <IconDocs />}
];

export const appProducts = [
	{
		name: 'dApp',
		href: dAppUrl,
		description: 'A decentralized finance wallet',
		icon: <IconDapp />
	},
	{name: 'Trade', href: '/products/trade', description: 'A decentralized finance wallet', icon: <IconTrade />},
	{
		name: 'DeFi Wallet',
		href: '/products/defi-wallet',
		description: 'A decentralized finance wallet',
		icon: <IconResource />
	},
	{name: 'Earn', href: '/products/earn', description: 'A decentralized finance wallet', icon: <IconPercent />},
	{
		name: 'Mobile app',
		href: '/products/mobile-app',
		description: 'A decentralized finance wallet',
		icon: <IconMobile />
	},
	{
		name: 'KeepKey',
		href: 'https://www.keepkey.com/',
		description: 'A decentralized finance wallet',
		icon: <IconKey />
	}
];

export const headerTabs = [
	{name: 'Products', href: '/products', value: 'products'},
	{name: 'Resources', href: '/resources', value: 'resources'},
	{name: 'DAO', href: '/dao', value: 'dao'}
];

export const footerLinks = {
	Products: appProducts,
	Resources: appResources,
	DAO: appDao,
	Connect: [
		{name: 'Twitter', href: 'https://twitter.com/shapeshift'},
		{name: 'Medium', href: 'https://medium.com/shapeshift'},
		{name: 'Discord', href: 'https://discord.gg/shapeshift'},
		{name: 'Telegram', href: 'https://t.me/shapeshift'},
		{name: 'Warpcast', href: 'https://warpcast.com/shapeshift'}
	]
};

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
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
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

export const landingCards: TCardsRowSection = {
	id: 11,
	title: '',
	ctaBlock: {
		id: 1,
		title: 'Get the app',
		url: 'https://apps.apple.com/app/id1564826778'
	},
	cards: [
		{
			id: 49,
			title: 'Trade',
			description: 'Trade 10,000+ assets for Bitcoin, Ethereum, DOGE, & more with one click.',
			isTextFirst: false,
			image: {
				url: '/homepageBanner.png',
				width: 461,
				height: 219,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/uploads/thumbnail_img_5997fe520e.png'
					}
				}
			}
		},
		{
			id: 50,
			title: 'Save',
			description: 'FOX token has power on ShapeShift! Get discounts on fees when you hold FOX.',
			isTextFirst: false,
			image: {
				url: '/homepageBanner.png',
				width: 461,
				height: 219,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/uploads/thumbnail_img_5997fe520e.png'
					}
				}
			}
		},
		{
			id: 51,
			title: 'Earn',
			description:
				'Earn up to 12% on your Bitcoin, Ethereum, Dogecoin, Cosmos and more. Always non-custodial. Always real yield.',
			isTextFirst: false,
			image: {
				url: '/homepageBanner.png',
				width: 461,
				height: 219,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/homepageBanner.png'
					}
				}
			}
		}
	]
};

export const foxTokenBenefits = [
	{
		title: 'Work from anywhere in the World.',
		icon: null
	},
	{
		title: 'Get healthcare coverage (for US based workers)*',
		icon: null
	},
	{
		title: 'Work anonymously',
		icon: null
	},
	{
		title: 'Optional W2s for US contributors*',
		icon: null
	},
	{
		title: 'Get paid in USDC, FOX, or Fiat*',
		icon: null
	},
	{
		title: 'Work with a fully distributed team of top talent',
		icon: null
	}
];

export const foxTokenCommunityItems = [
	{
		href: 'https://twitter.com/fox_token',
		icon: <IconTwitter className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://medium.com/@fox_token',
		icon: <IconMedium className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://discord.gg/fox_token',
		icon: <IconDiscord className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://t.me/fox_token',
		icon: <IconTelegram className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://w.social/fox_token',
		icon: <IconWarpcast className={'transition-all duration-200 group-hover:text-blue'} />
	}
];

export const foxTokenContributeItems = [
	{
		title: 'Contribute',
		href: '#'
	},
	{
		title: 'Govern',
		href: 'https://snapshot.box/#/s:shapeshiftdao.eth'
	},
	{
		title: 'Read Docs',
		href: docsUrl
	},
	{
		title: 'Discuss',
		href: '#'
	}
];

export const blogTabs = [
	{
		title: 'All posts',
		slug: 'all'
	},
	{
		title: 'Partner Integrations',
		slug: 'Partner Integrations'
	},
	{
		title: 'Ethereum',
		slug: 'Ethereum'
	},
	{
		title: 'Crypto 101',
		slug: 'Crypto 101'
	},
	{
		title: 'Bitcoin',
		slug: 'Bitcoin'
	},
	{
		title: 'Crypto pro',
		slug: 'Crypto pro'
	},
	{
		title: 'Thought Leadership',
		slug: 'Thought Leadership'
	},
	{
		title: 'Governance Newsletters',
		slug: 'Governance Newsletters'
	},
	{
		title: 'Newsletter',
		slug: 'Newsletter'
	}
];
