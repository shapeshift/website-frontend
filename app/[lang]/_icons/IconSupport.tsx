import type {ReactNode, SVGProps} from 'react';

export function IconSupport(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'20'}
			height={'20'}
			viewBox={'0 0 20 20'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g clipPath={'url(#clip0_1395_7321)'}>
				<path
					d={'M12.9473 7.05341L16.4831 3.51758'}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M3.51758 16.4831L7.05341 12.9473'}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M12.9473 12.9473L16.4831 16.4831'}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					d={'M3.51758 3.51953L7.05341 7.05536'}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M12.9165 7.08312C11.3056 5.47229 8.69396 5.47229 7.08312 7.08312C5.47229 8.69396 5.47229 11.3056 7.08312 12.9165C8.69396 14.5273 11.3056 14.5273 12.9165 12.9165C14.5273 11.3056 14.5273 8.69396 12.9165 7.08312Z'
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
						'M19.1673 10.0007C19.1673 15.0631 15.0631 19.1673 10.0007 19.1673C4.93815 19.1673 0.833984 15.0631 0.833984 10.0007C0.833984 4.93815 4.93815 0.833984 10.0007 0.833984C15.0631 0.833984 19.1673 4.93815 19.1673 10.0007Z'
					}
					stroke={'currentColor'}
					strokeWidth={'1.66667'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
			</g>
			<defs>
				<clipPath id={'clip0_1395_7321'}>
					<rect
						width={'20'}
						height={'20'}
						fill={'white'}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
