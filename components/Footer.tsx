'use client';

import Link from 'next/link';

import {ShapeshiftLogo} from './common/icons/ShapeshiftLogo';
import {LinkButton} from './common/LinkButton';
import {appDao, appProducts, appResources} from './constants';

import type {ReactNode} from 'react';

const footerLinks = {
	Products: appProducts,
	Resources: appResources,
	DAO: appDao,
	Connect: [
		{name: 'Twitter', href: 'https://twitter.com/shapeshift'},
		{name: 'Medium', href: 'https://medium.com/shapeshift'},
		{name: 'Discord', href: 'https://discord.gg/shapeshift'},
		{name: 'Telegram', href: 'https://t.me/shapeshift'},
		{name: 'Warpcast', href: 'https://warpcast.com/shapeshift'}
	]
};

export function Footer(): ReactNode {
	return (
		<div className={'relative'}>
			<div className={'mx-4 mb-4 rounded-lg border border-stoke bg-secondBg'}>
				<div className={'mx-auto h-[480px]'}>
					<div className={'flex h-full flex-col justify-between p-12'}>
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
										<h3 className={'text-gray-500 text-sm font-medium'}>{category}</h3>
										<div className={'flex flex-col gap-3'}>
											{links.map(link => (
												<Link
													key={link.name}
													href={link.href}
													target={category === 'Connect' ? '_blank' : '_self'}
													className={'hover:text-gray-300 text-sm text-white'}>
													{link.name}
												</Link>
											))}
										</div>
									</div>
								))}
							</div>
							<LinkButton
								href={'/'}
								variant={'blue'}
								title={'Donate'}
							/>
						</div>

						<div className={'flex items-center justify-between gap-2'}>
							<div className={'text-gray-500 text-sm'}>{'© 2022 ShapeShift. All Rights Reserved'}</div>

							<div className={'size-10 rounded-lg border border-stoke bg-black p-2'}>{'QR'}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
