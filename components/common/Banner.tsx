import Image from 'next/image';
import Link from 'next/link';

import {Button} from './Button';
import {dAppUrl} from '../constants';

import type {ReactNode} from 'react';

export function Banner(): ReactNode {
	return (
		<div className={'relative mb-40 flex w-full justify-between overflow-hidden rounded-2xl lg:p-24 lg:pr-6'}>
			<Image
				src={'/bannerBg.png'}
				alt={'banner'}
				width={1400}
				height={467}
				className={'absolute inset-0 -z-10 size-full object-cover'}
			/>
			<div className={'flex max-w-[511px] flex-col'}>
				<h2 className={'mb-24 text-[40px] leading-[40px]'}>{'Your multichain crypto home base.'}</h2>

				<div className={'flex gap-4'}>
					<Button
						variant={'blue'}
						title={'Launch dApp'}
						href={dAppUrl}
					/>
					<Button
						variant={'white'}
						title={'Try Demo'}
					/>
				</div>
			</div>
			<div className={'flex max-w-[511px] flex-col'}>
				<h2 className={'mb-10 text-[40px] leading-[40px]'}>
					{'Defi everywhere, anytime with ShapeShift mobile.'}
				</h2>
				<div className={'flex gap-6'}>
					<div className={'size-[121px]'}>
						<Image
							src={'/qrcode.png'}
							alt={'qrcode'}
							width={360}
							height={360}
						/>
					</div>

					<div className={'flex flex-col items-center justify-center gap-3'}>
						<Link
							href={'/'}
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
							href={'/'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/googleplay.png'}
								alt={'googleplay'}
								width={390}
								height={120}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
