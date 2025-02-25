'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import {cl} from '@/components/utils/cl';
import {getSupportedChains} from '@/components/utils/query';

import type {TSupportedChainData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiWallets(): ReactNode {
	const [chains, setChains] = useState<TSupportedChainData[] | null>(null);

	useEffect(() => {
		const fetchChains = async (): Promise<void> => {
			const chains = await getSupportedChains();
			setChains(chains);
		};
		fetchChains();
	}, []);

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{(chains || []).map(chain => {
						return (
							<Link
								key={chain.slug}
								href={`/resources/supported-chains/${chain.slug}`}
								className={cl(
									'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-secondHoverBg'
								)}>
								<div
									className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl px-10 pt-10'}
									style={{
										backgroundImage: "url('/supported-wallets/cover.png')",
										backgroundSize: 'cover',
										backgroundPosition: 'center'
									}}>
									{chain?.featuredImg?.url ? (
										<Image
											src={`${process.env.STRAPI_URL}${chain?.featuredImg?.url}`}
											alt={chain.slug}
											width={chain?.featuredImg?.width ?? 0}
											height={chain?.featuredImg?.height ?? 0}
											className={'size-full object-contain'}
										/>
									) : (
										<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
									)}
								</div>

								<div className={'mt-6 flex flex-col gap-2'}>
									<div>
										<p className={'text-2xl text-white'}>{chain.name}</p>
										<p
											className={
												'line-clamp-6 whitespace-break-spaces break-keep text-sm text-gray-500'
											}>
											{chain.description}
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
