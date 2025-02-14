'use client';

import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {useMemo, useState} from 'react';

import {containerAnimation} from './animations';
import {Button} from '../common/Button';
import {ShapeshiftLogo} from '../common/icons/ShapeshiftLogo';
import {dAppUrl, headerTabs} from '../constants';
import {DAOExpand} from './DaoExpand';
import {ProductsExpand} from './ProductsExpand';
import {ResourcesExpand} from './ResourcesExpand';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export function Header({
	className,
	variant = 'default'
}: {
	className?: string;
	variant?: 'transparent' | 'default';
}): ReactNode {
	const [currentTab, setCurrentTab] = useState<string>('');

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

	const getVariant = (): string => {
		if (variant === 'transparent') {
			if (currentTab) {
				return 'bg-secondBg';
			}
			return 'bg-headerBg/10 ';
		}
		return 'bg-secondBg';
	};

	return (
		<div className={'relative z-50'}>
			<div
				onMouseLeave={() => setCurrentTab('')}
				className={cl('fixed w-[calc(100%-2rem)]', getVariant())}>
				<div
					className={cl(
						'flex flex-col items-center transition-all backdrop-blur-lg duration-300 justify-between rounded-lg mt-4 px-6 py-3',
						className
					)}>
					<div className={'flex w-full items-center justify-between'}>
						<Link
							href={'/'}
							className={'flex items-center'}
							onMouseEnter={() => setCurrentTab('')}>
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
							href={dAppUrl}
						/>
					</div>
				</div>{' '}
				<AnimatePresence mode={'wait'}>
					<motion.div
						key={currentTab}
						initial={containerAnimation.initial}
						animate={containerAnimation.animate(!!currentTab)}
						exit={containerAnimation.exit}
						transition={containerAnimation.transition}>
						{tabContent[currentTab]}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
