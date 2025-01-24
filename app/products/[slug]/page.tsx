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
	console.log(pagesJson);
	const page = pagesJson.data.find((page: TPageData) => page.slug === slug);

	if (!page) {
		return null; // TODO: handle this
	}

	const res = await fetch(
		`${process.env.STRAPI_URL}/api/pages/${page.documentId}?populate[0]=hero&populate[1]=hero.button_cta&populate[2]=hero.button_download&populate[3]=hero.featured_img&populate[4]=hero.stats&populate[5]=cards_row&populate[6]=cards_row.cards&populate[7]=cards_row.cards.image&populate[8]=cards_row.block_cta&populate[9]=cards_row.block_cta.icon&populate[10]=grid&populate[11]=grid.card_cta&populate[12]=grid.card_cta.button_cta&populate[13]=grid.card_cta.image_bg&populate[14]=grid.card&populate[15]=grid.card.image&populate[16]=grid_ladder&populate[17]=grid_ladder.steps&populate[18]=grid_ladder.steps.button_cta&populate[19]=grid_ladder.steps.image&populate[20]=grid_displaced&populate[21]=grid_displaced.cards&populate[22]=grid_displaced.cards.image&populate[23]=footer&populate[24]=footer.button_cta&populate[25]=footer.button_download&populate[26]=footer.image_bg&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
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

export default async function Page({params}: {params: {slug: string}}): Promise<React.ReactNode> {
	const page = await getPageData(params.slug);

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
