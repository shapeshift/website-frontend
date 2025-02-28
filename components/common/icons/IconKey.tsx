import type {ReactNode, SVGProps} from 'react';

export function IconKey(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'key'}>
				<path
					id={'Stroke'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M15.5 1C11.357 1 8 4.357 8 8.5C8 8.968 8.049 9.425 8.131 9.869L1 17V23H7V19H11V16H15.5C19.643 16 23 12.642 23 8.5C23 4.357 19.643 1 15.5 1Z'
					}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
		</svg>
	);
}
