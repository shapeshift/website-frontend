import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import {Button} from '@/components/common/Button';
import {RoundButton} from '@/components/common/RoundButton';
import {Card} from '@/components/strapi-sections/cards-row/Card';

import type {TButton, TCard, TCardsRowSection, TStrapiImage} from '@/types/strapi';
import type {ReactNode} from 'react';

type TPage = {
	title: string;
	description: string;
	buttonCta: TButton;
	featuredImg: TStrapiImage;
	buttonDownload: TButton[];
	cardsRow: TCardsRowSection;
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
		<section className={'relative mb-60 pt-52 md:px-4 lg:px-0'}>
			<div className={'container mx-auto'}>
				<div className={'grid gap-10 lg:grid-cols-2'}>
					<h1 className={'mb-4 text-7xl font-normal'}>{title}</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-xl font-normal text-gray-500'}>{description}</p>
						<Button
							variant={'blue'}
							title={buttonCta?.title ?? 'Title'}
							href={buttonCta?.url ?? '/'}
							hasArrow
						/>
					</div>
				</div>

				<div className={'mt-20 overflow-hidden rounded-2xl md:h-[400px]'}>
					<Image
						src={`${process.env.STRAPI_URL}${featuredImg.url}`}
						className={'size-full h-[400px]'}
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

function CardsRow(props: {data: TCardsRowSection; children: (card: TCard) => ReactNode}): ReactNode | null {
	const {data, children} = props;

	return (
		<section className={'container relative mx-auto mb-60 md:px-4 lg:px-0'}>
			<div className={'mb-8 max-w-[60%] text-left text-[40px] font-normal leading-[48px] text-white'}>
				{data?.title}
			</div>
			<div className={'row-span-full grid place-items-start gap-2 lg:grid-cols-3'}>
				{data?.cards?.map((card): ReactNode => children?.(card))}
			</div>
			{data?.ctaBlock && (
				<Link
					className={'group mt-2 flex w-full items-center justify-between rounded-2xl bg-secondBg p-10'}
					href={data?.ctaBlock?.url ?? '/'}>
					<div className={'text-2xl text-white'}>{data?.ctaBlock?.title}</div>
					<RoundButton
						iconName={'arrow'}
						className={
							'bg-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'
						}
					/>
				</Link>
			)}
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
			<div className={'absolute inset-0'}>
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
		</main>
	);
}
