import type {ReactNode, SVGProps} from 'react';

export function IconStar(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'20'}
			height={'20'}
			viewBox={'0 0 20 20'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_1046_6228)'}>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M18.4746 7.50004H12.583L10.733 1.37837C10.628 1.05254 10.3321 0.833374 9.99881 0.833374C9.66547 0.833374 9.36964 1.05254 9.26464 1.37837L7.33964 7.50004H1.55464C0.711308 7.50004 0.711308 8.33337 1.02881 8.65171L5.76297 12.1967L3.84631 18.1175C3.74047 18.445 3.85131 18.805 4.12047 19.0109C4.39131 19.2159 4.75797 19.2192 5.03047 19.0184L9.99881 15.3642L14.9671 19.0184C15.1013 19.1167 15.2596 19.1667 15.4163 19.1667C15.578 19.1667 15.7405 19.115 15.8771 19.0109C16.1463 18.805 16.2571 18.445 16.1513 18.1175L14.2346 12.1967L18.968 8.65171C19.2871 8.33337 19.2871 7.50004 18.4746 7.50004Z'
					}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_1046_6228'}>
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
