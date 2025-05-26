/************************************************************************************************
 ** ResourceHero Component:
 **
 ** Hero banner component for resource pages with featured image and optional logo
 ** Displays a full-width banner with configurable content positioning
 **
 ** Features:
 ** - Responsive image handling
 ** - Optional logo overlay with configurable position
 ** - Accessible image attributes
 ** - Proper loading optimization
 **
 ** Usage:
 ** - Import in resource detail pages that need a hero banner
 ** - Configure with image source and optional logo
 ** - Position logo with alignment options
 ************************************************************************************************/

import Image from 'next/image';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TResourceHeroProps = {
	imageSrc: string;
	imageAlt: string;
	className?: string;
	logoSrc?: string;
	logoAlt?: string;
	logoWidth?: number;
	logoHeight?: number;
	logoPosition?: 'left' | 'center' | 'right';
	priority?: boolean;
};

export function ResourceHero({
	imageSrc,
	imageAlt,
	className,
	logoSrc,
	logoAlt,
	logoWidth = 256,
	logoHeight = 256,
	logoPosition = 'right',
	priority = true
}: TResourceHeroProps): ReactNode {
	// Calculate position classes for logo
	const logoPositionClasses = {
		left: 'justify-start pl-16',
		center: 'justify-center',
		right: 'justify-end pr-16'
	};

	return (
		<section className={cl('relative mt-12 flex w-full overflow-hidden rounded-2xl', className)}>
			{/* Hero background image */}
			<Image
				src={imageSrc}
				alt={imageAlt}
				width={2800}
				height={720}
				priority={priority}
				loading={'eager'}
				quality={90}
			/>

			{/* Optional logo overlay */}
			{logoSrc && (
				<div className={cl('absolute inset-0 flex items-center py-6', logoPositionClasses[logoPosition])}>
					<Image
						src={logoSrc}
						alt={logoAlt || 'Logo'}
						width={logoWidth}
						height={logoHeight}
						className={'my-auto size-auto max-h-[256px] max-w-[256px]'}
					/>
				</div>
			)}
		</section>
	);
}
