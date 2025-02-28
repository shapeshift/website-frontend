import {notFound} from 'next/navigation';

import {Banner} from '@/components/common/Banner';
import {ChainActions} from '@/components/strapi-sections/templates/ChainActions';
import {ChainDescription} from '@/components/strapi-sections/templates/ChainDescription';
import {ChainFeatures} from '@/components/strapi-sections/templates/ChainFeatures';
import {ChainHeader} from '@/components/strapi-sections/templates/ChainHeader';
import {ChainHero} from '@/components/strapi-sections/templates/ChainHero';
import {getSupportedChain} from '@/components/utils/query';

import type {TSupportedChainData} from '@/types/strapi';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.STRAPI_URL}/api/supported-chains?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const chain = data.data[0] as TSupportedChainData;
	if (!chain) {
		return notFound();
	}

	const imageUrl = chain.featuredImg.formats.thumbnail.url;
	return {
		title: `${chain.name} | ShapeShift Chains`,
		description: `Shapeshift supports ${chain.name}! Use it now to buy, sell, and swap crypto.`,
		keywords: `${chain.name}, Shapeshift`,
		openGraph: {
			title: chain.name,
			description: `Shapeshift supports ${chain.name}! Use it now to buy, sell, and swap crypto.`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: chain.name,
			description: `Shapeshift supports ${chain.name}! Use it now to buy, sell, and swap crypto.`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

export default async function ChainPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const chain = await getSupportedChain(slug);

	if (!chain) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-20 flex flex-col justify-center lg:mt-[220px]'}>
				<ChainHeader chainName={chain.name} />

				<div className={'mb-20 mt-16 lg:mb-60'}>
					<ChainHero
						url={`${process.env.STRAPI_URL}${chain?.featuredImg?.url}`}
						name={chain?.name}
						width={chain?.featuredImg?.width}
						height={chain?.featuredImg?.height}
					/>
				</div>
				<ChainDescription
					chainName={chain.name}
					description={chain.description}
				/>

				<div className={'mt-[120px] lg:mt-60'}>
					<ChainActions
						features={chain.actions}
						chainName={chain.name}
					/>
				</div>

				<div className={'mt-[120px] lg:mt-60'}>
					<ChainFeatures
						features={chain.features}
						chainName={chain.name}
						foxImg={chain.foxImg}
					/>
				</div>

				<div className={'mt-[120px] lg:mt-60'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
