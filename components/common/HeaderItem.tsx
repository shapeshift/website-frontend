import Link from 'next/link';

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
		<Link
			href={href}
			target={target}
			className={'flex max-w-[232px] gap-2 rounded-lg px-6 py-4 transition-colors duration-300 hover:bg-white/10'}
			onClick={onClick}>
			<div>{icon}</div>
			<div className={'ml-4 flex flex-col gap-1'}>
				<span className={'font-medium'}>{name}</span>
				<span className={'text-gray-500'}>{description}</span>
			</div>
		</Link>
	);
}
