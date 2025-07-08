/************************************************************************************************
 * Generic fetch utility with consistent error handling
 *
 * @param endpoint - API endpoint to fetch from
 * @param queryParams - URL query parameters string
 * @param error - Description of what's being fetched (for error messages)
 * @returns Properly typed response data or null on error
 ************************************************************************************************/
export async function fetchWithErrorHandling<T>(
	endpoint: string,
	queryParams: string,
	error: string
): Promise<T | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}?${queryParams}`, {
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
			},
			next: {
				revalidate: 3600 // Cache for 1 hour
			}
		});

		if (!response.ok) {
			console.error(`Failed to fetch ${error}: Status ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(`Error fetching ${error}:`, error instanceof Error ? error.message : String(error));
		return null;
	}
}
