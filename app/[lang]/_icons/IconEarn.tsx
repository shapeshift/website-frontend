import type {ReactNode, SVGProps} from 'react';

export function IconEarn(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M2.75 21.25L21.25 2.75'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M10.25 6.25C10.25 8.183 8.683 9.75 6.75 9.75C4.817 9.75 3.25 8.183 3.25 6.25C3.25 4.317 4.817 2.75 6.75 2.75C8.683 2.75 10.25 4.317 10.25 6.25Z'
				}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M21.25 17.25C21.25 19.183 19.683 20.75 17.75 20.75C15.817 20.75 14.25 19.183 14.25 17.25C14.25 15.317 15.817 13.75 17.75 13.75C19.683 13.75 21.25 15.317 21.25 17.25Z'
				}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
