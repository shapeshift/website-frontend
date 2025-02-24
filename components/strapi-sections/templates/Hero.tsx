import Image from 'next/image';

import type {TTemplateHeroSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export function Hero({data}: {data: TTemplateHeroSection}): ReactNode {
	if (!data) {
		return null;
	}

	return (
		<section className={'flex w-full overflow-hidden rounded-2xl'}>
			<Image
				src={data.image.url ?? '/templates/templateHeroBg.png'}
				alt={data.image.url}
				width={data.image.width}
				height={data.image.height}
			/>
		</section>
	);
}
