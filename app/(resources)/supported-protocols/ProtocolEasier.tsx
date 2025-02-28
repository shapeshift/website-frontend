import type {ReactNode} from 'react';

export function ProtocolEasier({protocolName}: {protocolName: string}): ReactNode {
	return (
		<div
			className={
				'container col-span-1 mt-2 grid aspect-[1400/476] h-[476px] grid-cols-3 gap-4 overflow-hidden rounded-2xl bg-secondBg p-6 lg:col-span-6 lg:p-10'
			}
			style={{
				backgroundImage: "url('/supported-chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{`${protocolName} shouldn’t be difficult`}</p>
					<p className={'pb-4 text-base text-secondary/50'}>
						{`Gone are the days of juggling five transactions across three different interfaces just to use ${protocolName}.`}
					</p>
					<p className={'text-base text-secondary/50'}>{'ShapeShift fixes this with Shifts.'}</p>
				</div>
			</div>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{'Why Shifts?'}</p>
					<p className={'pb-4 text-base text-secondary/50'}>
						{`Manage, find opportunities and reallocate your positions in ${protocolName} with a single click.`}
					</p>
					<p className={'pb-4 text-base text-secondary/50'}>
						{
							'Shifts automates the process of swapping any tokens: Liquidity pool tokens, Vault tokens, Liquid staking derivatives (LSDs), Yield tokens, etc.'
						}
					</p>
					<p className={'text-base text-secondary/50'}>
						{'Shifts make it easier to earn more with your investments.'}
					</p>
				</div>
			</div>
			<div className={'flex w-full items-center justify-start px-20'}>
				<p className={'text-[40px] leading-[48px] text-white'}>{"It's easier with ShapeShift"}</p>
			</div>
		</div>
	);
}
