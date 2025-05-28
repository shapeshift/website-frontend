import {LocalizedLink} from './LocalizedLink';

import type {ReactNode} from 'react';

type THeaderItemProps = {
	name: string;
	href: string;
	icon: ReactNode;
	target?: string;
	description: string;
	onClick?: () => void;
};

export default function HeaderItem({name, href, target, description, onClick, icon}: THeaderItemProps): ReactNode {
	return (
		<LocalizedLink
			href={href}
			target={target}
			className={
				'flex w-1/3 max-w-[232px] grow gap-2 rounded-lg px-6 py-4 transition-colors duration-300 hover:bg-white/10'
			}
			onClick={onClick}>
			<div className={'w-6'}>{icon}</div>
			<div className={'ml-4 flex flex-col gap-1'}>
				<span className={'whitespace-nowrap font-medium'}>{name}</span>
				<span className={'text-sm text-gray-500'}>{description}</span>
			</div>
		</LocalizedLink>
	);
}
