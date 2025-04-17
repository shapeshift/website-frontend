'use client';

type TSearchProps = {
	searchQuery: string;
	setSearchQueryAction: (query: string) => void;
};

export function Search({searchQuery, setSearchQueryAction}: TSearchProps): JSX.Element {
	return (
		<div className={'relative mb-8'}>
			<div className={'flex w-full justify-center'}>
				<input
					type={'text'}
					value={searchQuery}
					onChange={e => setSearchQueryAction(e.target.value)}
					placeholder={'Search'}
					className={
						'w-1/2 rounded-2xl border-none bg-white/5 px-5 py-6 text-white outline-none focus:border-none focus:outline-none focus:ring-1 focus:ring-white/50'
					}
				/>
			</div>
		</div>
	);
}
