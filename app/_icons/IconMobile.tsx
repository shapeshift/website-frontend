import type {ReactNode, SVGProps} from 'react';

export function IconMobile(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'18'}
			height={'24'}
			viewBox={'0 0 18 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'iphone'}>
				<path
					id={'Stroke'}
					d={'M2 17H16'}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_2'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M15 23H3C1.896 23 1 22.104 1 21V3C1 1.896 1.896 1 3 1H15C16.104 1 17 1.896 17 3V21C17 22.104 16.104 23 15 23Z'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
		</svg>
	);
}
