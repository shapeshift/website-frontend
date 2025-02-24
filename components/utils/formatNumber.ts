export function formatNumber(num: number, isNative: boolean, decimals: number = 6): string {
	const fixed = isNative ? num / 10 ** decimals : num;
	const numStr = fixed.toString();
	const [whole, decimal] = numStr.split('.');

	// Add thousand separators to whole number
	const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	// Return with decimal part if it exists
	return decimal ? `${formattedWhole}.${decimal}` : formattedWhole;
}
