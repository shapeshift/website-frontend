import {motion} from 'framer-motion';

import HeaderItem from '../common/HeaderItem';
import {appDao} from '../constants';

import type {ReactNode} from 'react';

export function DAOExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<motion.div
			className={'mt-16 flex max-w-[1400px] justify-between pb-10'}
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{
				y: {duration: 0.4, ease: [0.23, 1, 0.32, 1]},
				opacity: {duration: 0.3}
			}}>
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
