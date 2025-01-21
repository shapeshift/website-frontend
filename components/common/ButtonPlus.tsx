import {cl} from '../utils/cl';
import {IconPlus} from './icons/IconPlus';

import type {ReactNode} from 'react';

export function ButtonPlus({className}: {className?: string}): ReactNode {
	return (
		<button
			className={cl(
				'flex size-12 items-center justify-center rounded-full bg-white/10',
				'hover:bg-button-hover hover:scale-110 transition-all duration-300',
				className
			)}>
			<IconPlus className={'text-white'} />
		</button>
	);
}
