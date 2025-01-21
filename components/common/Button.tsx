import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

type TButtonVariant = 'blue' | 'white';

type TButtonProps = {
	children?: ReactNode;
	variant?: TButtonVariant;
	className?: string;
	onClick?: () => void;
};

export function Button(props: TButtonProps): ReactNode {
	return (
		<button
			{...props}
			className={cl(
				'flex h-14 w-[152px] font-medium items-center text-white backdrop-blur-lg justify-center rounded-2xl',
				'hover:scale-105 transition-all duration-300',
				props.className,
				props.variant === 'blue'
					? 'bg-button hover:bg-button-hover transition-all duration-300'
					: 'bg-white/10 border border-white/50 hover:bg-white/5 transition-all duration-300'
			)}
			onClick={props.onClick}>
			{props.children}
		</button>
	);
}
