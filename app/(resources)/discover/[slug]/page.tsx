import {notFound} from 'next/navigation';

import {DiscoverFeatures} from '@/app/(resources)/discover/DiscoverFeatures';
import {DiscoverHeader} from '@/app/(resources)/discover/DiscoverHeader';
import {Banner} from '@/components/common/Banner';
import {getDiscover} from '@/components/utils/query';

import type {TDiscoverData} from '@/types/strapi';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(`${process.env.STRAPI_URL}/api/discovers?filters[slug][$eq]=${slug}&populate=*`, {
		headers: {
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		}
	});
	const data = await response.json();
	const discover = data.data[0] as TDiscoverData;
	if (!discover) {
		return notFound();
	}

	const imageUrl = discover.featuredImg.formats.thumbnail.url;
	return {
		title: `${discover.title} | Shapeshift`,
		description: `Discover ${discover.title} with ShapeShift!`,
		keywords: `${discover.title}, Shapeshift`,
		openGraph: {
			title: discover.title,
			description: `Discover ${discover.title} with ShapeShift!`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: discover.title,
			description: `Discover ${discover.title} with ShapeShift!`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

export default async function ProtocolPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const discover = await getDiscover(slug);

	if (!discover) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[60px] flex flex-col justify-center'}>
				<DiscoverHeader
					name={discover?.title}
					description={discover?.description}
					tag={discover?.tag}
					items={['Self-custodial', 'Private', 'Multichain trading']}
					url={`${process.env.STRAPI_URL}${discover?.featuredImg?.url}`}
					width={discover?.featuredImg?.width}
					height={discover?.featuredImg?.height}
				/>
				<DiscoverFeatures
					name={discover.title}
					data={discover.features}
				/>

				<div className={'mb-16 mt-60'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
