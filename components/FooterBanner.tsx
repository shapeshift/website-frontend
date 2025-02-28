import Image from 'next/image';
import Link from 'next/link';

import {Button} from './common/Button';
import {cl} from './utils/cl';

import type {ReactNode} from 'react';

type TFooterBanner = {
	tag: string;
	title: string;
	href: string;
	buttonText: string;
};

export function FooterBanner(data: TFooterBanner): ReactNode | null {
	return (
		<section className={'relative mb-40 h-[424px] w-full max-w-[1400px] overflow-hidden rounded-2xl lg:h-[504px]'}>
			<div className={'mx-auto'}>
				<Image
					src={'/bannerFooterBg.png'}
					alt={data.title}
					width={2800}
					height={1008}
					className={'absolute inset-0 size-full object-cover'}
				/>

				<div className={'absolute inset-0 z-10 flex w-full flex-col items-center justify-center gap-4 px-4'}>
					<div className={'rounded-3xl bg-white/10 px-6 py-2 text-white'}>{data.tag}</div>
					<div
						className={cl(
							'mb-[60px] mt-4 max-w-[800px] text-center text-[36px] font-normal leading-[36px]',
							'text-white md:text-[48px] md:leading-[48px] lg:text-7xl'
						)}>
						{data.title}
					</div>
					<Button
						variant={'blue'}
						href={data.href}
						title={data.buttonText}
						hasArrow
						className={'w-full lg:w-[232px]'}
					/>
				</div>
			</div>
		</section>
	);
}

export function FooterBannerMobileApp(data: TFooterBanner): ReactNode | null {
	return (
		<section className={'relative mb-40 h-[424px] w-full max-w-[1400px] overflow-hidden rounded-2xl lg:h-[504px]'}>
			<div className={'mx-auto'}>
				<Image
					src={'/bannerFooterBg.png'}
					alt={data.title}
					width={2800}
					height={1008}
					className={'absolute inset-0 size-full object-cover'}
				/>

				<div className={'absolute inset-0 z-10 flex w-full flex-col items-center justify-center gap-4 px-4'}>
					<div className={'rounded-3xl bg-white/10 px-6 py-2 text-white'}>{data.tag}</div>
					<div
						className={cl(
							'mb-[60px] mt-4 max-w-[800px] text-center text-[36px] font-normal leading-[36px]',
							'text-white md:text-[48px] md:leading-[48px] lg:text-7xl'
						)}>
						{data.title}
					</div>
					<div className={'flex items-center justify-center gap-6'}>
						<Link
							href={'/apple-app-store'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/appstore.png'}
								alt={'appstore'}
								width={390}
								height={120}
							/>
						</Link>

						<Link
							href={'/google-play-store'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/google_play.png'}
								alt={'googleplay'}
								width={390}
								height={120}
							/>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
