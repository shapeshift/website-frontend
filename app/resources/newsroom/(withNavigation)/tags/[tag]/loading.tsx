export default function NewsroomTagsLoading(): React.ReactNode {
	return (
		<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
			{[...Array(12)].map((_, i) => (
				<div
					key={i}
					className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
				/>
			))}
		</div>
	);
}
