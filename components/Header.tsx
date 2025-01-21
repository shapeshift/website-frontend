'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

import type {ReactNode} from 'react';
import {ShapeshiftLogo} from './common/icons/ShapeshiftLogo';
import {Button} from './common/Button';

export function Header(): ReactNode {
	const pathname = usePathname();

	const tabs = [
		{name: 'Products', href: '/products'},
		{name: 'Resources', href: '/resources'},
		{name: 'DAO', href: '/dao'}
	];

	return (
		<div className="relative z-50">
			<div
				className={
					'mx-4 flex items-center justify-between px-6 py-3 fixed w-[calc(100vw-2rem)] mt-4 bg-second-bg rounded-lg border border-[#12141A]'
				}>
				<Link
					href={'/'}
					className={'flex items-center'}>
					<ShapeshiftLogo />
				</Link>

				<nav className={'flex gap-8'}>
					{tabs.map(tab => (
						<Link
							key={tab.name}
							href={tab.href}
							className={`text-sm font-medium transition-colors ${
								pathname === tab.href ? 'text-gray-400 hover:text-white' : 'text-white'
							}`}>
							{tab.name}
						</Link>
					))}
				</nav>

				<Button variant={'blue'}>Launch dApp</Button>
			</div>
		</div>
	);
}
