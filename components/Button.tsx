type TButtonProps = {
	title?: string;
};

export function Button({title}: TButtonProps) {
	return <button>{title || 'Button'}</button>;
}
