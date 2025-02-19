'use client';

import {useState} from 'react';

import {ChainSelect} from './ChainSelect';
import {TokenSelect} from './TokenSelect';
import {IconArrow} from '../common/icons/IconArrow';
import {SUPPORTED_CHAINS, SUPPORTED_TOKENS, TOKEN_CHAIN_SUPPORT} from '../constants';

import type {TChain} from './ChainSelect';
import type {TToken} from './TokenSelect';
import type {ReactNode} from 'react';

export function TradingWidget(): ReactNode {
	const [fromToken, setFromToken] = useState(SUPPORTED_TOKENS[0]);
	const [toToken, setToToken] = useState(SUPPORTED_TOKENS[0]);
	const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0]);
	const [toChain, setToChain] = useState(SUPPORTED_CHAINS[0]);
	const [amount, setAmount] = useState('0');

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
			if (value === '0' && amount === '0') {
				return;
			}
			if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
				setAmount(value.slice(1));
				return;
			}
			setAmount(value);
		}
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
					/>
					<span className={'text-sm text-gray-400'}>{'on'}</span>
					<ChainSelect
						chains={getSupportedChains(fromToken)}
						selectedChain={fromChain}
						onSelectAction={setFromChain}
						disabled={getSupportedChains(fromToken).length === 1}
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
				<div className={'z-10 rounded-full border border-white/5 bg-[#17191c] p-3'}>
					<IconArrow className={'size-3 rotate-[135deg] text-white/50'} />
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
					/>
					<span className={'text-sm text-gray-400'}>{'on'}</span>
					<ChainSelect
						chains={getSupportedChains(toToken)}
						selectedChain={toChain}
						onSelectAction={setToChain}
						disabled={getSupportedChains(toToken).length === 1}
					/>
				</div>
				<div className={'mt-4 text-2xl'}>{'0'}</div>
			</div>

			<div className={'w-full rounded-b-2xl border-t border-t-white/5 bg-[#1e2024] px-5 py-4'}>
				<button className={'w-full rounded-2xl bg-blue py-4 font-medium hover:bg-blueHover'}>
					{'Get Started'}
				</button>
			</div>
		</div>
	);
}
