'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import {cl} from '@/components/utils/cl';
import {getSupportedProtocols} from '@/components/utils/query';

import type {TSupportedProtocolData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiProtocols(): ReactNode {
	const [protocols, setProtocols] = useState<TSupportedProtocolData[] | null>(null);

	useEffect(() => {
		const fetchProtocols = async (): Promise<void> => {
			const protocols = await getSupportedProtocols();
			setProtocols(protocols);
		};
		fetchProtocols();
	}, []);

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{(protocols || []).map(protocol => {
						return (
							<Link
								key={protocol.slug}
								href={`/resources/supported-protocols/${protocol.slug}`}
								className={cl(
									'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-secondHoverBg'
								)}>
								<div
									className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl p-10'}
									style={{
										backgroundImage: "url('/supported-wallets/cover.png')",
										backgroundSize: 'cover',
										backgroundPosition: 'center'
									}}>
									{protocol?.featuredImg?.url ? (
										<Image
											src={`${process.env.STRAPI_URL}${protocol?.featuredImg?.url}`}
											alt={protocol.slug}
											width={protocol?.featuredImg?.width ?? 0}
											height={protocol?.featuredImg?.height ?? 0}
											className={'size-full object-contain'}
										/>
									) : (
										<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
									)}
								</div>

								<div className={'mt-6 flex flex-col gap-2'}>
									<div>
										<p className={'text-2xl text-white'}>{protocol.name}</p>
										<p
											className={
												'line-clamp-6 whitespace-break-spaces break-keep text-sm text-gray-500'
											}>
											{protocol.description}
										</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
