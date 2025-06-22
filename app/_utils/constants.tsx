import Image from 'next/image';

import {IconActivityRings} from '../_icons/IconActivityRings';
import {IconBlog} from '../_icons/IconBlog';
import {IconBulb} from '../_icons/IconBulb';
import {IconChains} from '../_icons/IconChains';
import {IconClassic} from '../_icons/IconClassic';
import {IconDapp} from '../_icons/IconDapp';
import {IconDiscover} from '../_icons/IconDiscover';
import {IconDocs} from '../_icons/IconDocs';
import {IconDollar} from '../_icons/IconDollar';
import {IconFox} from '../_icons/IconFox';
import {IconGlobe} from '../_icons/IconGlobe';
import {IconGovern} from '../_icons/IconGovern';
import {IconHeart} from '../_icons/IconHeart';
import {IconMobile} from '../_icons/IconMobile';
import {IconQuestion} from '../_icons/IconQuestion';
import {IconResource} from '../_icons/IconResource';
import {IconScanDevice} from '../_icons/IconScanDevice';
import {IconShield} from '../_icons/IconShield';
import {IconStar} from '../_icons/IconStar';
import {IconSupport} from '../_icons/IconSupport';
import {IconTriLink} from '../_icons/IconTriLink';
import {IconWallet} from '../_icons/IconWallet';

import type {TCardsRowSection, TSupportedChainTypes} from '@/app/_components/strapi/types';

export const dAppUrl =
	'https://app.shapeshift.com/?utm_source=mainpage&utm_medium=launchdapp&utm_campaign=top#/trade/eip155:1/erc20:0xc770eefad204b5180df6a14ee197d99d808ee52d/eip155:1/slip44:60/0';

const docsUrl = 'https://github.com/shapeshift/web';

const githubUrl = 'https://github.com/shapeshift';

export const footerButtonTitle = 'Donate';

/************************************************************************************************
 ** Homepage constants
 ************************************************************************************************/

export const heroTitle = 'Your multichain crypto home base.';
export const heroDescription =
	'Your gateway to trading, tracking, earning, and exploring crypto effortlessly. A community-owned, private, non-custodial, multichain platform putting you in full control of your digital assets.';

export const homepageWhiteTitle = 'Your Wallet. One App.';
export const homepageBlueTitle = 'Endless Opportunity.';

export const featuresTitle = 'Explore our features.';
export const featureTabTitle = 'Multichain crypto home base';
export const homepageFeatureTabs = ['Buy', 'Trade', 'Markets'];
export const featureCard1WhiteTitle = 'Easily send and receive your favorite crypto assets across ';
export const featureCard1BlueTitle = 'multiple chains';
export const featureCard3WhiteTitle = 'All-In-One';
export const featureCard3BlueTitle = 'ShapeShift wallet';
export const featureCard4WhiteTitle = 'Earn more';
export const featureCard4BlueTitle = 'with DeFi';

/************************************************************************************************
 ** DAO fox-token constants
 ************************************************************************************************/

export const foxTokenTitleWhite = 'Fox';
export const foxTokenTitleBlue = 'Power';
export const foxTokenDescription = 'Fox Tokens wield mighty powers for those who hodl them.';
export const foxTokenDescriptionNote =
	'NOTE: FOX Token benefits are subject to change, as determined by FOX Token holders.';
export const section1Title = 'How do I Participate?';
export const section1Description =
	'You can contribute as little or as much as you want to. Contribute more to get rewarded more. Keep up on everything going on in the DAO. Follow on Twitter for updates, join the Discord to learn about contributing, and discuss governance proposals on the FOX Forum.';

export const section2Title = 'How is a DAO different than a centralized company?';
export const section2Article1 =
	'FOX token holders govern the ShapeShift DAO—a treasury endowed with 567,000,000 FOX Tokens (56.7% of all FOX) and actively generating revenue.';
export const section2Article2 =
	'DAOs (Decentralized Autonomous Organizations) are a collective organization owned and managed by its members with all of them having a voice. We are actively building a powerful community around the open-source, self-custody, multi-chain crypto platform for the world.';
export const benefitsTitle = 'Benefits of working with the DAO.';
export const resourcesTitle = 'Resources';
export const communityTitle = 'Join our community';

