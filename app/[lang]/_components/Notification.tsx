import {useEffect, useState} from 'react';

import {Modal} from './Modal';
import {NotificationBar} from './NotificationBar';
import {Popup} from './Popup';

import type {TStrapiNotification} from '@/app/[lang]/_components/strapi/types';
import type {ReactNode} from 'react';

/****************************************************************************************************
 * Notification system component that manages different types of notifications (modal, banner,
 * popup) fetched from Strapi CMS. Handles state management for showing/hiding notification types.
 *
 * @return: ReactNode containing the notification UI components (NotificationBar, Modal, Popup)
 ****************************************************************************************************/

/****************************************************************************************************
 * Safe localStorage wrapper to handle cases where localStorage is unavailable (private browsing,
 * storage full, etc.). Returns null on read errors and silently fails on write errors.
 ****************************************************************************************************/
const safeLocalStorage = {
	getItem: (key: string): string | null => {
		try {
			return localStorage.getItem(key);
		} catch {
			return null;
		}
	},
	setItem: (key: string, value: string): void => {
		try {
			localStorage.setItem(key, value);
		} catch (error) {
			console.warn('Failed to save to localStorage:', error);
		}
	}
};

export function Notification(): ReactNode {
	const [notification, setNotification] = useState<TStrapiNotification | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isBannerOpen, setIsBannerOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	/****************************************************************************************************
	 * Fetches notification data from Strapi CMS on component mount. Makes an authenticated API call
	 * to retrieve the current notification configuration.
	 ****************************************************************************************************/
	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async (): Promise<void> => {
			try {
				setIsLoading(true);
				const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/notification?populate=*`, {
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
					},
					signal: abortController.signal
				});

				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}

				const data = await res.json();
				if (data?.data) {
					setNotification(data.data);
				}
			} catch (error) {
				if (error instanceof Error && error.name !== 'AbortError') {
					console.error('Error fetching notification:', error);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, []);

	/****************************************************************************************************
	 * Updates notification visibility based on type and enabled status. Checks localStorage for
	 * dismissed notifications and sets the appropriate state for modal, popup, or banner display.
	 ****************************************************************************************************/
	useEffect(() => {
		if (!notification || isLoading) {
			return;
		}

		const isDismissed = safeLocalStorage.getItem(`notification-dismissed-${notification.title}`) === 'true';

		if (!isDismissed && notification.enabled) {
			setIsBannerOpen(notification.type === 'bar');
			setIsModalOpen(notification.type === 'modal');
			setIsPopupOpen(notification.type === 'popup');
		} else {
			setIsBannerOpen(false);
			setIsModalOpen(false);
			setIsPopupOpen(false);
		}
	}, [notification, isLoading]);

	/****************************************************************************************************
	 * Handles closing of notifications by storing dismissal state in localStorage and updating the
	 * component state to hide the notification.
	 *
	 * @param type: The type of notification to close ('bar', 'modal', or 'popup')
	 ****************************************************************************************************/
	const handleClose = (type: 'bar' | 'modal' | 'popup'): void => {
		if (notification?.title) {
			safeLocalStorage.setItem(`notification-dismissed-${notification.title}`, 'true');
		}

		switch (type) {
			case 'bar':
				setIsBannerOpen(false);
				break;
			case 'modal':
				setIsModalOpen(false);
				break;
			case 'popup':
				setIsPopupOpen(false);
				break;
		}
	};

	if (isLoading) {
		return null;
	}

	return (
		<>
			<NotificationBar
				isOpen={isBannerOpen}
				onClose={() => handleClose('bar')}
				notification={notification}
			/>
			<Modal
				isOpen={isModalOpen}
				onClose={() => handleClose('modal')}
				notification={notification}
			/>
			<Popup
				isOpen={isPopupOpen}
				notification={notification}
				onClose={() => handleClose('popup')}
			/>
		</>
	);
}
