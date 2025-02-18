import type {ReactNode, SVGProps} from 'react';

export function IconDapp(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_30_709)'}>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M21.167 6.5L23 3.75L20.25 1L17.5 2.833L14.75 1L12 2.833L9.25 1L6.5 2.833L3.75 1L1 3.75L2.834 6.5L1 9.25L2.834 12L1 14.75L2.834 17.5L1 20.25L3.75 23L6.5 21.167L9.25 23L12 21.167L14.75 23L17.5 21.167L20.25 23L23 20.25L21.167 17.5L23 14.75L21.167 12L23 9.25L21.167 6.5Z'
					}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_30_709'}>
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
