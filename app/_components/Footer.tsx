'use client';

import Image from 'next/image';

import {Button} from '@/app/_components/Button';

import {LocalizedLink} from './LocalizedLink';
import {ShapeshiftLogo} from '../_icons/ShapeshiftLogo';
import {footerButtonTitle, footerLinks} from '../_utils/constants';

import type {TAppLink} from '../_utils/constants';
import type {ReactNode} from 'react';

export function Footer(): ReactNode {
	return (
		<div className={'relative border-t border-stroke bg-secondBg'}>
			<div className={'mx-auto max-w-[1440px] px-4 py-8 lg:px-8'}>
				{/* Top row: Logo and Donate */}
				<div className={'flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-0'}>
					<LocalizedLink href={'/'}>
						<ShapeshiftLogo />
					</LocalizedLink>
					<Button
						href={'https://giveth.io/project/shapeshift-dao'}
						variant={'blue'}
						title={footerButtonTitle}
						hasArrow
					/>
				</div>

				{/* Middle row: Menu items */}
				<div className={'mx-auto mt-12 w-full max-w-[720px]'}>
					<div className={'grid grid-cols-2 gap-8 lg:grid-cols-4'}>
						{Object.entries(footerLinks).map(([category, links]) => (
							<div
								key={category}
								className={'flex flex-col gap-4'}>
								<h3 className={'cursor-default text-sm font-medium text-gray-500'}>{category}</h3>
								<div className={'flex flex-col gap-3'}>
									{links.map((link: TAppLink) => (
										<LocalizedLink
											key={link.name}
											href={link.href}
											target={link.target || (category === 'Connect' ? '_blank' : '_self')}
											className={'text-sm text-white transition-all hover:text-blue'}>
											{link.name}
										</LocalizedLink>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Bottom row: App QR and Copyright */}
				<div
					className={
						'mt-12 flex flex-col items-center justify-between gap-6 border-t border-stroke pt-8 sm:flex-row'
					}>
					<div className={'flex items-center gap-6 rounded-2xl border border-stroke bg-black/95 p-2'}>
						<span className={'p-4 text-2xl text-white'}>{'Get the app'}</span>
						<div>
							<Image
								src={'/qrcode.png'}
								alt={'qrcode'}
								width={128}
								height={128}
							/>
						</div>
					</div>
					<div className={'text-sm text-gray-500'}>
						{`© ${new Date().getFullYear()} ShapeShift. All Rights Reserved`}
					</div>
				</div>
			</div>
		</div>
	);
}
