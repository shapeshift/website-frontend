import Image from 'next/image';
import {useMemo} from 'react';

import {Button} from '@/app/[lang]/_components/Button';
import {LocalizedLink} from '@/app/[lang]/_components/LocalizedLink';
import {cl} from '@/app/[lang]/_utils/cl';

import type {TStrapiImage} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

function WalletFeature({chainName}: {chainName: string}): ReactNode {
	return (
		<div
			className={
				'container col-span-6 grid w-full grid-cols-2 overflow-hidden rounded-2xl lg:aspect-[760/540] lg:h-[540px]'
			}
			style={{
				backgroundImage: "url('/wallets/cover.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div className={'w-full p-20'}>
				<p className={'text-[40px] leading-[48px] text-white'}>{`ShapeShift ${chainName} wallet`}</p>
				<div className={'flex flex-col gap-4 pt-8'}>
					<p className={'text-xl text-secondary/50'}>
						{`Easily connect your favorite ${chainName} Wallet to ShapeShift. Need a ${chainName} Wallet? Get started with the ShapeShift wallet today.`}
					</p>
					<p className={'text-xl text-secondary/50'}>
						{`Easily view your ${chainName} wallet address, ${chainName} balance, ${chainName} transaction history, and ${chainName} price in one simple `}
						<LocalizedLink
							className={'text-white underline'}
							target={'_blank'}
							href={'https://app.shapeshift.com/#/wallet'}>
							{'interactive dashboard'}
						</LocalizedLink>
						{'.'}
					</p>
				</div>
				<div className={'mt-10'}>
					<Button
						variant={'blue'}
						title={'Get Started'}
						href={'https://app.shapeshift.com/#/wallet'}
						hasArrow
					/>
				</div>
			</div>
			<div className={'flex w-full items-end justify-end'}>
				<Image
					src={'/chains/wallet-mockup.png'}
					alt={'ShapeShift wallet'}
					width={680}
					height={540}
				/>
			</div>
		</div>
	);
}

function HardwareWalletFeature({chainName}: {chainName: string}): ReactNode {
	return (
		<div
			className={
				'container col-span-1 grid grid-cols-3 gap-4 overflow-hidden rounded-2xl bg-secondBg p-6 lg:col-span-6 lg:aspect-[1400/476] lg:h-[476px] lg:p-10'
			}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div className={'flex w-full items-center justify-start px-20'}>
				<p className={'text-[40px] leading-[48px] text-white'}>{'Hardware wallet support'}</p>
			</div>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<Image
					src={'/chains/keepkey.png'}
					alt={'KeepKey'}
					width={349}
					height={204}
				/>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{'KeepKey'}</p>
					<p className={'text-base text-secondary/50'}>
						{'Connect your '}
						<LocalizedLink
							className={'text-white underline'}
							target={'_blank'}
							href={'https://shapeshift.com/wallets/keepkey'}>
							{'KeepKey'}
						</LocalizedLink>
						{` hardware wallet to ShapeShift and enjoy permissionless, private ${chainName} swaps and DeFi.`}
					</p>
				</div>
			</div>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<Image
					src={'/chains/ledger.png'}
					alt={'Ledger'}
					width={349}
					height={204}
				/>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{'Ledger'}</p>
					<p className={'text-base text-secondary/50'}>
						{'Privately connect your '}
						<LocalizedLink
							className={'text-white underline'}
							href={'/wallets/ledger'}>
							{'Ledger'}
						</LocalizedLink>
						{` directly to ShapeShift without the need for Ledger Live and enjoy permissionless ${chainName}.`}
					</p>
				</div>
			</div>
		</div>
	);
}

function BuyInSecondsFeature({chainName}: {chainName: string}): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>
						{`Easily buy ${chainName} in seconds`}
					</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px]'}
							title={'Buy'}
							href={'https://app.shapeshift.com/#/buy-crypto'}
						/>
					</div>
				</div>
				<p className={'pb-4 text-base text-secondary/50'}>
					{`Experience the multichain simplicity of buying ${chainName} with ShapeShift's easy-to-use `}
					<LocalizedLink
						className={'text-white underline'}
						target={'_blank'}
						href={'https://app.shapeshift.com/#/buy-crypto'}>
						{'fiat ramp'}
					</LocalizedLink>
					{`. No matter where you are, ShapeShift makes it effortless buy ${chainName}.`}
				</p>
				<p className={'text-base text-secondary/50'}>
					{`Say goodbye to complex procedures and failed transactions, and say hello to a new way to ShapeShift your ${chainName}.`}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end'}>
				<Image
					src={'/chains/buy-mockup.png'}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={515}
					height={368}
				/>
			</div>
		</div>
	);
}

