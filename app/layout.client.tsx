'use client';

import {usePathname} from 'next/navigation';
import {useRef, useState} from 'react';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/header/Header';
import {Modal} from '@/components/Modal';
import {NotificationBar} from '@/components/NotificationBar';
import {Popup} from '@/components/Popup';
import {cl} from '@/components/utils/cl';

import type {TStrapiNotification} from '@/types/strapi';
import type {ReactNode} from 'react';

/********************************************************************************************
 * Client layout wrapper component
 * Handles header visibility based on current path
 ********************************************************************************************/
export function LayoutClient({
	children,
	notification
}: {
	children: ReactNode;
	notification: TStrapiNotification | null;
}): ReactNode {
	const pathname = usePathname();
	const [isPopupOpen, setIsPopupOpen] = useState(notification?.type === 'popup');
	const [isModalOpen, setIsModalOpen] = useState(notification?.type === 'modal');
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div className={'flex flex-col px-4'}>
			{isPopupOpen && (
				<Popup
					notification={notification}
					onClose={() => setIsPopupOpen(false)}
				/>
			)}
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					notification={notification}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
			{notification?.type === 'bar' && (
				<div>
					<NotificationBar
						notification={notification}
						ref={ref}
					/>
				</div>
			)}
			<div
				style={{
					marginTop: notification?.type === 'bar' ? `${ref.current?.clientHeight}px` : 0
				}}
				className={cl('z-50 w-full', notification?.type === 'bar' ? 'lg:mt-20' : '')}>
				<Header />
			</div>

			<main className={cl('relative', notification?.type === 'bar' ? 'rounded-t-2xl' : '')}>{children}</main>
			<Footer />
		</div>
	);
}
