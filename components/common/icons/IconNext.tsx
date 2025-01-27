import type {ReactNode} from 'react';

export function IconNext(props: React.SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M4 12L20 12'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
			/>
			<path
				d={'M15 7L20 12L15 17'}
				stroke={'currentColor'}
				strokeWidth={'3'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
