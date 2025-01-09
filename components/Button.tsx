import type {ReactNode} from 'react';

type TButtonProps = {
	title?: string;
};

export function Button({title}: TButtonProps): ReactNode {
	return <button>{title || 'Button'}</button>;
}
