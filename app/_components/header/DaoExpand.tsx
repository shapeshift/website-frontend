import Image from 'next/image';

import HeaderItem from '@/app/_components/HeaderItem';
import {appDao} from '@/app/_utils/constants';
import {DAO_DICT} from '@/app/_utils/dictionary/dao';

import {expandAnimation} from './animations';

import type {ReactNode} from 'react';

export function DAOExpand({setCurrentTab}: {setCurrentTab: (tab: string) => void}): ReactNode {
	return (
		<div
			className={'grid grid-cols-12'}
			{...expandAnimation}>
			<div className={'col-span-4 flex flex-col border-r border-white/5 p-16'}>
				<div className={'mb-5 flex items-center gap-2'}>
					<div className={'mr-4 size-10'}>
						<Image
							src={'/fox-token/foxLogo.png'}
							alt={DAO_DICT.expand.imageAlt}
							width={80}
							height={80}
						/>
					</div>
					<div className={'no-translate text-[32px] leading-[32px]'}>
						<span>{DAO_DICT.expand.title.prefix}</span>
						<span className={'font-bold italic text-blue'}>{DAO_DICT.expand.title.suffix}</span>
					</div>
				</div>
				<p className={'text-sm text-gray-500'}>{DAO_DICT.expand.description}</p>
			</div>
			<div className={'col-span-8 p-16'}>
				<div className={'flex flex-row flex-wrap gap-4'}>
					{appDao.slice(0, 4).map(dao => (
						<HeaderItem
							onClick={() => setCurrentTab('empty')}
							key={dao.name}
							name={dao.name}
							href={dao.href}
							description={dao.description}
							icon={dao.icon}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
