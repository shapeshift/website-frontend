import type {ReactNode, SVGProps} from 'react';

export function IconBuySell(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_721_6584)'}>
				<path
					d={
						'M14 8H11C9.896 8 9 8.896 9 10C9 11.104 9.896 12 11 12H13C14.104 12 15 12.896 15 14C15 15.104 14.104 16 13 16H10'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M12 8V6'}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M12 18V16'}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z'
					}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_721_6584'}>
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
