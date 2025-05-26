import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {RESOURCES_DICT} from '@/components/dictionary/resources';

import type {ReactNode} from 'react';

export default function Loading(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col items-center justify-center lg:mt-48'}>
				<section className={'my-16 flex flex-col items-center'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-[40px] leading-10 lg:text-7xl'}>{RESOURCES_DICT.discover.title}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>

				<section className={'mt-8 w-full'}>
					<div className={'mb-20 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3'}>
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className={'flex flex-col gap-4 rounded-lg bg-white/5 p-4'}>
								<div className={'h-48 w-full animate-pulse rounded-lg bg-white/5'} />
								<div className={'h-6 w-3/4 animate-pulse rounded bg-white/5'} />
								<div className={'flex flex-col gap-2'}>
									<div className={'h-4 w-full animate-pulse rounded bg-white/5'} />
									<div className={'h-4 w-2/3 animate-pulse rounded bg-white/5'} />
								</div>
							</div>
						))}
					</div>
				</section>
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
