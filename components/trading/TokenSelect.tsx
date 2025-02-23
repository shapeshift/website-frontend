'use client';

import Image from 'next/image';

import {IconBack} from '../common/icons/IconBack';
import {IconCheck} from '../common/icons/IconCheck';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export type TToken = {
	symbol: string;
	name: string;
	icon: string;
	sublogo?: string;
	slug: string;
	decimals: number;
	requestKey?: string;
	tokenAddress?: string;
};

export function TokenSelect({
	tokens,
	selectedToken,
	onSelectAction,
	isOpen,
	setIsOpen
}: {
	tokens: TToken[];
	selectedToken: TToken;
	onSelectAction: (token: TToken) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}): ReactNode {
	return (
		<div className={'relative'}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={'flex items-center gap-2 rounded-full bg-[#a1bdd914] p-2 hover:bg-white/10'}>
				<div className={'relative flex size-6 items-center justify-center rounded-[100%]'}>
					{selectedToken.sublogo && (
						<Image
							src={selectedToken.sublogo}
							alt={selectedToken.name}
							width={8}
							height={8}
							className={'absolute left-0 top-0'}
						/>
					)}
					<Image
						src={selectedToken.icon}
						alt={selectedToken.name}
						width={24}
						height={24}
					/>
				</div>
				<span>{selectedToken.symbol}</span>
				<IconBack className={'size-4 -rotate-90'} />
			</button>

			{isOpen && (
				<div className={'absolute z-20 mt-2 w-max rounded-lg bg-[#22272B] p-2 shadow-lg'}>
					{tokens.map(token => (
						<button
							key={token.slug}
							onClick={() => {
								onSelectAction(token);
								setIsOpen(false);
							}}
							className={cl(
								'flex w-full items-center gap-4 rounded-lg px-3 py-2 hover:bg-white/5',
								selectedToken.slug === token.slug ? 'bg-white/5' : ''
							)}>
							{selectedToken.name === token.name ? (
								<IconCheck className={'size-4 font-normal'} />
							) : (
								<div className={'size-4'} />
							)}
							<div className={'relative flex size-6 items-center justify-center rounded-[100%]'}>
								{token.sublogo && (
									<Image
										src={token.sublogo}
										alt={token.name}
										width={8}
										height={8}
										className={'absolute left-0 top-0'}
									/>
								)}
								<Image
									src={token.icon}
									alt={token.name}
									width={24}
									height={24}
								/>
							</div>
							<span>{token.symbol}</span>
							<span className={'ml-auto text-sm text-gray-400'}>{token.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
