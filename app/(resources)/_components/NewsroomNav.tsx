'use client';

import {useParams, usePathname} from 'next/navigation';

import {TabItem} from '@/app/_components/TabItem';
import {newsroomCategories, newsroomTags} from '@/app/_utils/constants';

export function NewsroomNav(): React.ReactNode {
	const pathname = usePathname();
	const params = useParams();
	const category = (params.category as string) || '';
	const tag = (params.tag as string) || '';

	if (tag || pathname.includes('/tags')) {
		return (
			<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
				{newsroomTags.map(tab => (
					<TabItem
						key={tab.slug}
						title={tab.title}
						selected={tag ? tag.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
						href={tab.slug === 'all' ? '/newsroom/tags' : `/newsroom/tags/${tab.slug}`}
					/>
				))}
			</div>
		);
	}
	return (
		<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
			{newsroomCategories.map(tab => (
				<TabItem
					key={tab.slug}
					title={tab.title}
					selected={category ? category.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
					href={tab.slug === 'all' ? '/newsroom' : `/newsroom/categories/${tab.slug}`}
				/>
			))}
		</div>
	);
}