function CustodialFeature({chainName, foxImg}: {chainName: string; foxImg: TStrapiImage}): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>
						{`Self-custodial ${chainName}: Redefined`}
					</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Learn More'}
							href={'/defi-wallet'}
						/>
					</div>
				</div>
				<p className={'pb-4 text-base text-secondary/50'}>
					{`Your keys. Your assets. Your chain. ShapeShift Wallet gives you direct, private access to ${chainName} — no middlemen, no compromises. Hold, trade, and interact with DeFi your way, across all supported networks.`}
				</p>
				<p className={'text-base text-secondary/50'}>
					{`Welcome to the most private multichain interface for ${chainName}.`}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end'}>
				<Image
					src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${foxImg.url}`}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={foxImg.width}
					height={foxImg.height}
				/>
			</div>
		</div>
	);
}

function SolanaJupiterExchangeFeature(): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col-reverse rounded-b-2xl col-span-1 lg:col-span-2'
			)}>
			<div className={'p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{'Jupiter Exchange'}</div>
				<div className={'text-gray-500'}>
					{
						"Experience the multichain simplicity of buying Solana with ShapeShift's easy-to-use fiat ramp. No matter where you are, ShapeShift makes it effortless buy Solana."
					}
				</div>
			</div>
			<div className={'aspect-video overflow-hidden rounded-2xl'}>
				<Image
					src={'/chains/feature-jupiter.png'}
					alt={'Jupiter Exchange'}
					width={461}
					height={219}
					className={'size-full object-contain p-6 transition-all duration-300 hover:scale-105'}
				/>
			</div>
		</div>
	);
}

function ShapeshiftMultichainSnapFeature(): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col-reverse rounded-b-2xl col-span-1 lg:col-span-2'
			)}>
			<div className={'p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{'Multichain Snap'}</div>
				<div className={'text-gray-500'}>
					{'ShapeShift’s MetaMask Snap empowers you to do more with your '}
					<LocalizedLink
						className={'text-white underline'}
						target={'_blank'}
						href={'https://metamask.io/'}>
						{'MetaMask'}
					</LocalizedLink>
					{' wallet. Trade '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/bitcoin'}>
						{'Bitcoin'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/ethereum'}>
						{'Ethereum'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/base'}>
						{'Base'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/cosmos'}>
						{'Cosmos'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/thorchain'}>
						{'THORChain'}
					</LocalizedLink>
					{' and more with your '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/wallets/metamask'}>
						{'MetaMask'}
					</LocalizedLink>
					{'.'}
				</div>
			</div>
			<div className={'aspect-video overflow-hidden rounded-2xl pt-[5%]'}>
				<Image
					src={'/chains/feature-multichainSnap.png'}
					alt={'Jupiter Exchange'}
					width={461}
					height={219}
					className={'size-full object-cover object-top px-6 transition-all duration-300 hover:scale-105'}
				/>
			</div>
		</div>
	);
}

function YourKeyFeature(): ReactNode {
	return (
		<div
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col-reverse rounded-b-2xl col-span-1 lg:col-span-2'
			)}>
			<div className={'p-10'}>
				<div className={'mb-2 text-2xl text-white'}>{'You control your keys'}</div>
				<div className={'text-gray-500'}>
					{'Always retain custody of your assets when you earn with ShapeShift. Your keys. Your crypto.'}
				</div>
			</div>
			<div className={'aspect-video overflow-hidden rounded-2xl'}>
				<Image
					src={'/chains/feature-yourKey.png'}
					alt={'Your Key'}
					width={461}
					height={219}
					className={'size-full object-contain transition-all duration-300 hover:scale-105'}
				/>
			</div>
		</div>
	);
}

function StreamingSwapsFeature({chainName}: {chainName: string}): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>{'Streaming swaps'}</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Swap'}
							href={'https://app.shapeshift.com/#/trade'}
						/>
					</div>
				</div>
				<p className={'pb-4 text-base text-secondary/50'}>
					{`Experience the multichain simplicity of buying ${chainName} with ShapeShift's easy-to-use `}
					<LocalizedLink
						className={'text-white underline'}
						target={'_blank'}
						href={'https://app.shapeshift.com/#/buy-crypto'}>
						{'fiat ramp'}
					</LocalizedLink>
					{`. No matter where you are, ShapeShift makes it effortless buy ${chainName}.`}
				</p>
				<p className={'text-base text-secondary/50'}>
					{`Say goodbye to complex procedures and failed transactions, and say hello to a new way to ShapeShift your ${chainName}.`}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end pb-10'}>
				<Image
					src={'/chains/feature-streamingswaps.png'}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={409}
					height={300}
				/>
			</div>
		</div>
	);
}

