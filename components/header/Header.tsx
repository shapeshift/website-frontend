'use client';

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
	return (
		<>
			<MobileHeader />
			<DesktopHeader className={className} />
		</>
	);
}
