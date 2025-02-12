import Link from 'next/link';

import {cl} from '../utils/cl';
import {IconArrow} from './icons/IconArrow';
import {IconMinus} from './icons/IconMinus';
import {IconPlus} from './icons/IconPlus';

import type {ReactNode} from 'react';

const icons = {
	arrow: <IconArrow className={'text-white'} />,
	plus: <IconPlus className={'text-white'} />,
	minus: <IconMinus className={'text-white'} />,
	cross: <IconPlus className={'rotate-45 text-white'} />
};

export function RoundButton({
	className,
	href,
	iconName,
	onClick
}: {
	className?: string;
	href?: string;
	iconName: 'arrow' | 'plus' | 'minus' | 'cross';
	onClick?: () => void;
}): ReactNode {
	return (
		<>
			{href ? (
				<Link
					href={href}
					className={cl(
						'flex size-[48px] items-center justify-center rounded-full bg-white/10',
						'hover:bg-blueHover hover:scale-110 transition-all duration-300',
						className
					)}
					onClick={onClick}>
					{icons[iconName]}
				</Link>
			) : (
				<button
					className={cl(
						'flex size-[48px] items-center justify-center rounded-full bg-white/10',
						'hover:bg-blueHover hover:scale-110 transition-all duration-300',
						className
					)}
					onClick={onClick}>
					{icons[iconName]}
				</button>
			)}
		</>
	);
}
