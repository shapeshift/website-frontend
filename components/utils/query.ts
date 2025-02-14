import type {TFaqData} from '@/types/strapi';

export async function getFaq(): Promise<TFaqData | null> {
	const res = await fetch(
		`${process.env.STRAPI_URL}/api/faq?populate[0]=faqSection&populate[1]=faqSection.faqSectionItem&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data;
}
