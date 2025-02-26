import {notFound} from 'next/navigation';

import {ProtocolAbout} from '@/app/resources/supported-protocols/ProtocolAbout';
import {ProtocolEasier} from '@/app/resources/supported-protocols/ProtocolEasier';
import {ProtocolFeatures} from '@/app/resources/supported-protocols/ProtocolFeatures';
import {ProtocolHeader} from '@/app/resources/supported-protocols/ProtocolHeader';
import {Banner} from '@/components/common/Banner';
import {getSupportedProtocol} from '@/components/utils/query';

import type {TSupportedProtocolData} from '@/types/strapi';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.STRAPI_URL}/api/supported-protocols?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const protocol = data.data[0] as TSupportedProtocolData;
	if (!protocol) {
		return notFound();
	}

	const imageUrl = protocol.featuredImg.formats.thumbnail.url;
	return {
		title: `${protocol.name} | Shapeshift`,
		description: `Shift into ${protocol.name} with ShapeShift!`,
		keywords: `${protocol.name}, Shapeshift`,
		openGraph: {
			title: protocol.name,
			description: `Shift into ${protocol.name} with ShapeShift!`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: protocol.name,
			description: `Shift into ${protocol.name} with ShapeShift!`,
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
	const protocol = await getSupportedProtocol(slug);

	if (!protocol) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[60px] flex flex-col justify-center lg:mt-60'}>
				<ProtocolHeader
					name={protocol?.name}
					description={protocol?.description}
					items={['Self-custodial', 'Private', 'Multichain trading']}
					url={`${process.env.STRAPI_URL}${protocol?.featuredImg?.url}`}
					width={protocol?.featuredImg?.width}
					height={protocol?.featuredImg?.height}
				/>
				<ProtocolAbout
					description={protocol?.description}
					name={protocol?.name}
				/>
				<ProtocolEasier protocolName={protocol?.name} />
				<ProtocolFeatures description={protocol?.collabDescription} />

				<div className={'mb-16 mt-80'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
