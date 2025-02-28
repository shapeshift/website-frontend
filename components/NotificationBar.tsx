import {Button} from '@/components/common/Button';

import {IconClose} from './common/icons/IconClose';

import type {TStrapiNotification} from '@/components/strapi/types';
import type {ReactElement} from 'react';

export function NotificationBar({
	notification,
	onClose,
	isOpen
}: {
	notification: TStrapiNotification | null;
	onClose: () => void;
	isOpen: boolean;
}): ReactElement | null {
	if (!notification) {
		return null;
	}
	return (
		<>
			{isOpen && (
				<div className={'relative'}>
					<div
						className={
							'inset-x-0 top-0 z-50 -mx-4 mb-6 flex w-screen flex-col items-center justify-center gap-4 bg-blue p-4 px-16 lg:flex-row'
						}>
						<p className={'whitespace-nowrap'}>{notification.title}</p>
						<p className={'text-center lg:text-left'}>{notification.description}</p>
						<Button
							title={'Learn more'}
							variant={'blue'}
							hasArrow
							href={notification?.href ?? '#'}
							className={
								'!h-10 !min-w-[152px] !rounded-[24px] !border !border-white/10 hover:!scale-100 '
							}
						/>
						<button
							onClick={onClose}
							className={'absolute right-0 top-4'}>
							<IconClose />
						</button>
					</div>
				</div>
			)}
		</>
	);
}
