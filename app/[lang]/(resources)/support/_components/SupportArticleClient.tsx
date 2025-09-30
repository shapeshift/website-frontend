'use client'

import {useRouter, useSearchParams} from 'next/navigation'

import {IconBack} from '@/app/[lang]/_icons/IconBack'

import type {ReactNode} from 'react'

export default function SupportArticleClient(): ReactNode {
	const router = useRouter()
	const searchParams = useSearchParams()
	const sourceTag = searchParams?.get('tag') ?? undefined

	return (
		<>
			<button
				type={'button'}
				className={'absolute -left-32 top-0 hidden lg:flex items-center gap-1 p-3 pt-0 text-gray-500'}
				onClick={() => router.back()}
				aria-label={'Go back to previous page'}>
				<IconBack />
				<span>{'Back'}</span>
			</button>
			{sourceTag && <p className={'mb-2 text-sm text-gray-400'}>{sourceTag}</p>}
		</>
	)
}
