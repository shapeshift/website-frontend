import type {ReactNode, SVGProps} from 'react';

export function IconTrade(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M23 21H16'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M16 16H23'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M16 11H23'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M14 6H23'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M8 6V3C8 1.896 8.896 1 10 1H21C22.104 1 23 1.896 23 3V21'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={'M1 21H16V16H1V21Z'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={'M1 16H16V11H1V16Z'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={'M16 11H1V8C1 6.896 1.896 6 3 6H14C15.104 6 16 6.896 16 8V11Z'}
				stroke={'#E6E6E6'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
