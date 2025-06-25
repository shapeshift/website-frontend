'use client';

import {useParams, usePathname} from 'next/navigation';

import {TabItem} from '@/app/[lang]/_components/TabItem';
import {blogTags, blogTypes} from '@/app/[lang]/_utils/constants';

export function BlogNav(): React.ReactNode {
	const pathname = usePathname();
	const params = useParams();
	const category = (params.category as string) || '';
	const tag = (params.tag as string) || '';

	if (tag || pathname.includes('/tags')) {
		return (
			<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
				{blogTags.map(tab => (
					<TabItem
						key={tab.slug}
						title={tab.title}
						selected={tag ? tag.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
						href={tab.slug === 'all' ? '/blog/tags' : `/blog/tags/${tab.slug}`}
					/>
				))}
			</div>
		);
	}
	return (
		<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
			{blogTypes.map(tab => (
				<TabItem
					key={tab.slug}
					title={tab.title}
					selected={category ? category.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
					href={tab.slug === 'all' ? '/blog' : `/blog/categories/${tab.slug}`}
				/>
			))}
		</div>
	);
}
