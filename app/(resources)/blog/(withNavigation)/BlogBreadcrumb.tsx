'use client';

import {usePathname} from 'next/navigation';

import {LocalizedLink} from '@/app/_components/LocalizedLink';
import {IconBack} from '@/app/_icons/IconBack';
import {cl} from '@/app/_utils/cl';

/********************************************************************************************
 * Blog Breadcrumb Navigation Component
 *
 * Provides a back link to the main blog page.
 * Automatically hides when on the main blog page.
 ********************************************************************************************/
export function BlogBreadcrumb(): React.ReactNode {
	const pathname = usePathname();

	return (
		<LocalizedLink
			className={cl(
				'mb-6 flex items-center gap-1 py-2 text-gray-500',
				pathname === '/blog' ? 'invisible pointer-events-none' : ''
			)}
			href={'/blog'}>
			<IconBack />
			<span className={'ml-2'}>{'Back to blog'}</span>
		</LocalizedLink>
	);
}
