import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from '@headlessui/react';
import Image from 'next/image';
import {Fragment} from 'react';

import {Button} from './common/Button';
import {RoundButton} from './common/RoundButton';
import {cl} from './utils/cl';

import type {ReactElement} from 'react';

type TModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
	title?: string;
	className?: string;
};

export function Modal({isOpen, onClose, title, className}: TModalProps): ReactElement {
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
									<DialogTitle
										as={'h3'}
										className={
											'text-primary-900 mx-2 text-xl font-bold leading-6 md:mx-4 md:text-3xl'
										}>
										{title}
									</DialogTitle>
								</div>
								<div className={'flex flex-col items-center'}>
									<div className={'mb-6 rounded-[24px] bg-blue/10 px-6 py-2 text-blue'}>
										{'Product update'}
									</div>

									<h2 className={'mb-4 text-[40px] leading-[40px]'}>{'Multichain Snap is LIVE!'}</h2>

									<p className={'mb-10 text-gray-500'}>
										{
											"We don't track any personal information, including your IP address or wallet balances."
										}
									</p>

									<Button
										href={'#'}
										title={'Learn more'}
										variant={'blue'}
										hasArrow
									/>

									<Image
										src={'/modalImage.png'}
										alt={'modalImage'}
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
