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
};

export function Button(props: TButtonProps): ReactNode {
	return (
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
			{props.href ? (
				<div className={'flex w-full items-center justify-between'}>
					<Link href={props.href}>
						<span>{props.title}</span>
					</Link>
					<IconNext />
				</div>
			) : (
				props.title
			)}
		</button>
	);
}