export const foxTokenBenefits = [
	{
		title: 'Work from anywhere in the World.',
		icon: <IconGlobe />
	},
	{
		title: 'Get healthcare coverage (for US based workers)*',
		icon: <IconHeart />
	},
	{
		title: 'Work anonymously',
		icon: <IconShield />
	},
	{
		title: 'Optional W2s for US contributors*',
		icon: <IconActivityRings />
	},
	{
		title: 'Get paid in USDC, FOX, or Fiat*',
		icon: <IconDollar />
	},
	{
		title: 'Work with a fully distributed team of top talent',
		icon: <IconTriLink />
	}
];

export const foxTokenContributeItems = [
	{
		title: 'Contribute',
		href: githubUrl
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
		href: 'https://forum.shapeshift.com/'
	}
];

/************************************************************************************************
 ** Banner constants
 ************************************************************************************************/

export const bannerLeftTitle = 'Your multichain crypto home base.';
export const bannerRightTitle = 'DeFi everywhere, anytime, with ShapeShift mobile.';
export const bannerLeftButtonTitle = 'Launch dApp';
export const bannerRightButtonTitle = 'Try the demo';
export const bannerMobileSubtitle = 'Or download the app';

/************************************************************************************************
 ** App constants
 ************************************************************************************************/

export const appResources = [
	{
		name: 'Blog',
		href: '/blog',
		description: 'Latest news and updates',
		icon: <IconBlog />
	},
	{
		name: 'Discover',
		description: 'Learn more about the ShapeShift ecosystem',
		href: '/discover',
		icon: <IconDiscover />
	},
	{
		name: 'FAQ',
		href: '/faq',
		description: 'Frequently asked questions',
		icon: <IconQuestion />
	},
	{
		name: 'Chains',
		href: '/chains',
		description: 'Blockchain networks we support',
		icon: <IconChains />
	},
	{
		name: 'Wallets',
		href: '/wallets',
		description: 'Wallets we support',
		icon: <IconWallet />
	},
	{
		name: 'Protocols',
		href: '/protocols',
		description: 'Protocols we support',
		icon: <IconScanDevice />
	},
	{
		name: 'Support',
		href: '/support',
		description: 'We are here to help',
		icon: <IconSupport />
	},
	{
		name: 'Terms of Service',
		href: '/terms-of-service',
		description: 'Our terms and conditions',
		icon: <IconDocs />
	},
	{
		name: 'Privacy Policy',
		href: '/privacy-policy',
		description: 'How we handle your data',
		icon: <IconDocs />
	},
	{
		name: 'Brand Guidelines',
		href: 'https://www.figma.com/design/Pvo3sJx2n5TGf1tUgmZR4z/ShapeShift-Brand-Guidelines',
		description: 'Our brand guidelines'
	}
];

export const appDao = [
	{
		name: 'FOX Token',
		href: '/dao/fox-token',
		description: 'Our governance token',
		icon: <IconFox />
	},
	{
		name: 'Governance',
		href: 'https://snapshot.box/#/s:shapeshiftdao.eth',
		description: 'Participate in decision making',
		icon: <IconGovern />
	},
	{
		name: 'Docs',
		href: docsUrl,
		description: 'Technical documentation',
		icon: <IconDocs />
	},
	{
		name: 'Join Us',
		href: 'https://forum.shapeshift.com/',
		description: 'Join the community',
		icon: <IconStar />
	},
	{
		name: 'Feature Requests',
		href: 'https://shapeshift.canny.io/feature-requests',
		description: 'Feature requests',
		icon: <IconBulb />
	},
	{
		name: 'Integration Requests',
		href: 'https://shapeshift.canny.io/integration-requests',
		description: 'Integration requests',
		icon: <IconBulb />
	}
];

