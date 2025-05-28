/********************************************************************************************
 * Custom hook that delays updating a value until a specified delay has passed
 * Useful for preventing excessive renders or API calls when input changes rapidly
 *
 * @param {T} value - The value to debounce
 * @param {number} delay - The delay time in milliseconds (default: 500ms)
 * @returns {T} The debounced value that updates only after the delay
 ********************************************************************************************/
import {useEffect, useState} from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	/********************************************************************************************
	 * Sets up a timer that updates the debounced value after the specified delay
	 * Clears the previous timer if the value changes before the delay completes
	 ********************************************************************************************/
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
