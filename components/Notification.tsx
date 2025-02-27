import {NotificationBar} from './NotificationBar';

import type {ReactNode} from 'react';

export function Notification(): ReactNode {
	// const notification = await getNotification();

	return (
		<NotificationBar
			notification={{
				id: 1,
				title: 'Notification',
				description: 'Notification description',
				type: 'bar'
			}}
		/>
	);
}
