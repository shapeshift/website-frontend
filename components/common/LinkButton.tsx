import {ReactNode} from 'react';
import {Button, TButtonVariant} from './Button';
import Link from 'next/link';
import {IconNext} from './icons/IconNext';

type TLinkButtonProps = {
	title: string;
	href: string;
	variant?: TButtonVariant;
};

export function LinkButton(props: TLinkButtonProps): ReactNode {
	return (
		<Button variant={props.variant}>
			<div className={'flex items-center w-full justify-between'}>
				<Link href={props.href}>{props.title}</Link>
				<IconNext />
			</div>
		</Button>
	);
}
