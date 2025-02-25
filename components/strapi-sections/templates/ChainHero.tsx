import Image from 'next/image';

import type {ReactNode} from 'react';

export function ChainHero(props: {url: string; width: number; height: number; name: string}): ReactNode {
	return (
		<section className={'relative flex w-full overflow-hidden rounded-2xl'}>
			<Image
				src={'/supported-wallets/hero.jpg'}
				alt={'hero'}
				width={2800}
				height={720}
			/>
			<div className={'absolute inset-x-0 bottom-0 flex items-center justify-end pr-16 pt-6'}>
				<Image
					src={props.url}
					alt={props.name}
					width={props.width}
					height={props.height}
					className={'my-auto h-full max-h-[220px] w-auto'}
				/>
			</div>
		</section>
	);
}
