import type {ReactNode, SVGProps} from 'react';

export function IconArrow(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M8 4H20V16'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M20 4L4 20'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
