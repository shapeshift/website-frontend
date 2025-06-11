import {motion} from 'motion/react';
import Link from 'next/link';

import {IconArrow} from '../_icons/IconArrow';
import {IconClose} from '../_icons/IconClose';
import {cl} from '../_utils/cl';
import {popupAnimation} from '../_utils/constants';

import type {TStrapiNotification} from '@/app/_components/strapi/types';
import type {ReactElement} from 'react';

/************************************************************************************************
 * Notification Popup Component
 * Bottom-right notification popup with dark theme
 * Features:
 * - Slide-up animation
 * - Dark theme design
 * - Responsive design
 * - Call-to-action button with arrow
 * - Background image from Strapi
 ************************************************************************************************/
export function Popup({
	notification,
	onClose,
	isOpen
}: {
	notification: TStrapiNotification | null;
	onClose: () => void;
	isOpen: boolean;
}): ReactElement {
	return (
		<>
			{isOpen && (
				<div
					style={{
						bottom: '24px',
						right: '24px'
					}}
					className={'fixed bottom-6 right-6 z-[1005]'}>
					<motion.div
						variants={popupAnimation}
						initial={'initial'}
						animate={'animate'}
						exit={'exit'}
						className={cl(
							'relative flex flex-col',
							'w-[400px] min-h-[200px]',
							'rounded-2xl',
							'bg-[#12141A] border border-white/10',
							'p-6 pb-8',
							'transition-all duration-300',
							'max-md:w-[350px] max-md:p-4'
						)}
						style={{
							...(notification?.bgImage?.url
								? {
										background: `url(${`${process.env.STRAPI_URL}${notification.bgImage.url}`}) no-repeat center center`,
										backgroundSize: 'cover'
									}
								: null)
						}}>
						<button
							onClick={onClose}
							className={cl(
								'absolute right-4 top-4',
								'w-10 h-10 rounded-full',
								'bg-[#2a2d35] hover:bg-[#3a3d45]',
								'flex items-center justify-center',
								'transition-colors duration-200',
								'text-white/70 hover:text-white'
							)}
							aria-label={'Close notification'}>
							<IconClose
								width={16}
								height={16}
							/>
						</button>
						<div className={'flex-1 pr-8'}>
							<h2 className={'mb-4 text-2xl font-bold leading-tight text-white'}>
								{notification?.title ?? ''}
							</h2>
							<p className={'mb-6 text-base leading-relaxed text-white/80'}>
								{notification?.description ?? ''}
							</p>
						</div>
						<Link
							href={notification?.href ?? '#'}
							className={cl(
								'inline-flex items-center gap-3',
								'px-6 py-3 rounded-full',
								'bg-white text-black',
								'font-medium text-base',
								'hover:bg-gray-100',
								'transition-colors duration-200',
								'no-underline w-max'
							)}>
							{'Learn more'}
							<IconArrow
								width={20}
								height={20}
								strokeWidth={2}
								className={'size-4 rotate-45'}
							/>
						</Link>
					</motion.div>
				</div>
			)}
		</>
	);
}
