import type {ReactNode, SVGProps} from 'react';

export function IconResource(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_30_707)'}>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z'
					}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M9 9V9.01'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M15 9V9.01'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M9 14.9902V15.0002'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M15 14.9902V15.0002'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_30_707'}>
					<rect
						width={'24'}
						height={'24'}
						fill={'currentColor'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
