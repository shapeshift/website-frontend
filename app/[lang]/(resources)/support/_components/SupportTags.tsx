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
			<div className={'flex flex-wrap gap-3 justify-center'}>
				<button
					type={'button'}
					onClick={() => onClick(null)}
					className={`rounded-full border px-4 py-2 text-sm ${
						active === null || active === undefined ? 'bg-white/10' : 'bg-transparent'
					}`}>
					{'All'}
				</button>
				{tags.map(t => (
					<button
						type={'button'}
						key={t}
						onClick={() => onClick(t)}
						className={`rounded-full border px-4 py-2 text-sm ${active === t ? 'bg-white/10' : 'bg-transparent'}`}>
						{t}
					</button>
				))}
			</div>
		</div>
	)
}
