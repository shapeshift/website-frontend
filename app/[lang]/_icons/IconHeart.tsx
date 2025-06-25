import type {ReactNode, SVGProps} from 'react';

export function IconHeart(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'18'}
			height={'18'}
			viewBox={'0 0 18 18'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<path
				d={'M1.94141 10.5H3.75041L6.00041 6.75L8.25041 10.5H12.7504'}
				stroke={'currentColor'}
				strokeWidth={'1.5'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={
					'M13.125 2.25C11.0625 2.25 9.93375 3.32775 9 4.275C8.06625 3.32775 6.9375 2.25 4.875 2.25C2.12475 2.25 0.75 4.55325 0.75 6.975C0.75 11.0527 5.56275 14.4 9 15.75C12.4373 14.4 17.25 11.0527 17.25 6.975C17.25 4.55325 15.8753 2.25 13.125 2.25Z'
				}
				stroke={'currentColor'}
				strokeWidth={'1.5'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
