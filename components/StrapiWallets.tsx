'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import {cl} from '@/components/utils/cl';
import {getSupportedWallets} from '@/components/utils/query';

import type {TSupportedWalletData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiWallets(): ReactNode {
	const [wallet, setWallet] = useState<TSupportedWalletData[] | null>(null);

	useEffect(() => {
		const fetchWallets = async (): Promise<void> => {
			const wallets = await getSupportedWallets();
			setWallet(wallets);
		};
		fetchWallets();
	}, []);

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'context flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{(wallet || []).map(wallet => {
						return (
							<Link
								key={wallet.slug}
								href={`/resources/blog/${wallet.slug}`}
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
									{wallet?.image?.url ? (
										<Image
											src={`${process.env.STRAPI_URL}${wallet?.image?.url}`}
											alt={wallet.slug}
											width={wallet?.image?.width ?? 0}
											height={wallet?.image?.height ?? 0}
											className={'size-full object-contain'}
										/>
									) : (
										<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
									)}
								</div>

								<div className={'mt-6 flex flex-col gap-2'}>
									<div>
										<p className={'text-2xl text-white'}>{wallet.name}</p>
										<p className={'text-sm text-gray-500'}>{wallet.description}</p>
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
