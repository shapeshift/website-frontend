import type {ReactNode} from 'react'

export function SupportTags({
	tags,
	active,
	onClick,
	className
}: {
	tags: string[]
	active?: string | null
	onClick: (tag: string | null) => void
	className?: string
}): ReactNode {
	if (!tags || tags.length === 0) {
		return null
	}
	return (
		<div className={`${className ?? ''} mb-10`}>
			{/* Horizontal scroll on small screens, normal wrapped layout on sm+ */}
			<div className={'flex flex-wrap gap-3 justify-center -mx-4 px-4 py-2'}>
				<button
					type={'button'}
					onClick={() => onClick(null)}
					className={`rounded-full border text-sm whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 ${
						active === null || active === undefined ? 'bg-blue' : 'bg-transparent'
					}`}>
					{'All'}
				</button>
				{tags.map(t => (
					<button
						type={'button'}
						key={t}
						onClick={() => onClick(t)}
						className={`rounded-full border text-sm whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 ${
							active === t ? 'bg-blue' : 'bg-transparent'
						}`}>
						{t}
					</button>
				))}
			</div>
		</div>
	)
}