function ThorChainTradeFeature(): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>{'Trade'}</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Trade'}
							href={'https://app.shapeshift.com/'}
						/>
					</div>
				</div>
				<p className={'pb-4 text-base text-secondary/50'}>
					{'Enjoy the most seamless, fast, and secure '}
					<LocalizedLink
						className={'text-white underline'}
						target={'_blank'}
						href={'https://app.shapeshift.com/'}>
						{'trading experience'}
					</LocalizedLink>
					{' across multiple blockchains directly from your '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/wallets/'}>
						{'DeFi wallet'}
					</LocalizedLink>
					{'.'}
				</p>
				<p className={'text-base text-secondary/50'}>
					{
						"ShapeShift harnesses the power of THORChain's technology, enhancing the way you trade--ensuring you get the best rate every time. Whether you are trading "
					}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/bitcoin'}>
						{'Bitcoin'}
					</LocalizedLink>
					{' or Memecoins, trade like the professionals with ShapeShift and THORChain.'}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end'}>
				<Image
					src={'/chains/feature-thorChainTrade.png'}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={409}
					height={300}
				/>
			</div>
		</div>
	);
}

function RFoxFeature(): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>
						{'Get paid to trade: Introducing rFOX'}
					</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Learn more'}
							href={'https://app.shapeshift.com/#/rfox/stake'}
						/>
					</div>
				</div>
				<p className={'pb-4 text-base text-secondary/50'}>{'Stake into rFOX, get rewarded in RUNE.'}</p>
				<p className={'text-base text-secondary/50'}>{'The more you trade, the more you earn.'}</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end pb-10'}>
				<Image
					src={'/chains/feature-rFox.png'}
					alt={''}
					className={'h-auto max-h-[200px] w-full object-contain object-bottom'}
					width={409}
					height={300}
				/>
			</div>
		</div>
	);
}

