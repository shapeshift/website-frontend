import {useEffect, useState} from 'react';

import {Modal} from './Modal';
import {NotificationBar} from './NotificationBar';
import {Popup} from './Popup';

import type {TStrapiNotification} from '@/types/strapi';
import type {ReactNode} from 'react';

export function Notification(): ReactNode {
	const [notification, setNotification] = useState<TStrapiNotification | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isBannerOpen, setIsBannerOpen] = useState(false);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const res = await fetch(`${process.env.STRAPI_URL}/api/notification?populate=*`, {
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
				}
			});
			const data = await res.json();
			setNotification(data.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		setIsBannerOpen(notification?.type === 'bar' && notification?.enabled);
		setIsModalOpen(notification?.type === 'modal' && notification?.enabled);
		setIsPopupOpen(notification?.type === 'popup' && notification?.enabled);
	}, [notification]);

	return (
		<>
			<NotificationBar
				isOpen={isBannerOpen}
				onClose={() => setIsBannerOpen(false)}
				notification={notification}
			/>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				notification={notification}
			/>
			<Popup
				isOpen={isPopupOpen}
				notification={notification}
				onClose={() => setIsPopupOpen(false)}
			/>
		</>
	);
}
