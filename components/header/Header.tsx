'use client';

import {useLanguage} from '@/hooks/useLanguage';

import {DesktopHeader} from './DesktopHeader';
import {MobileHeader} from './MobileHeader';

import type {ReactNode} from 'react';

type THeaderProps = {
	className?: string;
};

/**
 * Responsive header component
 * Switches between mobile and desktop versions based on screen size
 */
export function Header({className}: THeaderProps): ReactNode {
	const {currentLanguage, switchLanguage} = useLanguage();
	return (
		<>
			<MobileHeader
				switchLanguage={switchLanguage}
				currentLanguage={currentLanguage}
			/>
			<DesktopHeader
				className={className}
				switchLanguageAction={switchLanguage}
				currentLanguage={currentLanguage}
			/>
		</>
	);
}
