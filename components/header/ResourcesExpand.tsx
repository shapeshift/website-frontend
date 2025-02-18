import {motion} from 'framer-motion';

import HeaderItem from '../common/HeaderItem';
import {appResources} from '../constants';
import {expandAnimation} from './animations';

import type {ReactNode} from 'react';

export function ResourcesExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<motion.div
			className={'flex max-w-[1400px] justify-between'}
			{...expandAnimation}>
			<div className={'mt-16 pb-10 pr-10'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Learn more about'}
					<br />
					{'ShapeShift.'}
				</p>
				<p className={'text-sm text-gray-500'}>{'Frequently asked questions about ShapeShift.'}</p>
			</div>
			<div className={'mx-16 border border-white/5'} />

			<div className={'mt-16 pb-10'}>
				<div className={'grid grid-cols-3 gap-4'}>
					{appResources.slice(0, 3).map(resource => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={resource.name}
							name={resource.name}
							href={resource.href}
							description={resource.description}
							icon={resource.icon}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
}
