import {Button} from '@/components/common/Button';

import type {TStrapiNotification} from '@/types/strapi';
import type {ReactElement} from 'react';

export function NotificationBar({notification}: {notification: TStrapiNotification}): ReactElement {
	return (
		<div
			className={
				'sticky inset-x-0 top-0 z-50 mt-2 flex h-80 w-full flex-col items-center justify-center gap-4 rounded-lg bg-blue p-4 lg:h-20 lg:flex-row'
			}>
			<p>{notification.title}</p>
			<p className={'text-center lg:text-left'}>{notification.description}</p>
			<Button
				title={'Learn more'}
				variant={'blue'}
				hasArrow
				href={notification?.href ?? '#'}
				className={'!h-10 !w-[152px] !rounded-[24px] !border !border-white/10 hover:!scale-100 '}
			/>
		</div>
	);
}
