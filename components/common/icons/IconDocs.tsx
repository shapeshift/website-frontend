import type {ReactNode, SVGProps} from 'react';

export function IconDocs(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'22'}
			height={'24'}
			viewBox={'0 0 22 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'content'}>
				<path
					id={'Stroke'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M19.0005 23H3.00049C1.89649 23 1.00049 22.104 1.00049 21V3C1.00049 1.896 1.89649 1 3.00049 1H19.0005C20.1045 1 21.0005 1.896 21.0005 3V21C21.0005 22.104 20.1045 23 19.0005 23Z'
					}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_2'}
					d={'M6.00049 12H16.0005'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_3'}
					d={'M6.00049 17H12.0005'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_4'}
					d={'M6.00049 7H16.0005'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
		</svg>
	);
}
