'use client';

import {usePathname} from 'next/navigation';

import {LocalizedLink} from '@/app/_components/LocalizedLink';
import {IconBack} from '@/app/_icons/IconBack';
import {cl} from '@/app/_utils/cl';

export function NewsroomBreadcrumb(): React.ReactNode {
	const pathname = usePathname();

	return (
		<LocalizedLink
			className={cl(
				'mb-6 flex items-center gap-1 px-4 py-2 text-gray-500',
				pathname === '/newsroom' ? 'invisible pointer-events-none' : ''
			)}
			href={'/newsroom'}>
			<IconBack />
			<span>{'Back to Newsroom'}</span>
		</LocalizedLink>
	);
}
