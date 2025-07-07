import type {ReactNode, SVGProps} from 'react';

export function IconTwitter(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'33'}
			height={'28'}
			viewBox={'0 0 33 28'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={
					'M26.0027 0.286255H30.9095L20.1895 11.9047L32.8008 27.7148H22.9262L15.1921 18.1261L6.34252 27.7148H1.43268L12.8989 15.2876L0.800781 0.286255H10.926L17.917 9.05074L26.0027 0.286255ZM24.2805 24.9298H26.9995L9.44863 2.92502H6.53091L24.2805 24.9298Z'
				}
				fill={'currentColor'}
			/>
		</svg>
	);
}
