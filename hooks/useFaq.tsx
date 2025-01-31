import {useEffect, useState} from 'react';

import type {TFaqData} from '@/types/strapi';

/* Hook to fetch FAQ data from Strapi API
 * Returns data, isLoading, and error
 ********************************************************************************************/
export function useFaq(): {
	data: TFaqData | null;
	isLoading: boolean;
	error: Error | null;
} {
	const [data, setData] = useState<TFaqData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchFaqData(): Promise<void> {
			try {
				const response = await fetch(
					`${process.env.STRAPI_URL}/api/faq?populate[0]=faqSection&populate[1]=faqSection.faqSectionItem&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
					{
						headers: {
							Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
						}
					}
				);

				const json = await response.json();
				setData(json.data || null);
			} catch (err) {
				setError(err as Error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchFaqData();
	}, []);

	return {data, isLoading, error};
}
