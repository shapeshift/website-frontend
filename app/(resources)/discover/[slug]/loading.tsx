import type {ReactNode} from 'react';

export default function Loading(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col items-center justify-center'}>
				{/* Header Section */}
				<section className={'my-16 flex flex-col items-center'}>
					<div className={'mb-24 flex w-[400px] justify-between gap-4'}>
						<div className={'h-8 w-96 animate-pulse rounded-2xl bg-white/5'} />
						<div className={'h-8 w-96 animate-pulse rounded-2xl bg-white/5'} />
						<div className={'h-8 w-96 animate-pulse rounded-2xl bg-white/5'} />
					</div>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<div
							className={
								'mb-12 h-[30px] w-[300px] animate-pulse rounded-2xl bg-white/5 lg:h-24 lg:w-[450px]'
							}
						/>
					</div>
					<div className={'flex items-center gap-4'}>
						<div className={'size-10 animate-pulse rounded-full bg-white/5'} />
						<div className={'flex flex-col gap-2'}>
							<div className={'h-4 w-32 animate-pulse rounded bg-white/5'} />
							<div className={'h-3 w-24 animate-pulse rounded bg-white/5'} />
						</div>
					</div>
				</section>

				{/* Content Section */}
				<section className={'mb-16 w-full max-w-3xl'}>
					<div className={'flex flex-col gap-6'}>
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className={'flex flex-col gap-4'}>
								<div className={'h-6 w-3/4 animate-pulse rounded bg-white/5'} />
								<div className={'flex flex-col gap-2'}>
									<div className={'h-4 w-full animate-pulse rounded bg-white/5'} />
									<div className={'h-4 w-full animate-pulse rounded bg-white/5'} />
									<div className={'h-4 w-2/3 animate-pulse rounded bg-white/5'} />
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Tags Section */}
				<section className={'mb-16 w-full max-w-3xl'}>
					<div className={'flex flex-wrap gap-2'}>
						{[...Array(4)].map((_, index) => (
							<div
								key={index}
								className={'h-8 w-24 animate-pulse rounded-full bg-white/5'}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
