import type {ReactNode} from 'react';

export function ProtocolEasier({cards}: {cards: {title: string; description?: string}[]}): ReactNode {
	if (cards.length === 0) {
		return null;
	}

	return (
		<div
			className={
				'container col-span-1 mt-2 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-secondBg p-6 lg:col-span-6 lg:aspect-[1400/476] lg:h-[476px] lg:grid-cols-3 lg:p-10'
			}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{cards[0]?.title}</p>
					<p className={'pb-4 text-base text-secondary/50'}>{cards[0]?.description}</p>
				</div>
			</div>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{cards[1]?.title}</p>
					<p className={'pb-4 text-base text-secondary/50'}>{cards[1]?.description}</p>
				</div>
			</div>
			<div className={'flex w-full items-center justify-start px-20'}>
				<p className={'text-[40px] leading-[48px] text-white'}>{cards[2]?.title}</p>
			</div>
		</div>
	);
}
