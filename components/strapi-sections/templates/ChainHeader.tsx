import {Button} from '@/components/common/Button';
import {IconCheck} from '@/components/common/icons/IconCheck';

import type {ReactNode} from 'react';

export function ChainHeader({chainName}: {chainName: string}): ReactNode {
	return (
		<section className={'flex flex-col items-center'}>
			<div className={'mb-10 flex gap-2'}>
				{['Self-custodial', 'Private', 'Multichain trading'].map(item => (
					<div
						className={'flex items-center gap-1 rounded-[24px] bg-secondBg px-4 py-[10px]'}
						key={item}>
						<IconCheck className={'text-blue'} />
						<span className={'text-blue'}>{item}</span>
					</div>
				))}
			</div>
			<div className={'mb-10 flex flex-col items-center gap-2'}>
				<h1 className={'mb-6 text-7xl'}>{`ShapeShift supports ${chainName}`}</h1>
				<p className={'mx-auto max-w-screen-lg text-center text-xl text-gray-500'}>
					{`Unlock the best way to use and manage your ${chainName}`}
				</p>
			</div>
			<Button
				variant={'blue'}
				href={'https://app.shapeshift.com'}
				title={'Get Started'}
			/>
		</section>
	);
}
