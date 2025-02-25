import Link from 'next/link';

import {cl} from '../utils/cl';
import {IconNext} from './icons/IconNext';

import type {ReactNode} from 'react';

export type TButtonVariant = 'blue' | 'white';

type TButtonProps = {
	title?: string;
	variant?: TButtonVariant;
	className?: string;
	onClick?: () => void;
	href?: string;
	hasArrow?: boolean;
};

export function Button(props: TButtonProps): ReactNode {
	const {variant = 'blue', hasArrow = false, ...rest} = props;
	return (
		<>
			{props.href ? (
				<Link
					className={cl(
						'flex h-14 px-5 py-4 font-medium items-center text-white backdrop-blur-lg justify-center rounded-2xl hover:scale-105 transition-all duration-300',
						hasArrow ? 'justify-between w-[232px]' : '!w-[152px]',
						variant === 'blue'
							? 'bg-blue hover:bg-blueHover'
							: 'bg-white/10 border border-white/50 hover:bg-white/5',
						props.className
					)}
					href={props.href}
					target={props.href?.startsWith('http') ? '_blank' : undefined}>
					<span>{props.title}</span>
					{hasArrow ? <IconNext /> : null}
				</Link>
			) : (
				<button
					{...rest}
					className={cl(
						'flex h-14 px-5 py-4 font-medium items-center text-white backdrop-blur-lg justify-center rounded-2xl hover:scale-105 transition-all duration-300',
						props.className,
						props.href || hasArrow ? 'justify-between w-[232px]' : '!w-[152px]',
						variant === 'blue'
							? 'bg-blue hover:bg-blueHover'
							: 'bg-white/10 border border-white/50 hover:bg-white/5'
					)}
					onClick={props.onClick}>
					{props.title}
					{hasArrow ? <IconNext /> : null}
				</button>
			)}
		</>
	);
}
