import type {ReactNode, SVGProps} from 'react';

export function IconBlog(props: SVGProps<SVGSVGElement>): ReactNode {
	return (
		<svg
			{...props}
			width={'24'}
			height={'22'}
			viewBox={'0 0 24 22'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}>
			<g id={'book-open'}>
				<path
					id={'Stroke'}
					d={'M12.0005 3V21'}
					stroke={'currentColor'}
					strokeWidth={'2'}
					strokeLinecap={'round'}
					strokeLinejoin={'round'}
				/>
				<path
					id={'Stroke_2'}
					fillRule={'evenodd'}
					clipRule={'evenodd'}
					d={
						'M20.641 1.03276L12 2.99976L3.36 1.03276C2.131 0.809755 1 1.75376 1 3.00176V17.3298C1 18.2978 1.692 19.1258 2.644 19.2988L12 20.9998L21.357 19.2988C22.309 19.1258 23 18.2978 23 17.3298V3.00176C23 1.75376 21.87 0.809755 20.641 1.03276Z'
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
