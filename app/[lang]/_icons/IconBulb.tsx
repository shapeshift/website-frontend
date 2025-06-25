import type {ReactNode, SVGProps} from 'react';

export function IconBulb(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'20'}
			height={'20'}
			viewBox={'0 0 20 20'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={
					'M13.4601 15.8332C13.7226 14.2565 14.386 12.7657 15.3535 11.4665C16.1785 10.359 16.6668 8.98734 16.6668 7.49984C16.6668 3.56734 13.2618 0.42984 9.23846 0.875673C6.30763 1.19984 3.86929 3.51817 3.41596 6.43151C3.12679 8.29817 3.61346 10.0465 4.60096 11.4057C5.56846 12.7357 6.25929 14.2382 6.53346 15.8332'
				}
				stroke={'currentColor'}
				strokeWidth={'1.66667'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M6.53394 15.8331C6.61894 16.3256 6.66644 16.8256 6.66644 17.334V17.4998C6.66644 18.4198 7.4131 19.1665 8.3331 19.1665H11.6664C12.5873 19.1665 13.3331 18.4198 13.3331 17.4998V17.3306C13.3331 16.8248 13.3789 16.3248 13.4606 15.8331H6.53394Z'
				}
				stroke={'currentColor'}
				strokeWidth={'1.66667'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
