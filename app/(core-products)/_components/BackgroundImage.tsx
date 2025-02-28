/************************************************************************************************
 ** BackgroundImage Component:
 **
 ** A reusable background image component used across product pages
 ** Provides consistent hero background styling for the product section
 **
 ** Features:
 ** - Uses Next.js Image component for optimized loading
 ** - Hidden on mobile devices, only visible on desktop (lg breakpoint)
 ** - Positioned absolutely to cover the entire viewport
 ** - Properly configured for accessibility (decorative image)
 **
 ** Usage:
 ** - Include this component at the top of product page layouts
 ** - Should be the first element in the main container
 ** - Will be automatically hidden on smaller screens
 ************************************************************************************************/

import Image from 'next/image';

import type {ReactNode} from 'react';

export function BackgroundImage(): ReactNode {
	return (
		<div className={'absolute inset-0 hidden lg:block'}>
			<Image
				src={'/heroBg.png'}
				alt={''} // Empty alt for decorative images
				aria-hidden={'true'} // Hide from screen readers
				height={2256}
				width={3840}
				priority // Load with priority as it's above the fold
			/>
		</div>
	);
}
