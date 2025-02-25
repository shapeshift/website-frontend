import Image from 'next/image';

import type {ReactNode} from 'react';

export function ChainHero(featuredImg: {url: string; width: number; height: number}): ReactNode {
	return (
		<section className={'flex w-full overflow-hidden rounded-2xl'}>
			<Image
				src={featuredImg.url ?? '/templates/templateHeroBg.png'}
				alt={featuredImg.url}
				width={featuredImg.width}
				height={featuredImg.height}
			/>
		</section>
	);
}
