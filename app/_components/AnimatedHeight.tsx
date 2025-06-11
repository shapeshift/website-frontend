import {motion} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

import {cl} from '@/app/_utils/cl';

import type React from 'react';

type TAnimateChangeInHeightProps = {
	children: React.ReactNode;
	className?: string;
};

/********************************************************************************************
 * Animated Height Component
 *
 * Provides smooth height transitions for dynamic content using ResizeObserver.
 * Automatically adjusts height based on content changes.
 ********************************************************************************************/

export const AnimateChangeInHeight: React.FC<TAnimateChangeInHeightProps> = ({children, className}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState<number | 'auto'>('auto');

	/********************************************************************************************
	 * Effect: Sets up ResizeObserver to track content height changes
	 * Deps: None - Observer is set up once on mount
	 ********************************************************************************************/
	useEffect(() => {
		if (containerRef.current) {
			const resizeObserver = new ResizeObserver(entries => {
				// We only have one entry, so we can use entries[0].
				const observedHeight = entries[0].contentRect.height;
				setHeight(observedHeight);
			});

			resizeObserver.observe(containerRef.current);

			return () => {
				// Cleanup the observer when the component is unmounted
				resizeObserver.disconnect();
			};
		}
	}, []);

	return (
		<motion.div
			className={cl(className, 'overflow-hidden')}
			style={{height}}
			animate={{height}}
			transition={{duration: 0.1}}>
			<div ref={containerRef}>{children}</div>
		</motion.div>
	);
};
