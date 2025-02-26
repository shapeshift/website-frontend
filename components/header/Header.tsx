'use client';

import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {useMemo, useState} from 'react';

import {containerAnimation} from './animations';
import {Button} from '../common/Button';
import {ShapeshiftLogo} from '../common/icons/ShapeshiftLogo';
import {appDao, appProducts, appResources, dAppUrl, headerTabs} from '../constants';
import {DAOExpand} from './DaoExpand';
import {LanguageExpand} from './LanguageExpand';
import {ProductsExpand} from './ProductsExpand';
import {ResourcesExpand} from './ResourcesExpand';
import {IconClose} from '../common/icons/IconClose';
import {IconMenu} from '../common/icons/IconMenu';
import {IconPlanet} from '../common/icons/IconPlanet';
import {IconShapeshift} from '../common/icons/IconShapeshift';
import {AnimatedPlusMinusIcon} from '../QuestionSection';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

const mobileTabs = [
	{
		name: 'Products',
		value: 'products',
		items: appProducts
	},
	{
		name: 'Resources',
		value: 'resources',
		items: appResources
	},
	{
		name: 'DAO',
		value: 'dao',
		items: appDao
	}
];

const mobileMenuAnimation = {
	initial: {opacity: 0, y: -20},
	animate: {opacity: 1, y: 0},
	exit: {opacity: 0, y: -20},
	transition: {duration: 0.2}
};

const expandAnimation = {
	initial: {height: 0, opacity: 0},
	animate: {height: 'auto', opacity: 1},
	exit: {height: 0, opacity: 0},
	transition: {duration: 0.2}
};

export function Header({
	className,
	variant = 'default'
}: {
	className?: string;
	variant?: 'transparent' | 'default';
}): ReactNode {
	const [currentTab, setCurrentTab] = useState<string>('');
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [expandedSection, setExpandedSection] = useState<string>('');

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
			language: <LanguageExpand />,
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
		<>
			<div>
				<div className={'z-50 flex w-full items-center justify-between pt-6 lg:hidden'}>
					<Link href={'/'}>
						<IconShapeshift />
					</Link>
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={'min-h-[56px] min-w-[56px] rounded-[20px] border border-stroke p-4'}>
						{isMenuOpen ? <IconClose /> : <IconMenu />}
					</button>
				</div>
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							className={'fixed left-0 top-0 z-50 h-screen w-full overflow-y-auto bg-bg px-4 py-6'}
							{...mobileMenuAnimation}>
							<div className={'flex items-center justify-between'}>
								<IconShapeshift />
								<button
									onClick={() => setIsMenuOpen(false)}
									className={'min-w-[56px] rounded-[20px] border border-stroke p-4'}>
									<IconClose />
								</button>
							</div>

							<div className={'flex min-h-[calc(100vh-100px)] flex-col justify-between'}>
								<div className={'mt-10'}>
									<Link
										href={'/'}
										onClick={() => setIsMenuOpen(false)}
										className={'mb-2 block rounded-2xl bg-secondBg p-8 text-2xl'}>
										{'Home'}
									</Link>

									<div className={'space-y-2'}>
										{headerTabs.map(tab => (
											<div
												key={tab.name}
												className={'overflow-hidden rounded-2xl bg-secondBg'}>
												<button
													onClick={() => {
														setExpandedSection(
															expandedSection === tab.value ? '' : tab.value
														);
													}}
													className={'flex w-full items-center justify-between p-6 text-2xl'}>
													{tab.name}
													<div
														className={
															'flex items-center gap-2 rounded-[100%] bg-white/5 p-2'
														}>
														<AnimatedPlusMinusIcon isOpen={expandedSection === tab.value} />
													</div>
												</button>
												<AnimatePresence>
													{expandedSection === tab.value && (
														<motion.div
															className={'space-y-4 p-6 pt-0'}
															{...expandAnimation}>
															{mobileTabs
																.find(t => t.value === tab.value)
																?.items?.map(item => (
																	<motion.div
																		initial={{opacity: 0, x: -20}}
																		animate={{opacity: 1, x: 0}}
																		transition={{delay: 0.1}}
																		key={item.name}>
																		<Link
																			onClick={() => setIsMenuOpen(false)}
																			href={item.href}
																			className={'flex gap-4 pt-6 text-lg'}>
																			<div
																				className={
																					'flex w-6 items-center justify-center gap-2'
																				}>
																				{item.icon}
																			</div>
																			<div>{item.name}</div>
																		</Link>
																	</motion.div>
																))}
														</motion.div>
													)}
												</AnimatePresence>
											</div>
										))}
									</div>
								</div>
								<div
									className={
										'mb-10 mt-6 flex items-center gap-2 rounded-2xl border border-stroke p-4'
									}>
									<IconPlanet className={'text-white/50'} />
									<span>{'English'}</span>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className={'relative z-50 hidden lg:block'}>
				<div
					onMouseLeave={() => setCurrentTab('')}
					className={cl('fixed w-[calc(100%-2rem)]', getVariant())}>
					<div
						className={cl(
							'flex flex-col border border-white/5 items-center transition-all backdrop-blur-lg duration-300 justify-between rounded-lg mt-4 px-6 py-3',
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

							<div className={'flex gap-2'}>
								<button
									onMouseEnter={() => setCurrentTab('language')}
									className={
										'group flex aspect-square h-14 items-center justify-center rounded-[20px] border border-white/5'
									}>
									<IconPlanet className={'opacity-50 transition-opacity group-hover:opacity-100'} />
								</button>
								<Button
									variant={'blue'}
									title={'Launch dApp'}
									href={dAppUrl}
								/>
							</div>
						</div>
					</div>
					<AnimatePresence mode={'wait'}>
						<motion.div
							className={'flex justify-center'}
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
		</>
	);
}
