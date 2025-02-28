/************************************************************************************************
 ** Fetch Utilities:
 **
 ** Centralized utilities for data fetching in product pages
 ** Provides reusable error handling and consistent patterns
 **
 ** Features:
 ** - Generic type-safe fetch function with error handling
 ** - Consistent caching strategy across requests
 ** - Standardized authorization header handling
 ** - Proper error handling and logging
 **
 ** Usage:
 ** - Import and use in other fetcher functions to reduce code duplication
 ** - Provides a single place to modify fetch behavior across all product components
 ************************************************************************************************/

/**
 * Generic fetch utility with consistent error handling
 * 
 * @param endpoint - API endpoint to fetch from
 * @param queryParams - URL query parameters string
 * @param errorContext - Description of what's being fetched (for error messages)
 * @returns Properly typed response data or null on error
 */
export async function fetchWithErrorHandling<T>(
  endpoint: string, 
  queryParams: string, 
  errorContext: string
): Promise<T | null> {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/${endpoint}?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        next: { 
          revalidate: 3600 // Cache for 1 hour
        }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch ${errorContext}: Status ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(
      `Error fetching ${errorContext}:`, 
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}