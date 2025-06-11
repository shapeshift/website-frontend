import Image from 'next/image';

import {Button} from '@/app/_components/Button';
import {dAppUrl} from '@/app/_utils/constants';

import type {ReactNode} from 'react';

export default function Page(): ReactNode {
	return (
		<div className={'container mx-auto my-12 h-[50vh]'}>
			<div className={'relative h-full overflow-hidden rounded-2xl'}>
				<Image
					src={'/homepageBanner.png'}
					alt={'404'}
					width={2800}
					height={1008}
					className={'size-full object-cover'}
				/>
				<div
					className={
						'absolute inset-0 mx-auto flex max-w-[800px] flex-col items-center justify-center p-5 text-center'
					}>
					<h1 className={'text-[40px] leading-10 lg:text-7xl'}>
						{"We can't find the page you're looking for."}
					</h1>

					<div className={'mt-14 flex flex-col gap-4 lg:flex-row'}>
						<Button
							title={'Launch App'}
							href={dAppUrl}
							className={'!w-full lg:!w-auto'}
						/>
						<Button
							title={'ShapeShift Home'}
							variant={'white'}
							className={'!w-full lg:!w-max'}
							href={'/'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
