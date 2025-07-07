import Image from 'next/image';
import {notFound} from 'next/navigation';

import {ProtocolAbout} from '@/app/[lang]/(resources)/_components/ProtocolAbout';
import {ProtocolEasier} from '@/app/[lang]/(resources)/_components/ProtocolEasier';
import {ProtocolFeatures} from '@/app/[lang]/(resources)/_components/ProtocolFeatures';
import {ProtocolHeader} from '@/app/[lang]/(resources)/_components/ProtocolHeader';
import {Banner} from '@/app/[lang]/_components/Banner';
import {getSupportedProtocol} from '@/app/[lang]/_utils/query';

import type {TSupportedProtocolData} from '@/app/[lang]/_components/strapi/types';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/supported-protocols?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const protocol = data.data[0] as TSupportedProtocolData;
	if (!protocol) {
		return notFound();
	}

	const imageUrl = protocol.featuredImg?.formats?.thumbnail?.url || protocol.featuredImg?.url;

	const metadata: Metadata = {
		title: `${protocol.name} | ShapeShift`,
		description: `Shift into ${protocol.name} with ShapeShift!`,
		keywords: `${protocol.name}, ShapeShift`,
		openGraph: {
			title: protocol.name,
			description: `Shift into ${protocol.name} with ShapeShift!`,
			type: 'website'
		},
		twitter: {
			card: 'summary_large_image',
			title: protocol.name,
			description: `Shift into ${protocol.name} with ShapeShift!`
		}
	};

	if (imageUrl) {
		metadata.openGraph!.images = [
			{
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
			}
		];
		metadata.twitter!.images = [
			{
				url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
			}
		];
	}

	return metadata;
}

export default async function ProtocolPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const protocol = await getSupportedProtocol(slug);

	if (!protocol) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'absolute inset-0 -z-10 hidden lg:block'}>
				<Image
					src={'/heroBg.png'}
					alt={'hero-bg'}
					height={'2256'}
					width={'3840'}
					className={'object-cover'}
				/>
			</div>
			<div className={'container mt-[60px] flex flex-col justify-center'}>
				<ProtocolHeader
					name={protocol?.name}
					description={protocol?.description}
					items={['Self-custodial', 'Private', 'Multichain trading']}
					url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${protocol?.featuredImg?.url}`}
					width={protocol?.featuredImg?.width}
					height={protocol?.featuredImg?.height}
				/>
				<ProtocolAbout
					description={protocol?.description}
					name={protocol?.name}
				/>
				<ProtocolEasier cards={protocol?.cards} />
				<ProtocolFeatures
					description={protocol?.collabDescription}
					features={protocol?.features}
				/>

				<div className={'mb-16 mt-80'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
