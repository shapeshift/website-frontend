import type {TFaqData, TSupportedChainData, TSupportedWalletData} from '@/types/strapi';

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

export async function getSupportedWallets(): Promise<TSupportedWalletData[] | null> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/supported-wallets?populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data;
}

export async function getSupportedWallet(slug: string): Promise<TSupportedWalletData | null> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/supported-wallets?filters[slug][$eq]=${slug}&populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data[0];
}

export async function getSupportedChain(slug: string): Promise<TSupportedChainData | null> {
	const res = await fetch(`${process.env.STRAPI_URL}/api/supported-chains?filters[slug][$eq]=${slug}&populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return data.data[0];
}
