import {IconArrow} from '../_icons/IconArrow';
import {IconClose} from '../_icons/IconClose';
import {IconMinus} from '../_icons/IconMinus';
import {IconPlus} from '../_icons/IconPlus';
import {cl} from '../_utils/cl';

import type {ReactNode} from 'react';

const icons = {
	arrow: <IconArrow className={'text-white'} />,
	plus: <IconPlus className={'text-white'} />,
	minus: <IconMinus className={'text-white'} />,
	cross: <IconClose className={'text-white'} />
};

export function RoundButton(props: {
	className?: string;
	iconName: 'arrow' | 'plus' | 'minus' | 'cross';
	onClick?: () => void;
}): ReactNode {
	const {className, iconName, onClick} = props;

	return (
		<>
			<button
				className={cl(
					'flex size-[48px] items-center justify-center rounded-full bg-white/10',
					'hover:bg-blueHover hover:scale-110 transition-all duration-300',
					className
				)}
				onClick={onClick}>
				{icons[iconName]}
			</button>
		</>
	);
}
