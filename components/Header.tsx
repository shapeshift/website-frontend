'use client';

import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';

import {Button} from './common/Button';
import HeaderItem from './common/HeaderItem';
import {ShapeshiftLogo} from './common/icons/ShapeshiftLogo';
import {LinkButton} from './common/LinkButton';
import {appDao, appProducts, appResources} from './constants';

import type {ReactNode} from 'react';

const tabs = [
	{name: 'Products', href: '/products', value: 'products'},
	{name: 'Resources', href: '/resources', value: 'resources'},
	{name: 'DAO', href: '/dao', value: 'dao'}
];

export function Header(): ReactNode {
	const [currentTab, setCurrentTab] = useState<string | null>(null);
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
				setCurrentTab(null);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={headerRef}
			className={'relative z-50'}>
			<div
				className={
					'fixed mx-4 mt-4 flex w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-lg border border-stoke bg-secondBg px-6 py-3'
				}>
				<div className={'flex w-full items-center justify-between'}>
					<Link
						href={'/'}
						className={'flex items-center'}>
						<ShapeshiftLogo />
					</Link>

					<nav className={'flex gap-8'}>
						{tabs.map(tab => (
							<button
								key={tab.name}
								onClick={() => setCurrentTab(tab.value)}
								className={`text-sm font-medium transition-colors ${
									currentTab === tab.value ? 'text-gray-400 hover:text-white' : 'text-white'
								}`}>
								{tab.name}
							</button>
						))}
					</nav>

					<Button variant={'blue'}>{'Launch dApp'}</Button>
				</div>
				{currentTab === 'products' && <ProductsExpand />}
				{currentTab === 'resources' && <ResourcesExpand />}
				{currentTab === 'dao' && <DAOExpand />}
			</div>
		</div>
	);
}

function ProductsExpand(): ReactNode {
	return (
		<div className={'mt-16 flex max-w-[1400px] justify-between'}>
			<div className={'flex flex-col border-r border-stoke p-10'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Your Wallet. One App.'}
					<br />
					{'Endless Opportunity'}
				</p>
				<p className={'mb-10 max-w-[327px] text-sm text-gray-500'}>
					{'Trade Bitcoin, Ethereum, and more with top rates across leading DEXs and aggregators.'}
				</p>

				<LinkButton
					variant={'blue'}
					title={'Get Started'}
					href={'/products/dapp'}
				/>
			</div>

			<div>
				<div className={'grid grid-cols-3 gap-4'}>
					{appProducts.map(product => (
						<HeaderItem
							key={product.name}
							name={product.name}
							href={product.href}
							description={product.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function ResourcesExpand(): ReactNode {
	return (
		<div className={'mt-16 flex max-w-[1400px] justify-between'}>
			<div className={'border-r border-stoke p-10'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Learn more about'}
					<br />
					{'ShapeShift.'}
				</p>
				<p className={'text-sm text-gray-500'}>{'Frequently asked questions about ShapeShift.'}</p>
			</div>

			<div>
				<div className={'grid grid-cols-3 gap-4'}>
					{appResources.slice(0, 3).map(resource => (
						<HeaderItem
							key={resource.name}
							name={resource.name}
							href={resource.href}
							description={resource.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function DAOExpand(): ReactNode {
	return (
		<div className={'mt-16 flex max-w-[1400px] justify-between'}>
			<div className={'border-r border-stoke p-10'}>
				<p className={'text-sm text-gray-500'}>{'FOX Tokens wield mighty powers for those who hodl them.'}</p>
			</div>
			<div>
				<div className={'grid grid-cols-3 gap-4'}>
					{appDao.slice(0, 3).map(dao => (
						<HeaderItem
							key={dao.name}
							name={dao.name}
							href={dao.href}
							description={dao.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
