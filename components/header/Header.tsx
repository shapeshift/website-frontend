'use client';

import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {useMemo, useState} from 'react';

import {containerAnimation} from './animations';
import {Button} from '../common/Button';
import {ShapeshiftLogo} from '../common/icons/ShapeshiftLogo';
import {headerTabs} from '../constants';
import {DAOExpand} from './DaoExpand';
import {ProductsExpand} from './ProductsExpand';
import {ResourcesExpand} from './ResourcesExpand';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export function Header({className}: {className?: string}): ReactNode {
	const [currentTab, setCurrentTab] = useState<string>('empty');

	/**********************************************************************************************
	 * This function is used to handle the tab mouse enter event.
	 * If the tab is already active, it will set the current tab to 'empty'.
	 * Otherwise, it will set the current tab to the tab value.
	 **********************************************************************************************/
	const tabContent: Record<string, ReactNode> = useMemo(
		() => ({
			products: <ProductsExpand setCurrentTab={setCurrentTab} />,
			resources: <ResourcesExpand setCurrentTab={setCurrentTab} />,
			dao: <DAOExpand setCurrentTab={setCurrentTab} />,
			empty: null
		}),
		[]
	);

	return (
		<div
			onMouseLeave={() => setCurrentTab('empty')}
			className={'relative z-50'}>
			<div
				className={cl(
					'fixed flex flex-col bg-secondBg w-[calc(100%-2rem)] items-center justify-between rounded-lg mt-4 px-6 py-3',
					className
				)}>
				<div className={'flex w-full items-center justify-between'}>
					<Link
						href={'/'}
						className={'flex items-center'}
						onMouseEnter={() => setCurrentTab('empty')}>
						<ShapeshiftLogo />
					</Link>

					<nav className={'flex'}>
						{headerTabs.map(tab => (
							<div
								key={tab.name}
								onMouseEnter={() => setCurrentTab(tab.value)}
								className={cl(
									'cursor-default p-4 text-sm font-medium transition-colors',
									currentTab === tab.value ? 'text-gray-500' : 'text-white'
								)}>
								{tab.name}
							</div>
						))}
					</nav>

					<Button
						variant={'blue'}
						title={'Launch dApp'}
					/>
				</div>
				<AnimatePresence mode={'wait'}>
					<motion.div
						key={currentTab}
						initial={containerAnimation.initial}
						animate={containerAnimation.animate(currentTab !== 'empty')}
						exit={containerAnimation.exit}
						transition={containerAnimation.transition}>
						{tabContent[currentTab]}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
