'use client';

import {useParams} from 'next/navigation';

import {TabItem} from '@/components/common/TabItem';
import {blogTabs} from '@/components/constants';

export function BlogNav(): React.ReactNode {
	const params = useParams();
	const category = (params.category as string) || '';

	return (
		<div className={'mb-6 flex w-max gap-4 rounded-full p-1'}>
			{blogTabs.map(tab => (
				<TabItem
					key={tab.slug}
					title={tab.title}
					selected={category ? category.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
					href={tab.slug === 'all' ? '/resources/blog' : `/resources/blog/categories/${tab.slug}`}
				/>
			))}
		</div>
	);
}
