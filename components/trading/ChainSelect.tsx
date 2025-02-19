'use client';

import Image from 'next/image';
import {useState} from 'react';

import {IconBack} from '../common/icons/IconBack';
import {IconCheck} from '../common/icons/IconCheck';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export type TChain = {
	id: string;
	name: string;
	icon: string;
};

export function ChainSelect({
	chains,
	selectedChain,
	onSelectAction,
	disabled
}: {
	chains: TChain[];
	selectedChain: TChain;
	onSelectAction: (chain: TChain) => void;
	disabled?: boolean;
}): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={'group relative'}>
			<button
				onClick={() => !disabled && setIsOpen(!isOpen)}
				className={cl(
					'flex items-center gap-2 rounded-full bg-[#a1bdd914] p-2',
					disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
				)}>
				<Image
					src={selectedChain?.icon}
					alt={selectedChain?.name}
					width={20}
					height={20}
				/>
				<span>{selectedChain?.name}</span>
				{!disabled && <IconBack className={'size-4 -rotate-90'} />}
			</button>

			{/* Tooltip */}
			{disabled && (
				<div
					className={
						'absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#22272B] px-3 py-2 text-sm opacity-0 transition-opacity group-hover:opacity-100'
					}>
					{`This asset is only available on ${selectedChain?.name}`}
					<div className={'absolute -top-1 left-1/2 size-2 -translate-x-1/2 -rotate-45 bg-[#22272B]'} />
				</div>
			)}

			{isOpen && (
				<div className={'absolute z-20 mt-2 w-max rounded-lg bg-[#22272B] p-2 shadow-lg'}>
					{chains.map(chain => (
						<button
							key={chain.id}
							onClick={() => {
								onSelectAction(chain);
								setIsOpen(false);
							}}
							className={cl(
								'flex w-full items-center gap-3 justify-start rounded-lg px-4 py-3 hover:bg-white/5',
								selectedChain?.id === chain.id ? 'bg-white/5' : ''
							)}>
							{selectedChain?.id === chain.id ? (
								<IconCheck className={'size-4 font-normal'} />
							) : (
								<div className={'size-4'} />
							)}
							<Image
								src={chain.icon}
								alt={chain.name}
								width={24}
								height={24}
							/>
							<span>{chain.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
