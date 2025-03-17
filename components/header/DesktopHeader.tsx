'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useMemo, useState} from 'react';

import {AnimateChangeInHeight} from '@/components/AnimatedHeight';
import {Notification} from '@/components/Notification';

import {IconPlanet} from '../common/icons/IconPlanet';
import {dAppUrl, headerTabs} from '../constants';
import {containerAnimation} from './animations';
import {DAOExpand} from './DaoExpand';
import {LanguageExpand} from './LanguageExpand';
import {ProductsExpand} from './ProductsExpand';
import {ResourcesExpand} from './ResourcesExpand';
import {Button} from '../common/Button';
import {ShapeshiftLogo} from '../common/icons/ShapeshiftLogo';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

type TDesktopHeaderProps = {
	className?: string;
	switchLanguage: (symbol: string) => void;
	currentLanguage: string;
};

/**
 * Desktop header component with hover menu expansions
 */
export function DesktopHeader({className, switchLanguage, currentLanguage}: TDesktopHeaderProps): ReactNode {
	const pathname = usePathname();
	const variant = pathname === '/' ? 'transparent' : 'default';
	const [currentTab, setCurrentTab] = useState<string>('');

	/**
	 * Map of tab content components keyed by tab value
	 */
	const tabContent: Record<string, ReactNode> = useMemo(
		() => ({
			products: <ProductsExpand setCurrentTab={setCurrentTab} />,
			resources: <ResourcesExpand setCurrentTab={setCurrentTab} />,
			dao: <DAOExpand setCurrentTab={setCurrentTab} />,
			language: (
				<LanguageExpand
					switchLanguage={switchLanguage}
					currentLanguage={currentLanguage}
				/>
			),
			empty: null
		}),
		[switchLanguage, currentLanguage]
	);

	/**
	 * Determine background style based on variant and active tab
	 */
	const getVariant = (): string => {
		if (variant === 'transparent') {
			if (currentTab) {
				return 'bg-headerBg';
			}
			return 'bg-transparent';
		}
		return 'bg-headerBg';
	};

	return (
		<div className={'sticky top-0 z-50 hidden rounded-2xl lg:block'}>
			<Notification />
			<div
				onMouseLeave={() => setCurrentTab('')}
				className={'roudnded-2xl relative mt-3 w-full bg-transparent'}>
				<div
					className={cl(
						'flex flex-col border border-white/5 items-center transition-all backdrop-blur-lg duration-300 justify-between px-6 py-3',
						currentTab ? 'rounded-t-lg' : 'rounded-lg',
						getVariant(),
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
										'cursor-pointer p-4 text-sm font-medium transition-colors',
										currentTab && currentTab !== tab.value ? 'text-gray-500' : 'text-white'
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
				<motion.div
					className={cl(
						'absolute top-full bg-bg',
						'rounded-b-lg border-x border-b border-white/5',
						'flex justify-center w-full',
						tabContent[currentTab] ? 'opacity-1' : '!opacity-0'
					)}
					initial={containerAnimation.initial}
					animate={containerAnimation.animate(true)}
					exit={containerAnimation.exit}
					transition={containerAnimation.transition}>
					<div className={'bg-headerBg'}>
						<AnimateChangeInHeight>{tabContent[currentTab]}</AnimateChangeInHeight>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
