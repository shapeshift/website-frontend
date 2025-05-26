/**
 * Checks if a string contains HTML tags
 * @param content - The string to check for HTML tags
 * @returns boolean - True if the string contains HTML tags
 */
export function isHtml(content: string): boolean {
	return /<\/?(?:div|span|p|a|img|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|em|strong)[^>]*>/i.test(content);
}
