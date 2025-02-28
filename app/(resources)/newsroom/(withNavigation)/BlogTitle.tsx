'use client';

import {useParams, usePathname} from 'next/navigation';

import {newsroomCategoriesSlugToCategory} from '@/components/constants';

export function BlogTitle(): React.ReactNode {
	const pathname = usePathname();
	const params = useParams();
	const category = (params.category as string) || '';
	const tag = (params.tag as string) || '';

	if (tag || pathname.includes('/tags')) {
		if (tag) {
			return (
				<div className={'mb-8 text-7xl'}>
					<span className={'text-white'}>{'Tagged: '}</span>
					<span className={'capitalize text-blue'}>{tag}</span>
				</div>
			);
		}
		return (
			<div className={'mb-8 text-7xl'}>
				<span className={'text-white'}>{'All '}</span>
				<span className={'capitalize text-blue'}>{'tags'}</span>
			</div>
		);
	}

	if (category) {
		return (
			<div className={'mb-8 text-7xl'}>
				<span className={'text-white'}>{'Category: '}</span>
				<span className={'capitalize text-blue'}>{newsroomCategoriesSlugToCategory(category)}</span>
			</div>
		);
	}
	return (
		<div className={'mb-8 text-[40px] leading-10 lg:text-7xl'}>
			<span className={'text-white'}>{'ShapeShift'}</span>
			&nbsp;
			<span className={'text-blue'}>{'Newsroom'}</span>
			<span className={'hidden text-blue lg:inline'}>{'.'}</span>
		</div>
	);
}
