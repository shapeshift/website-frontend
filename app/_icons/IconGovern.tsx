import type {ReactNode, SVGProps} from 'react';

export function IconGovern(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'22'}
			height={'22'}
			viewBox={'0 0 22 22'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'season-winter'}>
				<path
					id={'Stroke'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M17.363 1H4.636C2.628 1 1 2.628 1 4.636V17.364C1 19.372 2.628 21 4.636 21H17.363C19.372 21 21 19.372 21 17.364V4.636C21 2.628 19.372 1 17.363 1Z'
					}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_2'}
					d={'M10.9995 5V17'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_3'}
					d={'M5.80322 8L16.1962 14'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_4'}
					d={'M5.80322 14L16.1962 8'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
		</svg>
	);
}
