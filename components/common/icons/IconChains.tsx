import type {ReactNode, SVGProps} from 'react';

export function IconChains(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'24'}
			viewBox={'0 0 24 24'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'stack'}>
				<path
					id={'Stroke'}
					d={'M1.69678 19.3164L12.0008 23.0004L22.3038 19.3164'}
					stroke={'#E6E6E6'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_2'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M1.69677 7.34651L12.0008 10.9995L22.3038 7.34651C23.2018 7.02751 23.2408 5.78251 22.3648 5.40951L12.0008 0.999512L1.63577 5.40951C0.759767 5.78251 0.798767 7.02751 1.69677 7.34651Z'
					}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_3'}
					d={'M1.69678 13.3579L12.0008 16.9999L22.3038 13.3579'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
		</svg>
	);
}
