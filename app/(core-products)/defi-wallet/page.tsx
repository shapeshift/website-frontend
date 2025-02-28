import Image from 'next/image';
import {notFound} from 'next/navigation';

import {Button} from '@/components/common/Button';
import {FooterBanner} from '@/components/FooterBanner';
import {Card} from '@/components/strapi-sections/cards-row/Card';
import CardsRow from '@/components/strapi-sections/cards-row/CardsRow';

import type {TButton, TCard, TCardsRowSection, TFooterSection, TStrapiImage} from '@/types/strapi';
import type {ReactNode} from 'react';

type TPage = {
	title: string;
	description: string;
	buttonCta: TButton;
	featuredImg: TStrapiImage;
	buttonDownload: TButton[];
	cardsRow: TCardsRowSection;
	footer: TFooterSection;
};

/********************************************************************************************
 * Fetches page data from Strapi API
 * Returns null if page is not found
 ********************************************************************************************/
async function getPageData(): Promise<TPage | null> {
	const pages = await fetch(
		`${process.env.STRAPI_URL}/api/defi-wallet?fields[0]=title&populate[1]=buttonCta&fields[2]=description&populate[3]=featuredImg&populate[4]=cardsRow&populate[5]=cardsRow.cards&populate[6]=cardsRow.cards.image&populate[7]=cardsRow.ctaBlock&populate[8]=cardsRow.ctaBlock.icon&populate[9]=footer&populate[10]=footer.buttonCta&populate[11]=footer.imageBg&pagination[pageSize]=1&pagination[page]=1&status=published`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);

	const pagesJson = await pages.json();
	return pagesJson.data;
}

function Hero(props: TPage): ReactNode | null {
	const {title, description, buttonCta, featuredImg} = props;

	return (
		<section className={'relative mb-[120px] pt-10 md:px-4 lg:mb-60 lg:px-0 lg:pt-52'}>
			<div className={'container mx-auto'}>
				<div className={'grid gap-10 lg:grid-cols-2'}>
					<h1 className={'mb-4 text-4xl font-normal leading-10 lg:text-7xl'}>{title}</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-sm font-normal text-gray-500 lg:text-xl'}>{description}</p>
						<Button
							variant={'blue'}
							title={buttonCta?.title ?? 'Title'}
							href={buttonCta?.url ?? '/'}
							hasArrow
						/>
					</div>
				</div>

				<div className={'mt-20 aspect-[1400/400] overflow-hidden rounded-2xl'}>
					<Image
						src={`${process.env.STRAPI_URL}${featuredImg.url}`}
						className={'aspect-[1400/400] w-full'}
						alt={''}
						quality={100}
						width={2800}
						height={800}
					/>
				</div>
			</div>
		</section>
	);
}

export default async function Page(): Promise<ReactNode> {
	const page = await getPageData();
	if (!page) {
		return notFound(); // TODO: handle this
	}

	return (
		<main className={'flex w-full flex-col items-center justify-center'}>
			<div className={'absolute inset-0 hidden lg:block'}>
				<Image
					src={'/heroBg.png'}
					alt={'hero-bg'}
					height={'2256'}
					width={'3840'}
				/>
			</div>

			<Hero {...page} />
			<CardsRow
				data={page.cardsRow}
				children={(card: TCard) => <Card data={card} />}
			/>
			<FooterBanner
				tag={'ShapeShift DeFi wallet'}
				title={'Everything you need in one place.'}
				href={'https://app.shapeshift.com'}
				buttonText={'Get started'}
			/>
		</main>
	);
}
