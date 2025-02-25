import type {ReactNode, SVGProps} from 'react';

export function IconDollar(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'18'}
			height={'18'}
			viewBox={'0 0 18 18'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_847_11219)'}>
				<path
					d={
						'M10.5 6H8.25C7.422 6 6.75 6.672 6.75 7.5C6.75 8.328 7.422 9 8.25 9H9.75C10.578 9 11.25 9.672 11.25 10.5C11.25 11.328 10.578 12 9.75 12H7.5'
					}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M9 6V4.5'}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M9 13.5V12'}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M17.25 9C17.25 13.5562 13.5562 17.25 9 17.25C4.44375 17.25 0.75 13.5562 0.75 9C0.75 4.44375 4.44375 0.75 9 0.75C13.5562 0.75 17.25 4.44375 17.25 9Z'
					}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_847_11219'}>
					<rect
						width={'18'}
						height={'18'}
						fill={'currentColor'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
