import {LocalizedLink} from './LocalizedLink';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

export function TabItem(props: {
	title?: string;
	className?: string;
	selected?: boolean;
	onClick?: () => void;
	href?: string;
}): ReactNode {
	const {title, className, selected: isSelected, onClick, href} = props;
	if (href) {
		return (
			<LocalizedLink
				href={href}
				className={className}>
				<button
					className={cl(
						'w-max h-9 backdrop-blur-lg border border-white/50',
						'transition-all duration-300 hover:scale-105 px-[22px] py-[6px]',
						'flex items-center justify-center font-medium rounded-[40px]',
						isSelected
							? 'bg-white/90 hover:bg-white/90 text-bg'
							: 'text-white bg-white/10 hover:bg-white/5',
						className
					)}>
					<p
						className={cl(
							'transition-all whitespace-nowrap duration-300 font-medium',
							isSelected ? 'text-bg' : 'text-white'
						)}>
						{title}
					</p>
				</button>
			</LocalizedLink>
		);
	}

	return (
		<div
			className={cl(
				'w-max h-7 md:h-9 backdrop-blur-lg border border-white/50',
				'transition-all duration-300 hover:scale-105 px-[22px] py-[6px]',
				'flex items-center justify-center font-medium rounded-[40px]',
				isSelected ? 'bg-white/90 hover:bg-white/90 text-bg' : 'text-white bg-white/10 hover:bg-white/5',
				className
			)}
			onClick={onClick}>
			<p
				className={cl(
					'transition-all whitespace-nowrap duration-300 font-medium text-sm md:text-base',
					isSelected ? 'text-bg' : 'text-white'
				)}>
				{title}
			</p>
		</div>
	);
}
