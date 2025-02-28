import {cl} from './utils/cl';

import type {ReactNode} from 'react';

type TCarouselProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	pauseOnHover?: boolean;
	direction?: 'left' | 'right';
	speed?: number;
};
export function Carousel({
	children,
	pauseOnHover = false,
	direction = 'left',
	//The lower the number, the faster the carousel
	speed = 20,
	className,
	...props
}: TCarouselProps): ReactNode {
	return (
		<div
			className={cl('w-full overflow-hidden z-10', className)}
			{...props}>
			<div className={'relative flex overflow-hidden'}>
				<div
					className={cl(
						'flex w-max py-5 animate-carousel',
						pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
						direction === 'right' ? 'animate-carousel-reverse' : ''
					)}
					// eslint-disable-next-line @typescript-eslint/naming-convention
					style={{'--duration': `${speed}s`} as React.CSSProperties}>
					{children}
					{children}
				</div>
			</div>
		</div>
	);
}
