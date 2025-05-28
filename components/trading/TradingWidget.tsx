'use client';

import {useCallback, useEffect, useState} from 'react';

import {useDebounce} from '@/hooks/useDebounce';

import {ChainSelect} from './ChainSelect';
import {TokenSelect} from './TokenSelect';
import {IconArrow} from '../common/icons/IconArrow';
import {IconQuestion} from '../common/icons/IconQuestion';
import {LocalizedLink} from '../common/LocalizedLink';
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
	const [amount, setAmount] = useState<string>('0');
	const [outputAmount, setOutputAmount] = useState({
		amount: 0,
		isNative: true
	});
	const [openSelect, setOpenSelect] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const debouncedAmount = useDebounce(amount);

	useEffect(() => {
		if (error) {
			setOutputAmount({amount: 0, isNative: true});
		}
	}, [error, fromChain.id, fromToken.symbol, toChain.id, toToken.symbol]);

	const fetchFromDaemon = useCallback((): void => {
		setError('');
		try {
			setIsLoading(true);
			const numericAmount = Number(debouncedAmount);
			fetch(
				`https://daemon.thorchain.shapeshift.com/lcd/thorchain/quote/swap?amount=${numericAmount * 10 ** (fromToken.decimals[toToken.symbol?.toLowerCase() || 'eth'] || 6)}&from_asset=${fromChain.requestKey}.${fromToken.requestKey}&to_asset=${toChain.requestKey}.${toToken.requestKey}&affiliate_bps=64&affiliate=ss&streaming_interval=1`
			)
				.then(async res => res.json())
				.then(data => {
					setOutputAmount({amount: data.expected_amount_out, isNative: true});
					if (!data.expected_amount_out) {
						setError('No rate available');
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setError('No rate available');
			setIsLoading(false);
		}
	}, [
		debouncedAmount,
		fromChain.requestKey,
		fromToken.decimals,
		fromToken.requestKey,
		toChain.requestKey,
		toToken.requestKey,
		toToken.symbol
	]);

	const fetchFromChainFlip = useCallback((): void => {
		setError('');
		setIsLoading(true);
		try {
			const numericAmount = Number(debouncedAmount);
			fetch(
				`https://chainflip-broker.io/quotes-native?apiKey=09bc0796ff40435482c0a54fa6ae2784&sourceAsset=${fromToken.symbol}.${fromChain.requestKey}&destinationAsset=${toToken.symbol}.${toChain.requestKey}&amount=${numericAmount * 10 ** (fromToken.decimals[toToken.symbol?.toLowerCase() || 'eth'] || 6)}&commissionBps=63`
			)
				.then(async res => res.json())
				.then(data => {
					setOutputAmount({
						amount: data[0]?.egressAmountNative,
						isNative: true
					});
					if (!data?.[0]?.egressAmountNative) {
						setError('No rate available');
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setError('No rate available');
			setIsLoading(false);
		}
	}, [
		debouncedAmount,
		fromToken.symbol,
		fromToken.decimals,
		fromChain.requestKey,
		toToken.symbol,
		toChain.requestKey
	]);

	useEffect(() => {
		if (debouncedAmount === '0' || debouncedAmount === '') {
			return;
		}

		if (toToken.symbol === fromToken.symbol && toChain.id === fromChain.id) {
			return setError('Please select different tokens');
		}
		if (
			(fromChain.id === 'solana' && toChain.id === 'bitcoin') ||
			(fromToken.symbol === 'SOL' && toToken.symbol === 'ETH') ||
			(fromToken.symbol === 'ETH' && toToken.symbol === 'SOL')
		) {
			return setError('No rate available');
		}

		if (fromChain.id === 'solana' || toChain.id === 'solana') {
			return fetchFromChainFlip();
		}

		return fetchFromDaemon();
	}, [
		debouncedAmount,
		fetchFromChainFlip,
		fetchFromDaemon,
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
		setOutputAmount({amount: 0, isNative: true});
		const value = e.target.value;
		// Allow decimal numbers with up to 18 decimal places
		if (/^\d*\.?\d{0,18}$/.test(value)) {
			if (value === '') {
				setAmount('0');
				return;
			}
			if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
				setAmount(value.slice(1));
				return;
			}
			setAmount(value);
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

	const generateTradeUrl = useCallback((): string => {
		const baseUrl = 'https://app.shapeshift.com/#/trade';

		// Map chain IDs to their respective parameters
		const chainParams: Record<string, string> = {
			bitcoin: 'bip122:000000000019d6689c085ae165831e93/slip44:0',
			ethereum: 'eip155:1/slip44:60',
			base: 'eip155:8453/slip44:60',
			solana: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501'
		};

		// Map token decimals
		const tokenDecimals: Record<string, number> = {
			USDT: 6,
			BTC: 8,
			ETH: 18,
			SOL: 9
		};

		// Get chain parameters
		const fromChainParam = chainParams[fromChain.id] || '';
		const toChainParam = chainParams[toChain.id] || '';

		// Format amount in smallest unit using the correct decimals for the source token
		const decimals = tokenDecimals[fromToken.symbol] || 18;
		const amountInSmallestUnit = Number(amount) > 0 ? Math.floor(Number(amount) * 10 ** decimals).toString() : '0';

		// For SOL to USDT
		if (fromToken.symbol === 'SOL' && toToken.symbol === 'USDT') {
			return `${baseUrl}/eip155:1/erc20:0xdac17f958d2ee523a2206206994597c13d831ec7/${fromChainParam}/${amountInSmallestUnit}`;
		}

		// For USDT to BTC
		if (fromToken.symbol === 'USDT' && toToken.symbol === 'BTC') {
			return `${baseUrl}/${toChainParam}/eip155:1/erc20:0xdac17f958d2ee523a2206206994597c13d831ec7/${amountInSmallestUnit}`;
		}

		// For BTC to USDT
		if (fromToken.symbol === 'BTC' && toToken.symbol === 'USDT') {
			return `${baseUrl}/eip155:1/erc20:0xdac17f958d2ee523a2206206994597c13d831ec7/${fromChainParam}/${amountInSmallestUnit}`;
		}

		// For all other tokens, use the standard format
		return `${baseUrl}/${toChainParam}/${fromChainParam}/${amountInSmallestUnit}`;
	}, [fromChain.id, toChain.id, amount, fromToken.symbol, toToken.symbol]);

	return (
		<div className={'flex max-w-[400px] flex-col rounded-2xl bg-[#17191c] lg:w-[400px]'}>
			<div className={'flex items-center justify-between p-4 lg:p-6'}>{'Trade/Bridge'}</div>

			<div className={'mb-2 px-6'}>
				<div className={'mb-2 text-sm'}>{'Pay With'}</div>
				<div className={'flex items-center gap-2'}>
					<TokenSelect
						tokens={SUPPORTED_TOKENS}
						selectedToken={fromToken}
						onSelectAction={token => handleTokenSelect(token, true)}
						isOpen={openSelect === 'fromToken'}
						setIsOpenAction={isOpen => setOpenSelect(isOpen ? 'fromToken' : null)}
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

			<div className={'relative flex items-center justify-center px-2 lg:p-2'}>
				<div
					className={cl(
						'relative z-10 group rounded-full border p-3 cursor-pointer',
						isLoading
							? 'bg-[#17191c] border-transparent z-10 before:absolute before:inset-0 before:animate-spin before:rounded-full before:border before:border-transparent before:border-t-blue'
							: 'border-white/5 bg-[#17191c] hover:bg-[#17191c]'
					)}
					onClick={handleSwap}>
					<div className={'relative z-10'}>
						<IconArrow className={'size-3 rotate-[135deg] text-white/50 group-hover:text-white'} />
					</div>
				</div>
				<div className={'absolute top-1/2 h-px w-full -translate-y-1/2 border-t border-white/5'} />
			</div>

			<div className={'mb-4 px-6'}>
				<div className={'mb-2 text-sm text-gray-400'}>{'You Get'}</div>
				<div className={'flex items-center gap-2'}>
					<TokenSelect
						tokens={SUPPORTED_TOKENS}
						selectedToken={toToken}
						onSelectAction={token => handleTokenSelect(token, false)}
						isOpen={openSelect === 'toToken'}
						setIsOpenAction={isOpen => setOpenSelect(isOpen ? 'toToken' : null)}
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
						<div>
							{formatNumber(
								outputAmount.amount,
								outputAmount.isNative,
								toToken.decimals[fromToken.symbol?.toLowerCase() || 'eth'] || 6
							)}
						</div>
					)}
				</div>
			</div>
			{error && (
				<div className={'flex items-center gap-2 border-t border-t-white/5 p-4 text-gray-500'}>
					<div className={'flex size-5 items-center justify-center rounded-[100%] bg-gray-500'}>
						<IconQuestion className={'size-2 text-white'} />
					</div>
					<span className={'text-sm text-gray-400'}>{error}</span>
				</div>
			)}

			<div className={'w-full rounded-b-2xl border-t border-t-white/5 bg-[#1e2024] px-4 py-3 lg:px-5 lg:py-4'}>
				<LocalizedLink
					href={generateTradeUrl()}
					rel={'noopener noreferrer'}>
					<button className={'w-full rounded-2xl bg-blue py-4 font-medium hover:bg-blueHover'}>
						{'Get Started'}
					</button>
				</LocalizedLink>
			</div>
		</div>
	);
}
