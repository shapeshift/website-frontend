import type {ReactNode} from 'react';

export function BlogSkeleton(): ReactNode {
	return (
		<div className={'container relative mx-auto mb-96 mt-40 max-w-4xl px-4'}>
			<div className={'absolute -left-32 top-0 h-10 w-20 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'mb-8 h-6 w-32 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'mb-8 flex gap-2'}>
				<div className={'h-6 w-24 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-6 w-24 animate-pulse rounded-lg bg-gray-800'} />
			</div>
			<div className={'mb-8 h-12 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'space-y-4'}>
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-5/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-5/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
			</div>
		</div>
	);
}
