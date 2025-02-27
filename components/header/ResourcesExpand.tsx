import {motion} from 'framer-motion';

import HeaderItem from '../common/HeaderItem';
import {appResources} from '../constants';
import {expandAnimation} from './animations';

import type {ReactNode} from 'react';

export function ResourcesExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<motion.div
			className={'grid grid-cols-12'}
			{...expandAnimation}>
			<div className={'col-span-4 flex flex-col border-r border-white/5 p-16'}>
				<p className={'mb-4 text-2xl font-medium'}>
					{'Learn more about'}
					<br />
					{'ShapeShift.'}
				</p>
				<p className={'text-sm text-gray-500'}>{'Frequently asked questions about ShapeShift.'}</p>
			</div>

			<div className={'col-span-8 p-16'}>
				<div className={'flex flex-row flex-wrap gap-4'}>
					{appResources.slice(0, 5).map(resource => (
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
