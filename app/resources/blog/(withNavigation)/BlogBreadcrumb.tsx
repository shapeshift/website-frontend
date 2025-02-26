'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {IconBack} from '@/components/common/icons/IconBack';
import {cl} from '@/components/utils/cl';

export function BlogBreadcrumb(): React.ReactNode {
	const pathname = usePathname();

	return (
		<Link
			className={cl(
				'mb-6 flex items-center gap-1 py-2 text-gray-500',
				pathname === '/resources/blog' ? 'invisible pointer-events-none' : ''
			)}
			href={'/resources/blog'}>
			<IconBack />
			<span className={'ml-2'}>{'Back to blog'}</span>
		</Link>
	);
}
