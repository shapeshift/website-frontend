import Image from 'next/image';
import {notFound} from 'next/navigation';

import {Button} from '@/components/common/Button';
import {FooterBanner} from '@/components/FooterBanner';
import {Card} from '@/components/strapi-sections/cards-row/Card';
import CardsRow from '@/components/strapi-sections/cards-row/CardsRow';
import GridDisplaced from '@/components/strapi-sections/products/GridDisplaced';

import type {
	TButton,
	TCard,
	TCardsRowSection,
	TFooterSection,
	TGridDisplacedSection,
	TStat,
	TStrapiImage
} from '@/types/strapi';
import type {ReactNode} from 'react';

type TPage = {
	title: string;
	description: string;
	buttonCta: TButton;
	featuredImg: TStrapiImage;
	stats: TStat[];
	cardsRow: TCardsRowSection;
	gridDisplaced: TGridDisplacedSection;
	footer: TFooterSection;
};

/********************************************************************************************
 * Fetches page data from Strapi API
 * Returns null if page is not found
 ********************************************************************************************/
async function getPageData(): Promise<TPage | null> {
	const pages = await fetch(
		`${process.env.STRAPI_URL}/api/trade?fields[0]=title&populate[1]=buttonCta&fields[2]=description&populate[3]=featuredImg&populate[4]=stats&populate[5]=cardsRow&populate[6]=cardsRow.cards&populate[7]=cardsRow.cards.image&populate[8]=cardsRow.ctaBlock&populate[9]=cardsRow.ctaBlock.icon&populate[20]=gridDisplaced&populate[21]=gridDisplaced.cards&populate[22]=gridDisplaced.cards.image&pagination[pageSize]=10&pagination[page]=1&status=published&locale=en`,
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
	const {title, description, buttonCta, featuredImg, stats} = props;

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
							className={'!w-full lg:!w-[232px]'}
						/>
					</div>
				</div>

				<div className={'mt-20 overflow-hidden rounded-2xl'}>
					<Image
						src={`${process.env.STRAPI_URL}${featuredImg.url}`}
						alt={title}
						width={1400}
						height={featuredImg.height ?? 0}
						className={'hidden lg:block'}
					/>
					<Image
						src={`${process.env.STRAPI_URL}${featuredImg.url}`}
						alt={title}
						width={1000}
						height={featuredImg.height ?? 0}
						className={'block lg:hidden'}
					/>
				</div>

				<div className={'mb-16 mt-20 flex w-full flex-col items-center justify-center gap-4 lg:flex-row'}>
					{stats.map(stat => (
						<div
							key={stat.id}
							className={'flex w-min flex-col items-center lg:min-w-[245px]'}>
							<div className={'w-min text-[40px] font-normal leading-[48px]'}>{stat.value}</div>
							<div className={'text-xl text-gray-500'}>{stat.title}</div>
						</div>
					))}
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
			<GridDisplaced data={page.gridDisplaced} />
			<FooterBanner
				tag={'Trade with ShapeShift'}
				title={'Everything you need in one place.'}
				href={'https://app.shapeshift.com/'}
				buttonText={'Start Trading'}
			/>
		</main>
	);
}
