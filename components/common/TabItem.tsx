import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export function TabItem({
	title,
	className,
	selected,
	onClick
}: {
	title?: string;
	className?: string;
	selected?: boolean;
	onClick?: () => void;
}): ReactNode {
	return (
		<button
			className={cl(
				'w-max h-9 backdrop-blur-lg border border-white/50',
				'transition-all duration-300 hover:scale-105 px-[22px] py-[6px]',
				'flex items-center justify-center font-medium rounded-[40px]',
				selected ? 'bg-white/90 hover:bg-white/90 text-bg' : 'text-white bg-white/10 hover:bg-white/5',
				className
			)}
			onClick={onClick}>
			<p
				className={cl(
					'transition-all whitespace-nowrap duration-300 font-medium',
					selected ? 'text-bg' : 'text-white'
				)}>
				{title}
			</p>
		</button>
	);
}
