import type {ReactNode, SVGProps} from 'react';

export function IconDiscover(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'20'}
			height={'20'}
			viewBox={'0 0 20 20'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_1138_6391)'}>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M19.1666 9.99992C19.1666 15.0627 15.0627 19.1666 9.99992 19.1666C4.93717 19.1666 0.833252 15.0627 0.833252 9.99992C0.833252 4.93717 4.93717 0.833252 9.99992 0.833252C15.0627 0.833252 19.1666 4.93717 19.1666 9.99992Z'
					}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={'M10.0002 13.6668L6.3335 10.0002L10.0002 6.3335L13.6668 10.0002L10.0002 13.6668Z'}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_1138_6391'}>
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
