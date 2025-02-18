import type {ReactNode, SVGProps} from 'react';

export function IconPercent(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'22'}
			height={'22'}
			viewBox={'0 0 22 22'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'percentage'}>
				<path
					id={'Stroke'}
					d={'M1.75049 20.25L20.2505 1.75'}
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
						'M9.25049 5.25C9.25049 7.183 7.68349 8.75 5.75049 8.75C3.81749 8.75 2.25049 7.183 2.25049 5.25C2.25049 3.317 3.81749 1.75 5.75049 1.75C7.68349 1.75 9.25049 3.317 9.25049 5.25Z'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_3'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M20.2505 16.25C20.2505 18.183 18.6835 19.75 16.7505 19.75C14.8175 19.75 13.2505 18.183 13.2505 16.25C13.2505 14.317 14.8175 12.75 16.7505 12.75C18.6835 12.75 20.2505 14.317 20.2505 16.25Z'
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
