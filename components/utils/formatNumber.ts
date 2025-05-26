/**
 * Formats a number with thousand separators and optional decimal places
 * @param num - The number to format
 * @param isNative - If true, divides the number by 10^decimals
 * @param decimals - Number of decimal places (default: 6)
 * @returns Formatted number string with thousand separators
 * @example
 * formatNumber(1234567, false) // '1,234,567'
 * formatNumber(1234567, true, 6) // '1.234567'
 */
export function formatNumber(num: number, isNative: boolean, decimals: number = 6): string {
	const fixed = isNative ? num / 10 ** decimals : num;
	if (isNaN(fixed)) {
		return '0';
	}

	const numStr = fixed.toString();
	const [whole, decimal] = numStr.split('.');

	const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return decimal ? `${formattedWhole}.${decimal}` : formattedWhole;
}
