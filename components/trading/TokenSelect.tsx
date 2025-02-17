'use client';

import Image from 'next/image';
import {useState} from 'react';

import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

type TToken = {
	symbol: string;
	name: string;
	icon: string;
};

export function TokenSelect({
	tokens,
	selectedToken,
	onSelect
}: {
	tokens: TToken[];
	selectedToken: TToken;
	onSelect: (token: TToken) => void;
}): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={'relative'}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={'flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 hover:bg-white/10'}>
				<Image
					src={selectedToken.icon}
					alt={selectedToken.name}
					width={20}
					height={20}
				/>
				<span>{selectedToken.symbol}</span>
				<span className={'ml-1'}>{'▼'}</span>
			</button>

			{isOpen && (
				<div className={'absolute mt-2 w-48 rounded-lg bg-[#2D2D2D] p-2 shadow-lg'}>
					{tokens.map(token => (
						<button
							key={token.symbol}
							onClick={() => {
								onSelect(token);
								setIsOpen(false);
							}}
							className={cl(
								'flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5',
								selectedToken.symbol === token.symbol && 'bg-white/5'
							)}>
							<Image
								src={token.icon}
								alt={token.name}
								width={20}
								height={20}
							/>
							<span>{token.symbol}</span>
							<span className={'ml-auto text-sm text-gray-400'}>{token.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