export const appProducts = [
	{
		name: 'App',
		href: dAppUrl,
		description: 'Trade, track, buy, and earn with your favorite crypto.',
		icon: <IconDapp />
	},
	{
		name: 'Classic',
		href: 'https://og.shapeshift.com/',
		description: 'Original ShapeShift platform with classic interface.',
		icon: <IconClassic />
	},
	{
		name: 'Trade',
		href: '/trade',
		description: 'Trade 10,000+ assets with one click.',
		icon: <IconDollar />
	},
	{
		name: 'DeFi Wallet',
		href: '/defi-wallet',
		description: 'All-In-One ShapeShift DeFi wallet.',
		icon: <IconResource />
	},
	{
		name: 'Mobile App',
		href: '/mobile-app',
		description: 'The only crypto app you need.',
		icon: <IconMobile />
	},
	{
		name: 'Buy/Sell Crypto',
		href: 'https://app.shapeshift.com/?utm_source=mainpage&utm_medium=launchdapp&utm_campaign=top#/buy-crypto',
		description: 'Exchange Fiat for cryptocurrency',
		icon: <IconDollar />
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
		{name: '𝕏', href: 'https://x.com/shapeshift'},
		{name: 'Discord', href: 'https://discord.gg/shapeshift'},
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
		title: 'Try Classic',
		url: 'https://og.shapeshift.com/'
	},
	cards: [
		{
			id: 49,
			title: 'Buy and Sell',
			description: "Buy crypto with fiat. Sell it back when you're ready. All in one place.",
			isTextFirst: false,
			href: 'https://app.shapeshift.com//#/buy-crypto',
			target: '_blank',
			image: {
				url: '/landing/cardBuyAndSell.png',
				width: 922,
				height: 512,
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
			title: 'Trade',
			description: 'Trade 10,000+ assets for Bitcoin, Ethereum, DOGE, & more with one click.',
			isTextFirst: false,
			href: 'https://app.shapeshift.com/#/trade',
			target: '_blank',
			image: {
				url: '/landing/cardethbtc.png',
				width: 922,
				height: 512,
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
			title: 'Shift',
			description:
				'Put your crypto to work instantly and start earning with the top DeFi solutions—effortless, permissionless, and non-custodial.',
			isTextFirst: false,
			href: 'https://app.shapeshift.com/pools#/markets/category/oneClickDefiAssets',
			target: '_blank',
			image: {
				url: '/landing/cardShift.png',
				width: 922,
				height: 512,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/landing/cardShapeshiftDAO.png'
					}
				}
			}
		}
	]
};

export const blogTypes = [
	{
		title: 'All posts',
		slug: 'all'
	},
	{
		title: 'Partner Integrations',
		slug: 'partner-integrations'
	},
	{
		title: 'Ethereum',
		slug: 'ethereum'
	},
	{
		title: 'Crypto 101',
		slug: 'crypto-101'
	},
	{
		title: 'Bitcoin',
		slug: 'bitcoin'
	},
	{
		title: 'Crypto pro',
		slug: 'crypto-pro'
	},
	{
		title: 'Thought Leadership',
		slug: 'thought-leadership'
	},
	{
		title: 'Governance Newsletters',
		slug: 'governance-newsletters'
	},
	{
		title: 'Newsletter',
		slug: 'newsletter'
	}
];
export function blogTypesSlugToCategory(slug: string): string {
	return blogTypes.find(tab => tab.slug === slug)?.title ?? slug;
}

export const newsroomCategories = [
	{
		title: 'All',
		slug: 'all'
	},
	{
		title: 'In The News',
		slug: 'in-the-news'
	},
	{
		title: 'Press Releases',
		slug: 'press-releases'
	}
];
export function newsroomCategoriesSlugToCategory(slug: string): string {
	return newsroomCategories.find(tab => tab.slug === slug)?.title ?? slug;
}

