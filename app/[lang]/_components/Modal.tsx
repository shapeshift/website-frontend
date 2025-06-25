import {Dialog, DialogPanel, Transition, TransitionChild} from '@headlessui/react';
import Image from 'next/image';
import {Fragment} from 'react';

import {Button} from '@/app/[lang]/_components/Button';

import {RoundButton} from './RoundButton';
import {cl} from '../_utils/cl';

import type {TStrapiNotification} from '@/app/[lang]/_components/strapi/types';
import type {ReactElement} from 'react';

type TModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
	notification: TStrapiNotification | null;
	className?: string;
};

export function Modal({isOpen, onClose, notification, className}: TModalProps): ReactElement {
	return (
		<Transition
			show={isOpen}
			as={Fragment}>
			<Dialog
				as={'div'}
				className={'relative z-[1000]'}
				onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter={'ease-out duration-300'}
					enterFrom={'opacity-0'}
					enterTo={'opacity-100'}
					leave={'ease-in duration-200'}
					leaveFrom={'opacity-100'}
					leaveTo={'opacity-0'}>
					<div className={'fixed inset-0 bg-[#0C0D0F80] backdrop-blur-lg transition-opacity'} />
				</TransitionChild>
				<div className={'fixed inset-0 z-[1001] overflow-y-auto'}>
					<div
						className={
							'flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'
						}>
						<TransitionChild
							as={Fragment}
							enter={'ease-out duration-300'}
							enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
							enterTo={'opacity-100 translate-y-0 sm:scale-100'}
							leave={'ease-in duration-200'}
							leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
							leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
							<DialogPanel
								className={cl(
									'relative overflow-hidden border min-h-[568px] border-white/10 flex max-w-2xl',
									'flex-col items-center justify-start rounded-[24px]',
									'bg-secondBg !p-10 transition-all',
									'sm:my-8 sm:w-full md:max-w-2xl sm:max-w-lg',
									className
								)}>
								<div className={'top-0 flex'}>
									<div
										className={
											'absolute right-3 top-5 mx-2 p-2 text-neutral-600 transition-colors hover:text-neutral-700'
										}
										onClick={onClose}>
										<RoundButton iconName={'cross'} />
									</div>
								</div>
								<div className={'flex flex-col items-center'}>
									{notification?.tag && (
										<div className={'mb-6 rounded-[24px] bg-blue/10 px-6 py-2 text-blue'}>
											{notification?.tag}
										</div>
									)}

									<h2 className={'mb-4 text-2xl lg:text-[40px] lg:leading-[40px]'}>
										{notification?.title ?? ''}
									</h2>

									<p className={'mb-10 text-gray-500'}>{notification?.description ?? ''}</p>

									<Button
										href={notification?.href ?? 'https://app.shapeshift.com/'}
										title={'Learn more'}
										variant={'blue'}
										hasArrow
									/>

									<Image
										src={'/modalBg.png'}
										alt={'modal-background'}
										width={1600}
										height={480}
										className={'absolute inset-x-0 bottom-0'}
									/>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
