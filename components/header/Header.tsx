'use client';

import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {useMemo, useRef, useState} from 'react';

import {useOnClickOutside} from '@/hooks/useOnClickOutside';

import {Button} from '../common/Button';
import {ShapeshiftLogo} from '../common/icons/ShapeshiftLogo';
import {headerTabs} from '../constants';
import {DAOExpand} from './DaoExpand';
import {ProductsExpand} from './ProductsExpand';
import {ResourcesExpand} from './ResourcesExpand';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export function Header(): ReactNode {
	const [currentTab, setCurrentTab] = useState<string>('empty');
	const headerRef = useRef<HTMLDivElement>(null);

	// Define animation constants for better readability and maintainability
	const initialAnimation = {opacity: 0, y: 20};
	const animateAnimation = useMemo(
		() => ({
			opacity: currentTab === 'empty' ? 0 : 1,
			y: currentTab === 'empty' ? 20 : 0,
			scaleY: currentTab === 'empty' ? 0.95 : 1,
			transformOrigin: 'top'
		}),
		[currentTab]
	);
	const exitAnimation = {
		opacity: 0,
		y: 10,
		scaleY: 0.95,
		transition: {
			duration: 0.15,
			ease: [0.32, 0, 0.67, 0]
		}
	};
	const transitionSettings = {
		duration: 0.4,
		ease: [0.23, 1, 0.32, 1]
	};

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

	useOnClickOutside(headerRef, () => setCurrentTab('empty'));

	return (
		<div
			ref={headerRef}
			onMouseLeave={() => setCurrentTab('empty')}
			className={'relative z-50'}>
			<div
				className={cl(
					'fixed mx-4 mt-4 flex w-[calc(100%-2rem)] flex-col items-center justify-between rounded-lg bg-secondBg px-6 py-3'
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
						initial={initialAnimation}
						animate={animateAnimation}
						exit={exitAnimation}
						transition={transitionSettings}>
						{tabContent[currentTab]}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
