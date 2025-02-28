import type {ReactNode, SVGProps} from 'react';

export function IconChevron(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			width={'9'}
			height={'14'}
			viewBox={'0 0 9 14'}
			fill={'none'}
			{...props}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M7 2L2 7L7 12'}
				stroke={'white'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
