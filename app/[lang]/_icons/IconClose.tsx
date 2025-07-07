import type {ReactNode, SVGProps} from 'react';

export const IconClose = (props: SVGProps<SVGSVGElement>): ReactNode => {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M18.3638 5.63623L5.63585 18.3642'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M18.3638 18.3638L5.63585 5.63585'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
};
