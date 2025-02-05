import type {ReactNode, SVGProps} from 'react';

export function IconWarpcast(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'41'}
			height={'40'}
			viewBox={'0 0 41 40'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_576_2973)'}>
				<path
					d={'M0.199219 0H40.1868V39.9876H0.199219V0Z'}
					fill={'black'}
				/>
				<path
					d={
						'M30.2864 39.5114H10.0996C4.9035 39.5114 0.675409 35.2836 0.675409 30.0873V9.90063C0.675409 4.70444 4.90352 0.476313 10.0996 0.476313H30.2864C35.4826 0.476313 39.7107 4.70444 39.7107 9.90063V30.0873C39.7107 35.2836 35.4826 39.5114 30.2864 39.5114Z'
					}
					stroke={'currentColor'}
					strokeWidth={'0.952381'}
				/>
				<path
					d={
						'M26.4363 12.655L24.4646 20.06L22.4865 12.655H17.9342L15.9371 20.1145L13.9466 12.655H8.76172L13.5796 29.0273H18.0527L20.1917 21.4246L22.3305 29.0273H26.8133L31.6206 12.655H26.4363Z'
					}
					fill={'currentColor'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_576_2973'}>
					<rect
						width={'40'}
						height={'40'}
						fill={'currentColor'}
						transform={'translate(0.199219)'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
