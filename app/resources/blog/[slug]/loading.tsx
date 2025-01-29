import type {ReactNode} from 'react';

export default function Loading(): ReactNode {
	console.log('loading');
	return (
		<div className={'container mx-auto px-4 py-8'}>
			<div className={'animate-pulse'}>
				<div className={'mb-4 h-8 w-3/4 rounded bg-slate-700'}></div>
				<div className={'mb-8 h-4 w-1/4 rounded bg-slate-700'}></div>
				<div className={'space-y-4'}>
					<div className={'h-4 rounded bg-slate-700'}></div>
					<div className={'h-4 rounded bg-slate-700'}></div>
					<div className={'h-4 w-5/6 rounded bg-slate-700'}></div>
				</div>
			</div>
		</div>
	);
}
