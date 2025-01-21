import {cl} from '../utils/cl';
import {IconMinus} from './icons/IconMinus';

import type {ReactNode} from 'react';

export function ButtonMinus({className}: {className?: string}): ReactNode {
	return (
		<button
			className={cl(
				'flex size-12 items-center justify-center rounded-full bg-white/10',
				'hover:bg-button-hover hover:scale-110 transition-all duration-300',
				className
			)}>
			<IconMinus className={'text-white'} />
		</button>
	);
}