function ThorChainLendingFeature(): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>{'Lend & borrow'}</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Learn more'}
							href={'https://app.shapeshift.com/#/lending'}
						/>
					</div>
				</div>
				<p className={'pb-4 text-base text-secondary/50'}>
					{'Until the launch of THORChain’s app layer, THORChain Lending is halted'}
				</p>
				<p className={'text-base text-secondary/50'}>
					{'Borrow over 10,000 assets against your '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/bitcoin'}>
						{'BTC'}
					</LocalizedLink>
					{' and '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/ethereum'}>
						{'ETH'}
					</LocalizedLink>
					{' with 0% APR and no liquidations! Do more with your crypto portfolio with THORChain '}
					<LocalizedLink
						className={'text-white underline'}
						href={'https://app.shapeshift.com/#/lending'}>
						{'Lending'}
					</LocalizedLink>
					{' on ShapeShift.'}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end pb-10'}>
				<Image
					src={'/chains/feature-thorChainLending.png'}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={409}
					height={300}
				/>
			</div>
		</div>
	);
}

function LiquidityPoolFeature(): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>{'Liquidity pools'}</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Dive in'}
							href={'https://app.shapeshift.com/pools#/pools'}
						/>
					</div>
				</div>
				<p className={'text-base text-secondary/50'}>
					{'Enhance your crypto portfolio by '}
					<LocalizedLink
						className={'text-white underline'}
						href={'https://app.shapeshift.com/pools#/pools'}>
						{'providing liquidity'}
					</LocalizedLink>
					{' and '}
					<LocalizedLink
						className={'text-white underline'}
						href={'https://app.shapeshift.com/#/pools'}>
						{'earning passive income'}
					</LocalizedLink>
					{
						' directly from your DeFi wallet with ShapeShift App. It’s simple, secure, and effective. Dive in and start maximizing your returns today!'
					}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end'}>
				<Image
					src={'/chains/feature-liquidityPool.png'}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={409}
					height={300}
				/>
			</div>
		</div>
	);
}

