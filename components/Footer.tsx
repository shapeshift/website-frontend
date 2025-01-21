'use client';

import Link from 'next/link';
import Image from 'next/image';
import type {ReactNode} from 'react';

import {ShapeshiftLogo} from './common/icons/ShapeshiftLogo';
import {LinkButton} from './common/LinkButton';

const footerLinks = {
	Products: [
		{name: 'dApp', href: '/products/dapp'},
		{name: 'Trade', href: '/products/trade'},
		{name: 'Earn', href: '/products/earn'},
		{name: 'DeFi wallet', href: '/products/defi-wallet'},
		{name: 'Mobile app', href: '/products/mobile-app'},
		{name: 'KeepKey', href: '/products/keepkey'}
	],
	Resources: [
		{name: 'Blog', href: '/resources/blog'},
		{name: 'FAQ', href: '/resources/faq'},
		{name: 'Supported chains', href: '/resources/supported-chains'},
		{name: 'Terms of Service', href: '/resources/terms-of-service'},
		{name: 'Privacy Policy', href: '/resources/privacy-policy'}
	],
	DAO: [
		{name: 'Fox token', href: '/dao/fox-token'},
		{name: 'Governance', href: '/dao/governance'},
		{name: 'Docs', href: '/dao/docs'},
		{name: 'Forum', href: '/dao/forum'}
	],
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
			<div className={'mx-4 mb-4 rounded-lg border border-[#12141A] bg-second-bg'}>
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
										<h3 className={'text-sm font-medium text-gray-500'}>{category}</h3>
										<div className={'flex flex-col gap-3'}>
											{links.map(link => (
												<Link
													key={link.name}
													href={link.href}
													target={category === 'Connect' ? '_blank' : '_self'}
													className={'text-sm text-white hover:text-gray-300'}>
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
							<div className={'text-sm text-gray-500'}>© 2022 ShapeShift. All Rights Reserved</div>

							<div className={'size-10 rounded-lg border border-[#12141A] bg-black p-2'}>QR</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
