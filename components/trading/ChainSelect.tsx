'use client';

import Image from 'next/image';
import {useState} from 'react';

import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

type TChain = {
	id: string;
	name: string;
	icon: string;
};

export function ChainSelect({
	chains,
	selectedChain,
	onSelect
}: {
	chains: TChain[];
	selectedChain: TChain;
	onSelect: (chain: TChain) => void;
}): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={'relative'}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={'flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 hover:bg-white/10'}>
				<Image
					src={selectedChain.icon}
					alt={selectedChain.name}
					width={20}
					height={20}
				/>
				<span>{selectedChain.name}</span>
				<span className={'ml-1'}>{'▼'}</span>
			</button>

			{isOpen && (
				<div className={'absolute mt-2 w-48 rounded-lg bg-[#2D2D2D] p-2 shadow-lg'}>
					{chains.map(chain => (
						<button
							key={chain.id}
							onClick={() => {
								onSelect(chain);
								setIsOpen(false);
							}}
							className={cl(
								'flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5',
								selectedChain.id === chain.id ? 'bg-white/5' : ''
							)}>
							<Image
								src={chain.icon}
								alt={chain.name}
								width={20}
								height={20}
							/>
							<span>{chain.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
