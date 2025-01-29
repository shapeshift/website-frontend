/********************************************************************************************
 * Animation constants for header components
 * Includes variants and transition settings
 ********************************************************************************************/
export const expandAnimation = {
	initial: {opacity: 0, y: 20},
	animate: {opacity: 1, y: 0},
	transition: {
		y: {duration: 0.4, ease: [0.23, 1, 0.32, 1]},
		opacity: {duration: 0.3}
	}
};

export const containerAnimation = {
	initial: {opacity: 0, y: 20},
	animate: (isOpen: boolean) => ({
		opacity: isOpen ? 1 : 0,
		y: isOpen ? 0 : 20,
		scaleY: isOpen ? 1 : 0.95,
		transformOrigin: 'top'
	}),
	exit: {
		opacity: 0,
		y: 10,
		scaleY: 0.95,
		transition: {
			duration: 0.15,
			ease: [0.32, 0, 0.67, 0]
		}
	},
	transition: {
		duration: 0.4,
		ease: [0.23, 1, 0.32, 1]
	}
};
