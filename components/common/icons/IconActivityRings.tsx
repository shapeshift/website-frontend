import type {ReactNode, SVGProps} from 'react';

export function IconActivityRings(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'18'}
			height={'18'}
			viewBox={'0 0 18 18'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_847_11213)'}>
				<path
					d={
						'M6.75 1.0605C7.4655 0.858 8.22 0.75 9 0.75C13.5562 0.75 17.25 4.44375 17.25 9C17.25 13.5562 13.5562 17.25 9 17.25C4.44375 17.25 0.75 13.5562 0.75 9C0.75 8.22 0.85875 7.4655 1.0605 6.75'
					}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={
						'M7.5 3.96744C7.9755 3.82569 8.47875 3.74994 9 3.74994C11.8995 3.74994 14.25 6.10044 14.25 8.99994C14.25 11.8994 11.8995 14.2499 9 14.2499C6.1005 14.2499 3.75 11.8994 3.75 8.99994C3.75 8.47869 3.8265 7.97544 3.9675 7.49994'
					}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M11.25 8.99994C11.25 10.2427 10.2427 11.2499 9 11.2499C7.75725 11.2499 6.75 10.2427 6.75 8.99994C6.75 7.75719 7.75725 6.74994 9 6.74994C10.2427 6.74994 11.25 7.75719 11.25 8.99994Z'
					}
					stroke={'currentColor'}
					strokeWidth={'1.5'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_847_11213'}>
					<rect
						width={'18'}
						height={'18'}
						fill={'white'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
