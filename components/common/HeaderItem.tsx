import Link from 'next/link';

import {IconResource} from './icons/IconResource';

import type {ReactNode} from 'react';

type THeaderItemProps = {
	name: string;
	href: string;
	target?: string;
	description: string;
	onClick?: () => void;
};

export default function HeaderItem({name, href, target, description, onClick}: THeaderItemProps): ReactNode {
	return (
		<Link
			href={href}
			target={target}
			className={'flex max-w-[232px] gap-2 px-6 py-4'}
			onClick={onClick}>
			<div>
				<IconResource />
			</div>
			<div className={'ml-4 flex flex-col gap-1'}>
				<span className={'font-medium'}>{name}</span>
				<span className={'text-secondary'}>{description}</span>
			</div>
		</Link>
	);
}
