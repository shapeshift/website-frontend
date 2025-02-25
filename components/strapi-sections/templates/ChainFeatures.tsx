import Image from 'next/image';

import {Button} from '@/components/common/Button';

import type {TStrapiImage} from '@/types/strapi';
import type {ReactNode} from 'react';

export function ChainFeatures({chainName, foxImg}: {chainName: string; foxImg: TStrapiImage}): ReactNode {
	return (
		<section className={'container flex flex-col'}>
			<h1 className={'mb-16 max-w-[700px] text-7xl'}>{'Explore our features.'}</h1>

			<div className={'grid gap-2'}>
				<div
					className={'grid aspect-[760/540] h-[540px] w-full grid-cols-2 overflow-hidden rounded-2xl'}
					style={{
						backgroundImage: "url('/supported-wallets/cover.png')",
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
					<div className={'w-full p-20'}>
						<p className={'text-[40px] leading-[48px] text-white'}>{`ShapeShift ${chainName} wallet`}</p>
						<div className={'flex flex-col gap-4 pt-8'}>
							<p className={'text-xl text-secondary/50'}>
								{`Easily connect your favorite ${chainName} Wallet to ShapeShift. Need a ${chainName} Wallet? Get started with the ShapeShift wallet today.`}
							</p>
							<p className={'text-xl text-secondary/50'}>
								{`Easily view your ${chainName} wallet address, ${chainName} balance, ${chainName} transaction history, and ${chainName} price in one simple interactive dashboard.`}
							</p>
						</div>
						<div className={'mt-10'}>
							<Button
								variant={'blue'}
								title={'Get Started'}
								hasArrow
							/>
						</div>
					</div>
					<div className={'flex w-full items-end justify-end'}>
						<Image
							src={'/supported-chains/wallet-mockup.png'}
							alt={'ShapeShift wallet'}
							width={680}
							height={540}
						/>
					</div>
				</div>

				<div
					className={
						'grid aspect-[1400/476] h-[476px] grid-cols-3 gap-4 overflow-hidden rounded-2xl bg-secondBg p-10'
					}
					style={{
						backgroundImage: "url('/supported-chains/grid-bg.png')",
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
					<div className={'flex w-full items-center justify-start px-20'}>
						<p className={'text-[40px] leading-[48px] text-white'}>{'Hardware wallet support'}</p>
					</div>
					<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
						<Image
							src={'/supported-chains/keepkey.png'}
							alt={'KeepKey'}
							width={349}
							height={204}
						/>
						<div className={'text-left'}>
							<p className={'pb-2 text-2xl text-white'}>{'KeepKey'}</p>
							<p className={'text-base text-secondary/50'}>
								{`Connect your KeepKey hardware wallet to ShapeShift and enjoy permissionless, private ${chainName} DeFi.`}
							</p>
						</div>
					</div>
					<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
						<Image
							src={'/supported-chains/ledger.png'}
							alt={'Ledger'}
							width={349}
							height={204}
						/>
						<div className={'text-left'}>
							<p className={'pb-2 text-2xl text-white'}>{'Ledger'}</p>
							<p className={'text-base text-secondary/50'}>
								{`Privately connect your Ledger directly to ShapeShift without the need for Ledger Live and enjoy permissionless ${chainName}.`}
							</p>
						</div>
					</div>
				</div>

				<div className={'grid grid-cols-2 gap-2'}>
					<div
						style={{
							background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
						}}
						className={'flex w-full flex-col items-center gap-6 rounded-2xl pt-20'}>
						<div className={'px-20 text-left'}>
							<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
								<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>
									{`Easily buy ${chainName} in seconds`}
								</p>
								<div>
									<Button
										variant={'white'}
										className={'!w-[120px]'}
										title={'Buy'}
									/>
								</div>
							</div>
							<p className={'pb-4 text-base text-secondary/50'}>
								{`Experience the multichain simplicity of buying ${chainName} with ShapeShift's easy-to-use fiat ramp. No matter where you are, ShapeShift makes it effortless buy ${chainName}.`}
							</p>
							<p className={'text-base text-secondary/50'}>
								{`Say goodbye to complex procedures and failed transactions, and say hello to a new way to ShapeShift your ${chainName}.`}
							</p>
						</div>
						<div className={'mt-auto flex items-end justify-center pt-5'}>
							<Image
								src={'/supported-chains/buy-mockup.png'}
								alt={''}
								className={'h-[368px] w-full'}
								width={515}
								height={368}
							/>
						</div>
					</div>
					<div
						style={{
							background: 'linear-gradient(180deg, #101114 0%, #16181C 100%)'
						}}
						className={'flex w-full flex-col items-center gap-6 rounded-2xl pt-20'}>
						<div className={'px-20 text-left'}>
							<div className={'flex w-full flex-row items-baseline justify-between gap-x-4'}>
								<p className={'max-w-80 pb-8 text-[40px] leading-[48px] text-white'}>
									{`Self-custodial ${chainName}: Redefined`}
								</p>
								<div>
									<Button
										variant={'white'}
										className={'!w-[120px] whitespace-nowrap'}
										title={'Learn More'}
									/>
								</div>
							</div>
							<p className={'pb-4 text-base text-secondary/50'}>
								{`When you ShapeShift your ${chainName}, your keys and your crypto are always just that--yours!`}
							</p>
							<p className={'text-base text-secondary/50'}>
								{`Welcome to the most private multichain interface for ${chainName}.`}
							</p>
						</div>
						<div className={'mr-[-20%] mt-auto flex items-end justify-end pt-5'}>
							<Image
								src={`${process.env.STRAPI_URL}${foxImg.url}`}
								alt={''}
								className={'h-[368px] w-full'}
								width={foxImg.width}
								height={foxImg.height}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
