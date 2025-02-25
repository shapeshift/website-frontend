import type {ReactNode, SVGProps} from 'react';

export function IconHold(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_721_6560)'}>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M21 23H3C1.896 23 1 22.104 1 21V3C1 1.896 1.896 1 3 1H21C22.104 1 23 1.896 23 3V21C23 22.104 22.104 23 21 23Z'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M17 12C17 15.313 14.313 18 11 18C7.687 18 5 15.313 5 12C5 8.687 7.687 6 11 6C14.313 6 17 8.687 17 12Z'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M14.3164 7H18.9994'}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M14.3164 17H18.9994'}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M13 12C13 13.104 12.104 14 11 14C9.896 14 9 13.104 9 12C9 10.896 9.896 10 11 10C12.104 10 13 10.896 13 12Z'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_721_6560'}>
					<rect
						width={'24'}
						height={'24'}
						fill={'white'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
