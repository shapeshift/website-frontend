import {Fragment} from 'react';

import {Banner} from '@/app/_components/Banner';
import {RESOURCES_DICT} from '@/app/_utils/dictionary/resources';

import type {ReactNode} from 'react';

type TSupportArticleListSkeletonProps = {
	pageSize?: number;
};

export function SupportArticleListSkeleton({pageSize = 6}: TSupportArticleListSkeletonProps): ReactNode {
	return (
		<Fragment>
			<div className={'container mx-auto'}>
				{/* Header */}
				<div className={'my-[120px] flex flex-col gap-4'}>
					<h1 className={'text-2x l text-center lg:text-7xl'}>{RESOURCES_DICT.support.title}</h1>
					<p className={'text-center text-xl text-gray-500'}>{RESOURCES_DICT.support.description}</p>
				</div>

				{/* Articles grid skeleton */}
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{Array.from({length: pageSize}).map((_, i) => (
						<div
							key={i}
							className={'flex items-center gap-4 rounded-2xl bg-secondBg p-6'}>
							<div className={'size-16 animate-pulse rounded-2xl bg-gray-800'} />
							<div className={'flex-1 space-y-2'}>
								<div className={'h-6 w-3/4 animate-pulse rounded bg-gray-800'} />
								<div className={'h-4 w-1/2 animate-pulse rounded bg-gray-800'} />
							</div>
						</div>
					))}
				</div>

				{/* Pagination skeleton */}
				<div className={'mb-12 flex items-center justify-center gap-2'}>
					<div className={'size-12 animate-pulse rounded bg-gray-800'} />
					<div className={'size-12 animate-pulse rounded bg-gray-800'} />
					<div className={'size-12 animate-pulse rounded bg-gray-800'} />
				</div>

				{/* Banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</Fragment>
	);
}