export const SUPPORTED_TOKENS = [
	{
		symbol: 'ETH',
		name: 'Ethereum',
		icon: '/widget/eth_icon.png',
		slug: 'ethereum',
		decimals: {
			btc: 8,
			eth: 18,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'ETH',
		tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
	},
	{
		symbol: 'BTC',
		name: 'Bitcoin',
		icon: '/widget/btc_icon.png',
		slug: 'bitcoin',
		decimals: {
			btc: 8,
			eth: 8,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'BTC'
	},
	{
		symbol: 'USDT',
		name: 'Tether on Ethereum',
		icon: '/widget/usdt_icon.png',
		sublogo: '/widget/eth_icon.png',
		slug: 'tether-on-ethereum',
		decimals: {
			btc: 8,
			eth: 8,
			sol: 5,
			usdt: 8,
			bnbeth: 6
		},
		requestKey: 'USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7',
		tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7'
	},

	{
		symbol: 'SOL',
		name: 'Solana',
		icon: '/widget/sol_icon.png',
		slug: 'solana',
		decimals: {
			btc: 9,
			eth: 18,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'SOL'
	}
];

export const SUPPORTED_CHAINS = [
	{
		id: 'bitcoin',
		name: 'Bitcoin',
		icon: '/widget/btc_icon.png',
		requestKey: 'BTC'
	},
	{
		id: 'base',
		name: 'Base',
		icon: '/widget/base_icon.png',
		requestKey: 'BASE'
	},
	{
		id: 'ethereum',
		name: 'Ethereum',
		icon: '/widget/eth_icon.png',
		requestKey: 'ETH',
		chainId: '1'
	},
	{
		id: 'solana',
		name: 'Solana',
		icon: '/widget/sol_icon.png',
		requestKey: 'SOL'
	}
];

export const TOKEN_CHAIN_SUPPORT: Record<string, string[]> = {
	USDT: ['arbitrum', 'ethereum', 'optimism'],
	BTC: ['bitcoin'],
	BNBETH: ['ethereum'],
	BNB: ['bnb'],
	SOL: ['solana'],
	ETH: ['arbitrum', 'base', 'optimism', 'ethereum']
};

export const blogTags = [
	{
		title: 'All tags',
		slug: 'all'
	},
	{
		title: 'Arbitrum',
		slug: 'arbitrum'
	},
	{
		title: 'Bitcoin',
		slug: 'bitcoin'
	},
	{
		title: 'Bitcoin Price',
		slug: 'bitcoin-price'
	},
	{
		title: 'Bitcoin Wallet',
		slug: 'bitcoin-wallet'
	},
	{
		title: 'CoinCap',
		slug: 'coincap'
	},
	{
		title: 'Cryptocurrency',
		slug: 'cryptocurrency'
	},
	{
		title: 'Culture',
		slug: 'culture'
	},
	{
		title: 'DAO',
		slug: 'dao'
	},
	{
		title: 'DeFi',
		slug: 'defi'
	},
	{
		title: 'Developer',
		slug: 'developer'
	},
	{
		title: 'DEX',
		slug: 'dex'
	},
	{
		title: 'Ethereum',
		slug: 'ethereum'
	},
	{
		title: 'Finance',
		slug: 'finance'
	},
	{
		title: 'FOX Token',
		slug: 'fox-token'
	},
	{
		title: 'KeepKey',
		slug: 'keepkey'
	},
	{
		title: 'Ledger',
		slug: 'ledger'
	},
	{
		title: 'Mobile',
		slug: 'mobile'
	},
	{
		title: 'News',
		slug: 'news'
	},
	{
		title: 'Optimism',
		slug: 'optimism'
	},
	{
		title: 'Portis',
		slug: 'portis'
	},
	{
		title: 'Security',
		slug: 'security'
	},
	{
		title: 'ShapeShift',
		slug: 'shapeshift'
	},
	{
		title: 'THORChain',
		slug: 'thorchain'
	},
	{
		title: 'Trader',
		slug: 'trader'
	},
	{
		title: 'Trading',
		slug: 'trading'
	},
	{
		title: 'Trezor',
		slug: 'trezor'
	},
	{
		title: 'Wallet',
		slug: 'wallet'
	}
];

export const newsroomTags = [
	{
		title: 'All tags',
		slug: 'all'
	},
	{
		title: 'Cryptocurrency',
		slug: 'cryptocurrency'
	},
	{
		title: 'DeFi',
		slug: 'defi'
	},
	{
		title: 'Ethereum',
		slug: 'ethereum'
	},
	{
		title: 'Finance',
		slug: 'finance'
	},
	{
		title: 'Culture',
		slug: 'culture'
	},
	{
		title: 'DEX',
		slug: 'dex'
	},
	{
		title: 'Bitcoin',
		slug: 'bitcoin'
	},
	{
		title: 'DAO',
		slug: 'dao'
	},
	{
		title: 'ShapeShift',
		slug: 'shapeshift'
	},
	{
		title: 'KeepKey',
		slug: 'keepkey'
	},
	{
		title: 'News',
		slug: 'news'
	},
	{
		title: 'Trading',
		slug: 'trading'
	},
	{
		title: 'Bitcoin Wallet',
		slug: 'bitcoin-wallet'
	},
	{
		title: 'Security',
		slug: 'security'
	},
	{
		title: 'Developer',
		slug: 'developer'
	},
	{
		title: 'Bitcoin Price',
		slug: 'bitcoin-price'
	},
	{
		title: 'Optimism',
		slug: 'optimism'
	},
	{
		title: 'Trader',
		slug: 'trader'
	},
	{
		title: 'Ledger',
		slug: 'ledger'
	},
	{
		title: 'Mobile',
		slug: 'mobile'
	}
];

export const carouselLogos = {
	cowSwap: {
		href: 'https://cow.fi/',
		src: '/landing/cow-swap.png',
		Logo: () => (
			<Image
				src={'/landing/cow-swap.png'}
				alt={'cow swap'}
				width={'200'}
				height={'40'}
			/>
		)
	},
	thorchain: {
		href: 'https://thorchain.org/',
		src: '/landing/thorchain.png',
		Logo: () => (
			<Image
				src={'/landing/thorchain.png'}
				alt={'thorchain'}
				width={'180'}
				height={'40'}
			/>
		)
	},
	onramper: {
		href: 'https://www.onramper.com/',
		src: '/landing/onramper.png',
		Logo: () => (
			<Image
				src={'/landing/onramper.png'}
				alt={'onramper'}
				width={'190'}
				height={'40'}
			/>
		)
	},
	nownodes: {
		href: 'https://nownodes.io/',
		src: '/landing/nownodes.png',
		Logo: () => (
			<Image
				src={'/landing/nownodes.png'}
				alt={'nownodes'}
				width={'160'}
				height={'40'}
			/>
		)
	},
	banxa: {
		href: 'https://banxa.com/',
		src: '/landing/banxa.png',
		Logo: () => (
			<Image
				src={'/landing/banxa.png'}
				alt={'banxa'}
				width={'170'}
				height={'40'}
			/>
		)
	},
	zerion: {
		href: 'https://zerion.io/',
		src: '/landing/zerion.png',
		Logo: () => (
			<Image
				src={'/landing/zerion.png'}
				alt={'zerion'}
				width={'170'}
				height={'40'}
			/>
		)
	},
	lifi: {
		href: 'https://li.fi/',
		src: '/landing/lifi.png',
		Logo: () => (
			<Image
				src={'/landing/lifi.png'}
				alt={'lifi'}
				width={'100'}
				height={'40'}
			/>
		)
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Ox: {
		href: 'https://0x.org/',
		src: '/landing/0x.png',
		Logo: () => (
			<Image
				src={'/landing/0x.png'}
				alt={'0x'}
				width={'55'}
				height={'40'}
			/>
		)
	}
};

/************************************************************************************************
 * Popup Animation Configuration
 * Defines the animation for the popup's entrance and exit
 * - Slides up from bottom
 * - Fades in
 * - Spring animation for natural feel
 ************************************************************************************************/
export const popupAnimation = {
	initial: {
		opacity: 0,
		y: 100,
		scale: 0.95,
		z: 1
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		z: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 15,
			mass: 0.8,
			delay: 0.2
		}
	},
	exit: {
		opacity: 0,
		y: 50,
		scale: 0.95,
		z: 1,
		transition: {
			duration: 0.15
		}
	}
};

export const CHAIN_TYPES: TSupportedChainTypes[] = ['EVM', 'Solana', 'Bitcoin', 'Cosmos'];

/************************************************************************************************
 * Landing Page Information Cards
 * Contains data for the "Trusted by millions" section on the landing page
 * Each card displays a title and a statistic
 * Used in the landing page to showcase key metrics about ShapeShift
 ************************************************************************************************/
export const landingInfoCards = [
	{
		title: 'Active wallets',
		stat: '170+'
	},
	{
		title: 'Available chains',
		stat: '13+'
	},
	{
		title: 'Assets',
		stat: '10K+'
	},
	{
		title: 'Traded on ShapeShift',
		stat: '$380M'
	}
];

export const statCardsTitle = 'Trusted by \n the Best';

/************************************************************************************************
 * Landing Page Request URL
 * Contains the URL for the request form on the landing page
 * Used in the landing page to allow users to request a new wallet or chain
 ************************************************************************************************/
export const requestUrl = 'https://shapeshift.canny.io/';
