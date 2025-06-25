import type {ReactNode, SVGProps} from 'react';

export function IconCheckCircle(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'20'}
			height={'20'}
			viewBox={'0 0 20 20'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_1046_6190)'}>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M19.1666 10C19.1666 15.0625 15.0624 19.1667 9.99992 19.1667C4.93742 19.1667 0.833252 15.0625 0.833252 10C0.833252 4.93754 4.93742 0.833374 9.99992 0.833374C15.0624 0.833374 19.1666 4.93754 19.1666 10Z'
					}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M7.08325 10.8333L9.58325 12.5L12.9166 7.5'}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_1046_6190'}>
					<rect
						width={'20'}
						height={'20'}
						fill={'currentColor'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
