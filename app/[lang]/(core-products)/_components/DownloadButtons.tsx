/************************************************************************************************
 ** DownloadButtons Component:
 **
 ** Displays app store download buttons for the mobile application
 ** Used specifically by the Mobile App product page
 **
 ** Features:
 ** - Displays App Store and Google Play buttons based on data from Strapi
 ** - Responsive layout that works on both mobile and desktop
 ** - Uses optimized Next.js Image component for button images
 **
 ** Usage:
 ** - Import and use on the Mobile App product page
 ** - Pass an array of button data from Strapi
 ** - Buttons will open app store links in a new tab
 ************************************************************************************************/

import Image from 'next/image';

import {LocalizedLink} from '@/app/[lang]/_components/LocalizedLink';

import type {TDownloadButton} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

type TDownloadButtonsProps = {
	buttons: TDownloadButton[];
};

export function DownloadButtons({buttons}: TDownloadButtonsProps): ReactNode {
	if (!buttons || buttons.length === 0) {
		return null;
	}

	return (
		<div className={'flex gap-4'}>
			{buttons.map(button => (
				<LocalizedLink
					href={button.url ?? ''}
					target={'_blank'}
					className={'h-[40px] w-[130px]'}
					key={button.id}>
					<Image
						src={`/${button.variant}.png`}
						alt={button.variant === 'appstore' ? 'Download on App Store' : 'Get it on Google Play'}
						width={390}
						height={120}
					/>
				</LocalizedLink>
			))}
		</div>
	);
}
