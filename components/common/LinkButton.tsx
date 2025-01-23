import Link from 'next/link';

import {Button} from './Button';
import {IconNext} from './icons/IconNext';

import type {TButtonVariant} from './Button';
import type {ReactNode} from 'react';

type TLinkButtonProps = {
	title: string;
	href: string;
	variant?: TButtonVariant;
};

export function LinkButton(props: TLinkButtonProps): ReactNode {
	return (
		<Button variant={props.variant}>
			<div className={'flex w-full items-center justify-between'}>
				<Link href={props.href}>{props.title}</Link>
				<IconNext />
			</div>
		</Button>
	);
}
