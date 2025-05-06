import type {ReactNode, SVGProps} from 'react';

export function IconClassic(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M9.00049 15H7.00049C6.44849 15 6.00049 14.552 6.00049 14V10C6.00049 9.448 6.44849 9 7.00049 9H9.00049C9.55249 9 10.0005 9.448 10.0005 10V14C10.0005 14.552 9.55249 15 9.00049 15Z'
				}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M21.0005 20H3.00049C1.89649 20 1.00049 19.104 1.00049 18V6C1.00049 4.896 1.89649 4 3.00049 4H21.0005C22.1045 4 23.0005 4.896 23.0005 6V18C23.0005 19.104 22.1045 20 21.0005 20Z'
				}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={
					'M18.0005 10C18.0005 9.448 17.5525 9 17.0005 9H15.0005C14.4485 9 14.0005 9.448 14.0005 10V14C14.0005 14.552 14.4485 15 15.0005 15H17.0005C17.5526 15 18.0005 14.5521 18.0005 14V14V13H17.0005'
				}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
