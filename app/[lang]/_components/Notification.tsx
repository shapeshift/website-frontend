import {useEffect, useState} from 'react';

import {Modal} from './Modal';
import {NotificationBar} from './NotificationBar';
import {Popup} from './Popup';

import type {TStrapiNotification} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

/********************************************************************************************
 * Notification System Component
 *
 * Manages different types of notifications (modal, banner, popup) fetched from Strapi CMS.
 * Handles state management for showing/hiding different notification types.
 ********************************************************************************************/

export function Notification(): ReactNode {
	const [notification, setNotification] = useState<TStrapiNotification | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isBannerOpen, setIsBannerOpen] = useState(false);

	/* Effect: Fetches notification data from Strapi CMS
	 * Runs once on component mount
	 */
	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const res = await fetch(`${process.env.STRAPI_URL}/api/notification?populate=*`, {
					headers: {
						Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
					}
				});
				const data = await res.json();
				setNotification(data.data);
			} catch (error) {
				console.error('Error fetching notification:', error);
			}
		};
		fetchData();
	}, []);

	/* Effect: Updates notification visibility based on type and enabled status
	 * Deps: notification - Reruns when notification data changes
	 */
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
