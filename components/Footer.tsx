'use client';

import Image from 'next/image';
import Link from 'next/link';

import {Button} from './common/Button';
import {ShapeshiftLogo} from './common/icons/ShapeshiftLogo';
import {footerLinks} from './constants';

import type {ReactNode} from 'react';

export function Footer(): ReactNode {
	return (
		<>
			<div className={'relative -m-4 block border-stroke bg-secondBg p-6 lg:hidden'}>
				<div className={'grid grid-cols-2 gap-10'}>
					{Object.entries(footerLinks).map(([category, links]) => (
						<div
							key={category}
							className={'flex flex-col gap-2'}>
							<h3 className={'cursor-default text-sm font-medium text-gray-500'}>{category}</h3>
							<div className={'flex flex-col gap-3'}>
								{links.map(link => (
									<Link
										key={link.name}
										href={link.href}
										target={category === 'Connect' ? '_blank' : '_self'}
										className={'text-sm text-white transition-all hover:text-blue'}>
										{link.name}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
				<div className={'mb-10 mt-16'}>
					<ShapeshiftLogo />
					<div className={'text-sm text-gray-500'}>
						{`© ${new Date().getFullYear()} ShapeShift. All Rights Reserved`}
					</div>
				</div>
			</div>
			<div className={'relative hidden lg:block'}>
				<div className={'rounded-lg border border-stroke bg-secondBg'}>
					<div className={'h-[480px]'}>
						<div className={'flex h-full flex-col p-12'}>
							<div className={'flex justify-between'}>
								<div className={'flex flex-col justify-between'}>
									<Link href={'/'}>
										<ShapeshiftLogo />
									</Link>
								</div>

								<div className={'flex gap-20'}>
									{Object.entries(footerLinks).map(([category, links]) => (
										<div
											key={category}
											className={'flex flex-col gap-8'}>
											<h3 className={'cursor-default text-sm font-medium text-gray-500'}>
												{category}
											</h3>
											<div className={'flex flex-col gap-3'}>
												{links.map(link => (
													<Link
														key={link.name}
														href={link.href}
														target={category === 'Connect' ? '_blank' : '_self'}
														className={'text-sm text-white transition-all hover:text-blue'}>
														{link.name}
													</Link>
												))}
											</div>
										</div>
									))}
								</div>
								<Button
									href={'https://giveth.io/project/shapeshift-dao'}
									variant={'blue'}
									title={'Donate'}
									hasArrow
								/>
							</div>

							<div className={'flex items-center justify-between gap-2'}>
								<div className={'text-sm text-gray-500'}>
									{`© ${new Date().getFullYear()} ShapeShift. All Rights Reserved`}
								</div>

								<div
									className={
										'flex items-center gap-6 rounded-2xl border border-stroke bg-black/95 p-2'
									}>
									<span className={'p-4 text-2xl text-white'}>{'Get the app'}</span>
									<div>
										<Image
											src={'/qrcode.png'}
											alt={'qrcode'}
											width={64}
											height={64}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
