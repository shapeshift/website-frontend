import {cl} from './utils/cl';

import type {ReactNode} from 'react';

/**************************************************************************************************
 * Carousel Component
 *
 * A horizontally scrolling carousel that can display any content in a continuous loop.
 * Features:
 * - Automatic scrolling in either direction
 * - Optional pause on hover
 * - Configurable speed
 * - Responsive design
 *
 * @example
 * // Basic usage
 * <Carousel>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Carousel>
 *
 * @example
 * // With custom settings
 * <Carousel
 *   direction="right"
 *   speed={15}
 *   pauseOnHover
 *   className="my-custom-class"
 * >
 *   {items.map(item => <div key={item.id}>{item.content}</div>)}
 * </Carousel>
 *************************************************************************************************/

type TCarouselProps = React.HTMLAttributes<HTMLDivElement> & {
	/** The content to be displayed in the carousel */
	children: React.ReactNode;
	/** Whether to pause the animation when hovering over the carousel */
	pauseOnHover?: boolean;
	/** The direction in which the carousel should scroll */
	direction?: 'left' | 'right';
	/** The speed of the carousel animation in seconds (lower = faster) */
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
