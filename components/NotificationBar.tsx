import {Button} from '@/components/common/Button';

import type {TStrapiNotification} from '@/types/strapi';
import type {ReactElement} from 'react';

export function NotificationBar({notification}: {notification: TStrapiNotification}): ReactElement {
	return (
		<>
			<div
				className={
					'-px-4 static top-0 z-50 -mx-4 flex h-80 w-full flex-col items-center justify-center gap-4 bg-blue p-6 pb-4 lg:h-20 lg:flex-row'
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
			<div className={'fixed top-[19rem] z-50 -mx-6 h-10 w-full overflow-hidden rounded-t-2xl bg-bg lg:top-16'} />
		</>
	);
}
