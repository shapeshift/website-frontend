import {useEffect} from 'react';

import type {RefObject} from 'react';

type THandler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: THandler): void {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent): void => {
			const el = ref?.current;
			if (!el || el.contains((event?.target as Node) || null)) {
				return;
			}

			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
}
