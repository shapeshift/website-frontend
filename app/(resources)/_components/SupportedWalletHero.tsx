import Image from 'next/image';

import type {ReactNode} from 'react';

export function SupportedWalletHero(props: {url: string; width: number; height: number; name: string}): ReactNode {
	return (
		<section className={'relative flex w-full overflow-hidden rounded-2xl'}>
			<Image
				src={'/supported-wallets/hero.jpg'}
				alt={''}
				width={2800}
				height={720}
			/>
			<div className={'absolute inset-0 flex items-center justify-end py-6 pr-16'}>
				<Image
					src={props.url}
					alt={props.name}
					width={props.width}
					height={props.height}
					className={'my-auto h-full w-auto'}
				/>
			</div>
		</section>
	);
}
