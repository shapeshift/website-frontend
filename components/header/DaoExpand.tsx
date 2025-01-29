import {motion} from 'framer-motion';

import HeaderItem from '../common/HeaderItem';
import {appDao} from '../constants';
import {expandAnimation} from './animations';

import type {ReactNode} from 'react';

export function DAOExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<motion.div
			className={'mt-16 flex max-w-[1400px] justify-between pb-10'}
			{...expandAnimation}>
			<div className={'border-r border-stoke pr-10'}>
				<p className={'text-sm text-gray-500'}>{'FOX Tokens wield mighty powers for those who hodl them.'}</p>
			</div>
			<div>
				<div className={'grid grid-cols-3 gap-4'}>
					{appDao.slice(0, 3).map(dao => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={dao.name}
							name={dao.name}
							href={dao.href}
							description={dao.description}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
}
