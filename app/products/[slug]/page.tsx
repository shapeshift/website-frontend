// import CardsRow from '@/components/sections/CardsRow';
// import Footer from '@/components/sections/Footer';
// import GridDisplaced from '@/components/sections/GridDisplaced';
// import Hero from '@/components/sections/Hero';

import {sections} from '@/components/utils/strapi';

import type {TSectionType} from '@/components/utils/strapi';
import type {TPageData} from '@/types/strapi';

// import type {PageData} from '@/types/page';

/********************************************************************************************
 * Fetches page data from Strapi API
 * Returns null if page is not found
 ********************************************************************************************/
async function getPageData(slug: string): Promise<TPageData | null> {
	const pages = await fetch(`${process.env.STRAPI_URL}/api/pages`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	const pagesJson = await pages.json();

	const page = pagesJson.data.find((page: TPageData) => page.slug === slug);

	if (!page) {
		return null; // TODO: handle this
	}

	const res = await fetch(
		`${process.env.STRAPI_URL}/api/pages/${page.documentId}?populate[0]=hero&populate[1]=hero.buttonCta&populate[2]=hero.buttonDownload&populate[3]=hero.featuredImg&populate[4]=hero.stats&populate[5]=cardsRow&populate[6]=cardsRow.cards&populate[7]=cardsRow.cards.image&populate[8]=cardsRow.ctaBlock&populate[9]=cardsRow.ctaBlock.icon&populate[10]=grid&populate[11]=grid.cardCta&populate[12]=grid.cardCta.buttonCta&populate[13]=grid.cardCta.imageBg&populate[14]=grid.card&populate[15]=grid.card.image&populate[16]=gridLadder&populate[17]=gridLadder.steps&populate[18]=gridLadder.steps.buttonCta&populate[19]=gridLadder.steps.image&populate[20]=gridDisplaced&populate[21]=gridDisplaced.cards&populate[22]=gridDisplaced.cards.image&populate[23]=footer&populate[24]=footer.buttonCta&populate[25]=footer.buttonDownload&populate[26]=footer.imageBg&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);

	if (!res.ok) {
		return null;
	}

	const json = await res.json();
	return json.data;
}

export default async function Page({params}: {params: Promise<{slug: string}>}): Promise<React.ReactNode> {
	const {slug} = await params;
	const page = await getPageData(slug);

	if (!page) {
		return null; // TODO: handle this
	}

	return (
		<main>
			{/* Render sections conditionally based on presence in API response */}
			{Object.entries(page).map(([key, data]) => {
				const Section = sections[key as TSectionType];
				if (Section) {
					return (
						<Section
							key={key}
							data={data}
						/>
					);
				}
				return null;
			})}
		</main>
	);
}