function ThorChainRunePoolFeature(): ReactNode {
	return (
		<div
			style={{
				background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
			}}
			className={cl(
				'flex overflow-hidden h-full bg-secondBg hover:bg-secondHoverBg rounded-2xl',
				'flex-col col-span-1 lg:col-span-3'
			)}>
			<div className={'aspect-video p-10 text-left'}>
				<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
					<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>{'RUNE pool'}</p>
					<div>
						<Button
							variant={'white'}
							className={'!w-[120px] whitespace-nowrap'}
							title={'Dive in'}
							href={'https://app.shapeshift.com/pools#/pools'}
						/>
					</div>
				</div>
				<p className={'text-base text-secondary/50'}>
					{
						'Earn RUNE yield by providing liquidity onchain with a diverse group of bluechip asset pools such as '
					}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/bitcoin'}>
						{'Bitcoin'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/ethereum'}>
						{'Ethereum'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/binance-chain'}>
						{'BNB'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/dogecoin'}>
						{'Dogecoin'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/avalanche'}>
						{'AVAX'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/cosmos'}>
						{'ATOM'}
					</LocalizedLink>
					{', USDC, USDT and any other major gas asset added to THORChain.'}
				</p>
			</div>
			<div className={'mx-auto mt-auto flex aspect-video w-2/3 items-end justify-end'}>
				<Image
					src={'/chains/feature-thorChainRunePool.png'}
					alt={''}
					className={'h-auto w-full object-contain object-bottom'}
					width={409}
					height={300}
				/>
			</div>
		</div>
	);
}

function SaverVaultFeature(): ReactNode {
	return (
		<div
			className={
				'container relative col-span-6 grid grid-cols-2 overflow-hidden rounded-2xl bg-secondBg px-10 pt-10'
			}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div className={'flex w-full flex-col justify-start gap-8 px-10'}>
				<p className={'text-left text-[40px] leading-[48px] text-white'}>{'Saver vaults'}</p>
				<p className={'text-left text-base text-secondary/50'}>
					{
						'Welcome to a new, permissionless, self-custodial solution that empowers you to provide single asset liquidity on  THORChain. Earn single sided yield on native assets such as '
					}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/bitcoin'}>
						{'Bitcoin'}
					</LocalizedLink>
					{', '}
					<LocalizedLink
						className={'text-white underline'}
						href={'/chains/dogecoin'}>
						{'Dogecoin'}
					</LocalizedLink>
					{', Bitcoin Cash, Litecoin, and more.'}
				</p>
			</div>

			<div className={'flex flex-row justify-between'}>
				<Image
					src={'/chains/feature-vaults.png'}
					alt={'feature-vaults'}
					width={349}
					height={204}
				/>
				<Button
					variant={'white'}
					className={'!w-[120px] whitespace-nowrap'}
					title={'Start Saving'}
					href={'https://app.shapeshift.com/#/pools'}
				/>
			</div>
		</div>
	);
}

export function ChainFeatures(props: {chainName: string; foxImg: TStrapiImage; features: string[]}): ReactNode {
	const {
		chainName,
		foxImg,
		features = ['ShapeShift wallet', 'Hardware wallet support', 'Easily buy in seconds', 'Self-custodial Redefined']
	} = props;

	const featuresComponents = useMemo(() => {
		const allFeatures = [];
		if (features.includes('ShapeShift wallet')) {
			allFeatures.push(
				<WalletFeature
					key={'WalletFeature'}
					chainName={chainName}
				/>
			);
		}
		if (features.includes('Hardware wallet support')) {
			allFeatures.push(
				<HardwareWalletFeature
					key={'HardwareWalletFeature'}
					chainName={chainName}
				/>
			);
		}
		if (features.includes('Easily buy in seconds')) {
			allFeatures.push(
				<BuyInSecondsFeature
					key={'BuyInSecondsFeature'}
					chainName={chainName}
				/>
			);
		}
		if (features.includes('Self-custodial Redefined')) {
			allFeatures.push(
				<CustodialFeature
					key={'CustodialFeature'}
					chainName={chainName}
					foxImg={foxImg}
				/>
			);
		}
		if (features.includes('Jupiter Exchange')) {
			allFeatures.push(<SolanaJupiterExchangeFeature key={'SolanaJupiterExchangeFeature'} />);
		}
		if (features.includes('Multichain Snap')) {
			allFeatures.push(<ShapeshiftMultichainSnapFeature key={'ShapeshiftMultichainSnapFeature'} />);
		}
		if (features.includes('Your keys')) {
			allFeatures.push(<YourKeyFeature key={'YourKeyFeature'} />);
		}
		if (features.includes('Thor Streaming swaps')) {
			allFeatures.push(
				<StreamingSwapsFeature
					key={'StreamingSwapsFeature'}
					chainName={chainName}
				/>
			);
		}
		if (features.includes('Thor Trade')) {
			allFeatures.push(<ThorChainTradeFeature key={'ThorChainTradeFeature'} />);
		}
		if (features.includes('Thor rFox')) {
			allFeatures.push(<RFoxFeature key={'RFoxFeature'} />);
		}
		if (features.includes('Thor Lending')) {
			allFeatures.push(<ThorChainLendingFeature key={'ThorChainLendingFeature'} />);
		}
		if (features.includes('Thor Liquidity Pool')) {
			allFeatures.push(<LiquidityPoolFeature key={'LiquidityPoolFeature'} />);
		}
		if (features.includes('Thor RUNE Pool')) {
			allFeatures.push(<ThorChainRunePoolFeature key={'ThorChainRunePoolFeature'} />);
		}
		if (features.includes('Saver vaults')) {
			allFeatures.push(<SaverVaultFeature key={'SaverVaultFeature'} />);
		}
		return allFeatures;
	}, [features, chainName, foxImg]);

	return (
		<section className={'container flex flex-col'}>
			<h1 className={'mb-6 max-w-[700px] text-[28px] leading-[32px] lg:mb-16 lg:text-7xl'}>
				{'Explore our features.'}
			</h1>

			<div className={'grid gap-2'}>
				<div className={'container grid grid-cols-1 gap-2 lg:grid-cols-6'}>{featuresComponents}</div>
			</div>
		</section>
	);
}
