'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

import {SUPPORTED_LANGUAGES} from '@/app/i18n/config';

import {IconCheck} from '../common/icons/IconCheck';
import {IconClose} from '../common/icons/IconClose';
import {IconMenu} from '../common/icons/IconMenu';
import {IconPlanet} from '../common/icons/IconPlanet';
import {IconShapeshift} from '../common/icons/IconShapeshift';
import {LocalizedLink} from '../common/LocalizedLink';
import {appDao, appProducts, appResources, headerTabs} from '../constants';
import {AnimatedPlusMinusIcon} from '../QuestionSection';

import type {ReactNode} from 'react';

const mobileTabs = [
	{
		name: 'Products',
		value: 'products',
		items: appProducts.slice(0, 6)
	},
	{
		name: 'Resources',
		value: 'resources',
		items: appResources.slice(0, 7)
	},
	{
		name: 'DAO',
		value: 'dao',
		items: appDao.slice(0, 4)
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

/**
 * Mobile header component with hamburger menu and expandable sections
 */
export function MobileHeader({
	switchLanguage,
	currentLanguage
}: {
	switchLanguage: (symbol: string) => void;
	currentLanguage: string;
}): ReactNode {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [expandedSection, setExpandedSection] = useState<string>('');

	// Close menu when route changes
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	return (
		<div className={'sticky top-0 z-50 lg:hidden'}>
			<div className={'z-50 mt-6 flex w-full items-center justify-between rounded-2xl bg-headerBg p-4'}>
				<LocalizedLink href={'/'}>
					<IconShapeshift />
				</LocalizedLink>
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className={'min-h-[56px] min-w-[56px] rounded-[20px] border border-white/5 p-4'}>
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
								className={'min-w-[56px] rounded-[20px] border border-white/5 p-4'}>
								<IconClose />
							</button>
						</div>

						<div className={'flex min-h-[calc(100vh-100px)] flex-col justify-between'}>
							<div className={'mt-10'}>
								<LocalizedLink
									href={'/'}
									onClick={() => setIsMenuOpen(false)}
									className={'mb-2 block rounded-2xl bg-secondBg p-8 text-2xl'}>
									{'Home'}
								</LocalizedLink>

								<div className={'space-y-2'}>
									{headerTabs.map(tab => (
										<div
											key={tab.name}
											className={'overflow-hidden rounded-2xl bg-secondBg'}>
											<button
												onClick={() => {
													setExpandedSection(expandedSection === tab.value ? '' : tab.value);
												}}
												className={'flex w-full items-center justify-between p-6 text-2xl'}>
												{tab.name}
												<div
													className={'flex items-center gap-2 rounded-[100%] bg-white/5 p-2'}>
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
																	<LocalizedLink
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
																	</LocalizedLink>
																</motion.div>
															))}
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									))}
								</div>
							</div>
							<div>
								<button
									onClick={() => setExpandedSection(expandedSection === 'language' ? '' : 'language')}
									className={
										'mb-10 mt-6 flex w-full items-center justify-between gap-2 rounded-2xl border border-white/50 bg-white/10 p-4'
									}>
									<span>{SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.name}</span>
									<IconPlanet className={'text-white/50'} />
								</button>
								<AnimatePresence>
									{expandedSection === 'language' && (
										<motion.div
											className={'space-y-4 p-6 pt-0'}
											{...expandAnimation}>
											<div className={'flex flex-col gap-4'}>
												{SUPPORTED_LANGUAGES.map(language => (
													<button
														key={language.code}
														onClick={() => {
															console.log(
																'[MobileHeader] Language selected:',
																language.code
															);
															switchLanguage(language.code);
															setExpandedSection('');
														}}
														className={
															'flex items-center justify-between rounded-lg px-6 py-4 hover:bg-white/10'
														}>
														<div className={'flex flex-col items-start'}>
															<span className={'text-sm font-medium'}>
																{language.name}
															</span>
															{language.name !== language.nativeName && (
																<span className={'text-xs opacity-70'}>
																	{language.nativeName}
																</span>
															)}
														</div>
														{currentLanguage === language.code && <IconCheck />}
													</button>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
