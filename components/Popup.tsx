import {motion} from 'motion/react';

import {Button} from './common/Button';
import {RoundButton} from './common/RoundButton';
import {popupAnimation} from './constants';
import {cl} from './utils/cl';

import type {TStrapiNotification} from '@/types/strapi';
import type {ReactElement} from 'react';

/************************************************************************************************
 * Jumper Popup Component
 * Final slide popup showing user achievements
 * Features:
 * - Slide-up animation
 * - Hover effects
 * - Responsive design
 * - Call-to-action button
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
					className={'fixed bottom-6 right-6 z-[1005] rounded-2xl'}>
					<motion.div
						variants={popupAnimation}
						initial={'initial'}
						animate={'animate'}
						exit={'exit'}
						className={cl(
							'group max-md:gap-2 md:left-auto',
							'lg:h-[254px] lg:w-[480px]',
							'md:h-60 md:w-60 max-h-[300px]',
							'md:-translate-x-0 flex flex-col',
							'rounded-2xl border border-white/10',
							'pt-6 justify-between pb-4 px-4 [box-shadow:0px_0px_80px_0px_#FFFFFF33_inset]',
							'hover:border-[#FFFFFF66]',
							'transition-[box-shadow,border-color] duration-300'
						)}
						style={{
							background: 'url(/popup-bg.png) no-repeat center center'
						}}>
						<div className={'absolute right-2 top-2'}>
							<RoundButton
								iconName={'cross'}
								onClick={onClose}
							/>
						</div>
						<div>
							<div className={'mb-2 flex items-center justify-between'}>
								<span className={'text-2xl font-bold text-white'}>{notification?.title ?? ''}</span>
							</div>
							<p className={'max-w-[300px]'}>{notification?.description ?? ''}</p>
						</div>
						<Button
							title={'Learn More'}
							className={'!h-10 !w-[144px] !rounded-[24px] !bg-white !text-black'}
							hasArrow
							href={notification?.href ?? '#'}
						/>
					</motion.div>
				</div>
			)}
		</>
	);
}
