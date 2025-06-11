import type {ReactNode, SVGProps} from 'react';

export function IconCheck(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'10'}
			height={'8'}
			viewBox={'0 0 10 8'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M2.0835 3.58329L4.5835 6.08329L8.75016 1.91663'}
				stroke={'currentColor'}
				strokeWidth={'2.5'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
