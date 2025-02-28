import type {ReactNode, SVGProps} from 'react';

export function IconBack(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'9'}
			height={'14'}
			viewBox={'0 0 9 14'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M7 2L2 7L7 12'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
