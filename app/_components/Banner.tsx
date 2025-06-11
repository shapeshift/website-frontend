import Image from 'next/image';

import {Button} from '@/app/_components/Button';

import {LocalizedLink} from './LocalizedLink';
import {
	bannerLeftButtonTitle,
	bannerLeftTitle,
	bannerMobileSubtitle,
	bannerRightTitle,
	dAppUrl
} from '../_utils/constants';

import type {ReactNode} from 'react';

export function Banner(): ReactNode {
	return (
		<div
			className={
				'relative mb-40 w-full flex-col justify-between overflow-hidden rounded-2xl px-6 py-10 lg:flex lg:flex-row lg:p-24 lg:pr-6'
			}>
			<Image
				src={'/bannerBg.png'}
				alt={'banner'}
				width={2800}
				height={952}
				className={'absolute inset-0 -z-10 size-full object-cover'}
			/>
			<div className={'flex flex-col lg:max-w-[511px]'}>
				<h2 className={'mb-24 text-center text-[40px] leading-[40px] lg:text-left'}>{bannerLeftTitle}</h2>

				<div className={'flex gap-4'}>
					<Button
						variant={'blue'}
						title={bannerLeftButtonTitle}
						href={dAppUrl}
						className={'mb-[44px] !w-full lg:mb-0 lg:!w-auto'}
					/>
				</div>
			</div>
			<p className={'mb-4 text-center lg:mb-0 lg:hidden'}>{bannerMobileSubtitle}</p>

			<div className={'flex flex-col lg:max-w-[511px]'}>
				<h2 className={'mb-10 hidden text-left text-[40px] leading-[40px] lg:block'}>{bannerRightTitle}</h2>
				<div className={'flex justify-center gap-6 lg:justify-start'}>
					<div className={'hidden size-[121px] lg:block'}>
						<Image
							src={'/qrcode.png'}
							alt={'qrcode'}
							width={360}
							height={360}
						/>
					</div>

					<div className={'mb-[180px] flex items-center justify-center gap-3 lg:mb-0 lg:flex-col'}>
						<LocalizedLink
							href={'/apple-app-store'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/appstore.png'}
								alt={'appstore'}
								width={390}
								height={120}
							/>
						</LocalizedLink>

						<LocalizedLink
							href={'/google-play-store'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/google_play.png'}
								alt={'googleplay'}
								width={390}
								height={120}
							/>
						</LocalizedLink>
					</div>
				</div>
			</div>
		</div>
	);
}
