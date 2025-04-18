'use client';

import {ChevronDown} from 'lucide-react';
import {useState} from 'react';

import {cl} from '@/components/utils/cl';

import {IconCheck} from './icons/IconCheck';

import type {ReactNode} from 'react';

type TDropdownProps = {
	options: string[];
	value: string;
	onChangeAction: (value: string) => void;
	className?: string;
	allItemsLabel?: string;
};

/**************************************************************************************************
 ** Dropdown Component
 **
 ** A dropdown component that allows users to select an option from a list.
 **
 ** @param {TDropdownProps} props - Component props containing options, value, onChangeAction,
 ** className, and allItemsLabel
 ** @returns {ReactNode} Rendered dropdown component
 *************************************************************************************************/

export function Dropdown({
	options,
	value,
	onChangeAction,
	className,
	allItemsLabel = 'All chains'
}: TDropdownProps): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	const allOptions = [allItemsLabel, ...options];

	return (
		<div className={'relative'}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cl(
					'flex w-full items-center border border-white/5 justify-between rounded-full bg-white/5 px-6 py-2 text-left transition-colors hover:bg-secondHoverBg',
					className
				)}>
				<span>{value}</span>
				<ChevronDown className={cl('ml-2 transition-transform size-6', isOpen ? 'rotate-180' : '')} />
			</button>

			{isOpen && (
				<div
					className={
						'absolute right-0 top-10 z-50 mt-2 flex w-[240px] flex-col gap-1 overflow-hidden rounded-2xl bg-secondBg p-1'
					}>
					{allOptions.map(option => (
						<button
							key={option}
							onClick={() => {
								onChangeAction(option);
								setIsOpen(false);
							}}
							className={cl(
								'flex w-full items-center justify-between px-6 rounded-lg py-4 text-left transition-colors hover:bg-white/10',
								option === value ? 'bg-white/10' : ''
							)}>
							<span>{option}</span>
							{option === value && <IconCheck className={'size-3'} />}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
