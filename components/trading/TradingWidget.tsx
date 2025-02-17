'use client';

import {useState} from 'react';

import {ChainSelect} from './ChainSelect';
import {TokenSelect} from './TokenSelect';
import {IconMinus} from '../common/icons/IconMinus';

import type {ReactNode} from 'react';

const SUPPORTED_TOKENS = [
	{symbol: 'ETH', name: 'Ethereum', icon: '/chains/ethereum.svg'},
	{symbol: 'BTC', name: 'Bitcoin', icon: '/chains/bitcoin.svg'},
	{symbol: 'USDT', name: 'Tether', icon: '/chains/usdt.svg'},
	{symbol: 'BNB', name: 'BNB', icon: '/chains/bnb.svg'},
	{symbol: 'SOL', name: 'Solana', icon: '/chains/solana.svg'}
];

const SUPPORTED_CHAINS = [
	{id: 'ethereum', name: 'Ethereum', icon: '/chains/ethereum.svg'},
	{id: 'bitcoin', name: 'Bitcoin', icon: '/chains/bitcoin.svg'},
	{id: 'binance', name: 'BNB Chain', icon: '/chains/bnb.svg'},
	{id: 'solana', name: 'Solana', icon: '/chains/solana.svg'}
];

export function TradingWidget(): ReactNode {
	const [fromToken, setFromToken] = useState(SUPPORTED_TOKENS[0]);
	const [toToken, setToToken] = useState(SUPPORTED_TOKENS[1]);
	const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0]);
	const [toChain, setToChain] = useState(SUPPORTED_CHAINS[0]);
	const [amount, setAmount] = useState('0');

	return (
		<div className={'flex w-[460px] flex-col rounded-2xl bg-[#1A1B1F] p-6'}>
			<div className={'mb-6 flex items-center justify-between'}>
				<h2 className={'text-2xl font-bold'}>{'Trade/Bridge'}</h2>
				<button className={'rounded-full p-2 hover:bg-white/5'}>
					<IconMinus className={'text-gray-400'} />
				</button>
			</div>

			<div className={'mb-4'}>
				<div className={'mb-2 text-sm text-gray-400'}>{'Pay With'}</div>
				<div className={'flex items-center gap-2'}>
					<TokenSelect
						tokens={SUPPORTED_TOKENS}
						selectedToken={fromToken}
						onSelect={setFromToken}
					/>
					<span className={'text-sm text-gray-400'}>{'on'}</span>
					<ChainSelect
						chains={SUPPORTED_CHAINS}
						selectedChain={fromChain}
						onSelect={setFromChain}
					/>
				</div>
				<input
					type={'number'}
					value={amount}
					min={0}
					onChange={e => setAmount(e.target.value)}
					className={'mt-2 w-full bg-transparent text-4xl outline-none placeholder:text-gray-600'}
					placeholder={'0'}
				/>
				<div className={'mt-1 text-sm text-gray-400'}>{`≈ $${amount || '0.00'}`}</div>
			</div>

			<div className={'mb-4'}>
				<div className={'mb-2 text-sm text-gray-400'}>{'You Get'}</div>
				<div className={'flex items-center gap-2'}>
					<TokenSelect
						tokens={SUPPORTED_TOKENS}
						selectedToken={toToken}
						onSelect={setToToken}
					/>
					<span className={'text-sm text-gray-400'}>{'on'}</span>
					<ChainSelect
						chains={SUPPORTED_CHAINS}
						selectedChain={toChain}
						onSelect={setToChain}
					/>
				</div>
				<div className={'mt-4 text-4xl'}>{'0'}</div>
				<div className={'mt-1 text-sm text-gray-400'}>{'≈ $0.00'}</div>
			</div>

			<button className={'w-full rounded-full bg-blue py-4 font-medium hover:bg-blueHover'}>
				{'Get Started'}
			</button>
		</div>
	);
}
