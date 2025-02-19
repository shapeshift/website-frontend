export default function BlogTagsLoading(): React.ReactNode {
	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-8 h-16 w-96 animate-pulse rounded-lg bg-gray-800'} />

			<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
					/>
				))}
			</div>
		</main>
	);
}
