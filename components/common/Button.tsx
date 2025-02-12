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
	return (
		<>
			{props.href ? (
				<Link
					className={cl(
						'flex h-14 px-5 py-4 font-medium items-center text-white backdrop-blur-lg justify-center rounded-2xl hover:scale-105 transition-all duration-300',
						props.hasArrow ? 'justify-between w-[232px]' : '!w-[152px]',
						props.variant === 'blue'
							? 'bg-blue hover:bg-blueHover'
							: 'bg-white/10 border border-white/50 hover:bg-white/5'
					)}
					href={props.href}
					target={'_blank'}>
					<span>{props.title}</span>
					{props.hasArrow ? <IconNext /> : null}
				</Link>
			) : (
				<button
					{...props}
					className={cl(
						'flex h-14 px-5 py-4 font-medium items-center text-white backdrop-blur-lg justify-center rounded-2xl hover:scale-105 transition-all duration-300',
						props.className,
						props.href ? 'w-[232px]' : 'w-[152px]',
						props.variant === 'blue'
							? 'bg-blue hover:bg-blueHover'
							: 'bg-white/10 border border-white/50 hover:bg-white/5'
					)}
					onClick={props.onClick}>
					{props.title}
				</button>
			)}
		</>
	);
}
