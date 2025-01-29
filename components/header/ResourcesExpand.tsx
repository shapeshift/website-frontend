import {motion} from 'framer-motion';

import HeaderItem from '../common/HeaderItem';
import {appResources} from '../constants';

import type {ReactNode} from 'react';

export function ResourcesExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<motion.div
			className={'mt-16 flex max-w-[1400px] justify-between '}
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{
				y: {duration: 0.4, ease: [0.23, 1, 0.32, 1]},
				opacity: {duration: 0.3}
			}}>
			<div className={'border-r border-stoke pb-10 pr-10'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Learn more about'}
					<br />
					{'ShapeShift.'}
				</p>
				<p className={'text-sm text-gray-500'}>{'Frequently asked questions about ShapeShift.'}</p>
			</div>

			<div className={'pb-10'}>
				<div className={'grid grid-cols-3 gap-4'}>
					{appResources.slice(0, 3).map(resource => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={resource.name}
							name={resource.name}
							href={resource.href}
							description={resource.description}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
}
