'use client';

import {useParams} from 'next/navigation';

import {blogTagsSlugToCategory} from '@/components/constants';

export function BlogTitle(): React.ReactNode {
	const params = useParams();
	const category = (params.category as string) || '';

	if (category) {
		return (
			<div className={'mb-8 text-7xl'}>
				<span className={'text-white'}>{'Tagged: '}</span>
				&nbsp;
				<span className={'capitalize text-blue'}>{blogTagsSlugToCategory(category)}</span>
			</div>
		);
	}
	return (
		<div className={'mb-8 text-7xl'}>
			<span className={'text-white'}>{'ShapeShift'}</span>
			&nbsp;
			<span className={'text-blue'}>{'Blog.'}</span>
		</div>
	);
}
