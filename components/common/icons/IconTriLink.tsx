import type {ReactNode} from 'react';

export function IconTriLink(props: React.SVGProps<SVGSVGElement>): ReactNode {
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
					'M18.192 12.6717L17.875 12.6747C17.088 12.7287 16.302 12.2977 15.879 11.5597C15.455 10.8337 15.493 9.90374 15.975 9.13274C16.592 8.14774 16.819 6.97474 16.612 5.83274C16.275 3.94674 14.768 2.43874 12.858 2.07974C11.458 1.82474 10.031 2.18774 8.946 3.07674C7.857 3.96974 7.233 5.28074 7.233 6.67374C7.233 7.59574 7.51 8.49374 8.039 9.27374C8.483 9.92274 8.506 10.7817 8.071 11.5157C7.636 12.2617 6.836 12.6887 6.006 12.6517C5.615 12.6247 5.213 12.6527 4.883 12.7297C2.973 13.0577 1.406 14.6027 1.074 16.4847C0.827001 17.8647 1.205 19.2657 2.108 20.3277C3.013 21.3907 4.335 21.9997 5.734 21.9997C7.488 21.9997 9.1 21.0407 9.95 19.4787C10.342 18.7207 11.092 18.2507 11.907 18.2507H12.086C12.897 18.2507 13.63 18.7147 14.043 19.4767C14.845 21.0327 16.462 21.9997 18.259 21.9997C19.544 21.9997 20.745 21.5017 21.644 20.5967C22.546 19.6897 23.027 18.4887 22.999 17.1857C22.859 14.6967 20.702 12.6717 18.192 12.6717Z'
				}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M5.50195 17.5V17.51'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M18.502 17.5V17.51'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
			<path
				d={'M12.002 6.48926V6.49926'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
