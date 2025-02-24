import Image from 'next/image';

import type {TTemplateData} from '@/types/strapi';
import type {ReactNode} from 'react';

async function getPageData(slug: string): Promise<TTemplateData | null> {
	const pages = await fetch(`${process.env.STRAPI_URL}/api/templates`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});

	const pagesJson = await pages.json();

	const page = pagesJson.data.find((page: TTemplateData) => page.slug === slug);

	// if (!page) {
	// 	return null;
	// }

	const result = await fetch(
		`${process.env.STRAPI_URL}/api/templates/${page.documentId}?populate[0]=hero&populate[1]=hero.buttonCta&populate[2]=hero.buttonDownload&populate[3]=hero.featuredImg&populate[4]=hero.stats&populate[5]=cardsRow&populate[6]=cardsRow.cards&populate[7]=cardsRow.cards.image&populate[8]=cardsRow.ctaBlock&populate[9]=cardsRow.ctaBlock.icon&populate[10]=grid&populate[11]=grid.cardCta&populate[12]=grid.cardCta.buttonCta&populate[13]=grid.cardCta.imageBg&populate[14]=grid.card&populate[15]=grid.card.image&populate[16]=gridLadder&populate[17]=gridLadder.steps&populate[18]=gridLadder.steps.buttonCta&populate[19]=gridLadder.steps.image&populate[20]=gridDisplaced&populate[21]=gridDisplaced.cards&populate[22]=gridDisplaced.cards.image&populate[23]=footer&populate[24]=footer.buttonCta&populate[25]=footer.buttonDownload&populate[26]=footer.imageBg&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);

	// if (!result.ok) {
	// 	return null;
	// }

	const json = await result.json();

	return json.data;
}

export default async function Page({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	console.log(slug);
	console.log(getPageData);
	// const page = await getPageData(slug);
	// if (!page) {
	// 	return notFound();
	// }

	return (
		<main className={'flex w-full flex-col items-center justify-center'}>
			<div className={'absolute inset-0'}>
				<Image
					src={'/heroBg.png'}
					alt={'hero-bg'}
					height={'2256'}
					width={'3840'}
				/>
			</div>
		</main>
	);
}
