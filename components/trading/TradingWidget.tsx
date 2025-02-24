'use client';

import {useCallback, useEffect, useState} from 'react';

import {useDebounce} from '@/hooks/useDebounce';

import {ChainSelect} from './ChainSelect';
import {TokenSelect} from './TokenSelect';
import {IconArrow} from '../common/icons/IconArrow';
import {IconQuestion} from '../common/icons/IconQuestion';
import {SUPPORTED_CHAINS, SUPPORTED_TOKENS, TOKEN_CHAIN_SUPPORT} from '../constants';
import {cl} from '../utils/cl';
import {formatNumber} from '../utils/formatNumber';

import type {TChain} from './ChainSelect';
import type {TToken} from './TokenSelect';
import type {ReactNode} from 'react';

export function TradingWidget(): ReactNode {
	const [fromToken, setFromToken] = useState<TToken>(SUPPORTED_TOKENS[0]);
	const [toToken, setToToken] = useState<TToken>(SUPPORTED_TOKENS[1]);
	const [fromChain, setFromChain] = useState<TChain>(SUPPORTED_CHAINS[2]);
	const [toChain, setToChain] = useState<TChain>(SUPPORTED_CHAINS[0]);
	const [amount, setAmount] = useState(0);
	const [outputAmount, setOutputAmount] = useState({amount: 0, isNative: true});
	const [openSelect, setOpenSelect] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const debouncedAmount = useDebounce(amount, 500);

	useEffect(() => {
		if (isError) {
			setOutputAmount({amount: 0, isNative: true});
		}
	}, [isError]);

	const fetchFromProxy = useCallback((): void => {
		setIsError(false);
		try {
			setIsLoading(true);
			fetch(
				`https://api.proxy.shapeshift.com/api/v1/zrx/swap/permit2/price?chainId=${fromChain.chainId}&buyToken=${toToken.tokenAddress}&sellToken=${fromToken.tokenAddress}&sellAmount=${amount * 10 ** (fromToken.decimals || 6)}&swapFeeBps=68&swapFeeToken=${fromToken.tokenAddress}&slippageBps=20&swapFeeRecipient=0x90a48d5cf7343b08da12e067680b4c6dbfe551be&feeRecipientTradeSurplus=0x90a48d5cf7343b08da12e067680b4c6dbfe551be`
			)
				.then(async res => res.json())
				.then(data => {
					console.log(data);
					setOutputAmount({amount: data.buyAmount, isNative: true});
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	}, [amount, fromChain.chainId, fromToken.decimals, fromToken.tokenAddress, toToken.tokenAddress]);

	const fetchFromDaemon = useCallback((): void => {
		setIsError(false);
		console.log(amount * 10 ** fromToken.decimals);
		try {
			setIsLoading(true);
			fetch(
				`https://daemon.thorchain.shapeshift.com/lcd/thorchain/quote/swap?amount=${amount * 10 ** (fromToken.decimals || 6)}&from_asset=${fromChain.requestKey}.${fromToken.requestKey}&to_asset=${toChain.requestKey}.${toToken.requestKey}&affiliate_bps=64&affiliate=ss&streaming_interval=1`
			)
				.then(async res => res.json())
				.then(data => {
					console.log(data);
					setOutputAmount({amount: data.expected_amount_out, isNative: true});
					if (!data.expected_amount_out) {
						setIsError(true);
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	}, [
		amount,
		fromChain.requestKey,
		fromToken.decimals,
		fromToken.requestKey,
		toChain.requestKey,
		toToken.requestKey
	]);

	const fetchFromChainFlip = useCallback((): void => {
		setIsError(false);
		setIsLoading(true);
		try {
			fetch(
				`https://chainflip-broker.io/quotes-native?apiKey=09bc0796ff40435482c0a54fa6ae2784&sourceAsset=${fromToken.symbol}.${fromChain.requestKey}&destinationAsset=${toToken.symbol}.${toChain.requestKey}&amount=${Number(debouncedAmount) * 10 ** 8}&commissionBps=63`
			)
				.then(async res => res.json())
				.then(data => {
					setOutputAmount({amount: data[0]?.egressAmount, isNative: false});
					if (!data?.[0]?.egressAmount) {
						setIsError(true);
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	}, [fromToken.symbol, fromChain.requestKey, toToken.symbol, toChain.requestKey, debouncedAmount]);

	useEffect(() => {
		if (debouncedAmount === 0) {
			return;
		}

		if (fromChain.id === 'solana' || toChain.id === 'solana') {
			return fetchFromChainFlip();
		}
		if (
			(fromChain.name === 'Ethereum' && fromToken.symbol === 'BNBETH') ||
			(toChain.name === 'Ethereum' && toToken.symbol === 'BNBETH')
		) {
			return fetchFromProxy();
		}
		return fetchFromDaemon();
	}, [
		debouncedAmount,
		fetchFromChainFlip,
		fetchFromDaemon,
		fetchFromProxy,
		fromChain.id,
		fromChain.name,
		fromToken.symbol,
		toChain.id,
		toChain.name,
		toToken.symbol
	]);

	// Get supported chains for a token
	const getSupportedChains = (token: TToken): TChain[] => {
		const supportedChainIds = TOKEN_CHAIN_SUPPORT[token.symbol];
		return SUPPORTED_CHAINS.filter(chain => supportedChainIds?.includes(chain.id));
	};

	const handleTokenSelect = (token: TToken, isFrom: boolean): void => {
		const supportedChains = getSupportedChains(token);
		if (isFrom) {
			setFromToken(token);
			if (supportedChains.length === 1) {
				setFromChain(supportedChains[0]);
			} else if (!supportedChains.find(chain => chain.id === fromChain.id)) {
				setFromChain(supportedChains[0]);
			}
		} else {
			setToToken(token);
			if (supportedChains.length === 1) {
				setToChain(supportedChains[0]);
			} else if (!supportedChains.find(chain => chain.id === toChain.id)) {
				setToChain(supportedChains[0]);
			}
		}
	};

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		if (/^\d*\.?\d*$/.test(value)) {
			if (value === '0' && amount === 0) {
				return;
			}
			if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
				setAmount(Number(value.slice(1)));
				return;
			}
			setAmount(Number(value));
		}
	};

	const handleSwap = (): void => {
		const tempToken = fromToken;
		const tempChain = fromChain;

		setFromToken(toToken);
		setFromChain(toChain);
		setToToken(tempToken);
		setToChain(tempChain);
	};

	return (
		<div className={'flex w-[400px] flex-col rounded-2xl bg-[#17191c]'}>
			<div className={'mb-6 flex items-center justify-between p-6'}>{'Trade/Bridge'}</div>

			<div className={'mb-2 px-6'}>
				<div className={'mb-2 text-sm'}>{'Pay With'}</div>
				<div className={'flex items-center gap-2'}>
					<TokenSelect
						tokens={SUPPORTED_TOKENS}
						selectedToken={fromToken}
						onSelectAction={token => handleTokenSelect(token, true)}
						isOpen={openSelect === 'fromToken'}
						setIsOpen={isOpen => setOpenSelect(isOpen ? 'fromToken' : null)}
					/>
					<span className={'text-sm text-gray-400'}>{'on'}</span>
					<ChainSelect
						chains={getSupportedChains(fromToken)}
						selectedChain={fromChain}
						onSelectAction={setFromChain}
						disabled={getSupportedChains(fromToken).length === 1}
						isOpen={openSelect === 'fromChain'}
						setIsOpenAction={isOpen => setOpenSelect(isOpen ? 'fromChain' : null)}
					/>
				</div>
				<input
					type={'text'}
					value={amount}
					inputMode={'decimal'}
					onChange={handleAmountChange}
					className={'mt-4 w-full bg-transparent text-2xl outline-none placeholder:text-gray-600'}
					placeholder={'0'}
				/>
			</div>

			<div className={'relative flex items-center justify-center p-2'}>
				<div
					className={cl(
						'relative z-10 group rounded-full border p-3 cursor-pointer',
						isLoading
							? 'bg-[#17191c] border-transparent z-10 before:absolute before:inset-0 before:animate-spin before:rounded-full before:border before:border-transparent before:border-t-blue'
							: 'border-white/5 bg-[#17191c] hover:bg-[#17191c]'
					)}
					onClick={handleSwap}>
					<div className={'relative z-20'}>
						<IconArrow className={'size-3 rotate-[135deg] text-white/50 group-hover:text-white'} />
					</div>
				</div>
				<div className={'absolute top-1/2 h-px w-full -translate-y-1/2 border-t border-white/5'}></div>
			</div>

			<div className={'mb-4 px-6'}>
				<div className={'mb-2 text-sm text-gray-400'}>{'You Get'}</div>
				<div className={'flex items-center gap-2'}>
					<TokenSelect
						tokens={SUPPORTED_TOKENS}
						selectedToken={toToken}
						onSelectAction={token => handleTokenSelect(token, false)}
						isOpen={openSelect === 'toToken'}
						setIsOpen={isOpen => setOpenSelect(isOpen ? 'toToken' : null)}
					/>
					<span className={'text-sm text-gray-400'}>{'on'}</span>
					<ChainSelect
						chains={getSupportedChains(toToken)}
						selectedChain={toChain}
						onSelectAction={setToChain}
						disabled={getSupportedChains(toToken).length === 1}
						isOpen={openSelect === 'toChain'}
						setIsOpenAction={isOpen => setOpenSelect(isOpen ? 'toChain' : null)}
					/>
				</div>
				<div className={'mt-4 text-2xl'}>
					{isLoading ? (
						<div className={'relative overflow-hidden rounded bg-white/5 text-transparent'}>
							<div className={'relative z-0'}>{'0000.0000'}</div>
							<div
								className={
									'absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent'
								}
							/>
						</div>
					) : (
						<div>{formatNumber(outputAmount.amount, outputAmount.isNative, fromToken.decimals)}</div>
					)}
				</div>
			</div>
			{isError && (
				<div className={'flex items-center gap-2 border-t border-t-white/5 p-4 text-gray-500'}>
					<div className={'flex size-5 items-center justify-center rounded-[100%] bg-gray-500'}>
						<IconQuestion className={'size-2 text-white'} />
					</div>
					<span className={'text-sm text-gray-400'}>{'No rate available.'}</span>
				</div>
			)}

			<div className={'w-full rounded-b-2xl border-t border-t-white/5 bg-[#1e2024] px-5 py-4'}>
				<button className={'w-full rounded-2xl bg-blue py-4 font-medium hover:bg-blueHover'}>
					{'Get Started'}
				</button>
			</div>
		</div>
	);
}
