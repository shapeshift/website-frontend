import type {ReactNode, SVGProps} from 'react';

export function IconMinus(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M2 12L22 12'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
			/>
		</svg>
	);
}
