import type {ReactNode, SVGProps} from 'react';

export function IconBot(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M8 5H16'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M15 12V12.01'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M9 12V12.01'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M9 17C9 17 10 18 12 18C14 18 15 17 15 17'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M7 22V23'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={
					'M17 22H18C20.209 22 22 20.209 22 18V9C22 6.791 20.209 5 18 5H16V1H8V5H6C3.791 5 2 6.791 2 9V18C2 20.209 3.791 22 6 22H7'
				}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M17 23V22'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
