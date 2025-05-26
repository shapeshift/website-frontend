import Image from 'next/image';
import Link from 'next/link';

import {Button} from '@/components/common/Button';
import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

function OgPlatformFeature({description, index}: {description: string; index: number}): ReactNode {
	return (
		<div
			className={'container relative w-full overflow-hidden rounded-2xl bg-secondBg'}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div
				className={cl(
					'flex gap-x-[120px] justify-between flex-col',
					index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
				)}>
				<div className={'flex max-w-screen-sm flex-col p-10'}>
					<h2 className={'mb-4 text-[40px] leading-[48px]'}>{'OG DeFi Platforms'}</h2>
					<p className={'mb-10 text-gray-500'}>{description}</p>
					<Button
						variant={'blue'}
						title={'Learn More'}
						href={'https://app.shapeshift.com'}
						hasArrow
						className={'hidden lg:flex'}
					/>
				</div>
				<div className={'aspect-square h-[400px] overflow-hidden rounded-2xl bg-secondHoverBg'}>
					<Image
						src={'/protocols/collab.gif'}
						alt={''}
						className={'object-contain p-10'}
						width={400}
						height={400}
					/>
				</div>
			</div>
		</div>
	);
}
function MobileAppFeature({index}: {index: number}): ReactNode {
	return (
		<div
			className={'container relative w-full overflow-hidden rounded-2xl bg-secondBg'}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div
				className={cl(
					'flex gap-x-[120px] justify-between 	flex-col',
					index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
				)}>
				<div className={'flex max-w-screen-sm flex-col p-10'}>
					<h2 className={'mb-4 text-[40px] leading-[48px]'}>{'Shift to DeFi on the go'}</h2>
					<p className={'whitespace-pre-line pb-4 text-base text-gray-500'}>
						{'Permissionlessly track, trade, shift, and earn with your favorite chains such as '}
						<Link
							className={'text-white underline'}
							href={'/chains/bitcoin'}>
							{'Bitcoin'}
						</Link>
						{', '}
						<Link
							className={'text-white underline'}
							href={'/chains/dogecoin'}>
							{'Dogecoin'}
						</Link>
						{', '}
						<Link
							className={'text-white underline'}
							href={'/chains/ethereum'}>
							{'Ethereum'}
						</Link>
						{', '}
						<Link
							className={'text-white underline'}
							href={'/chains/arbitrum'}>
							{'Arbitrum'}
						</Link>
						{', '}
						<Link
							className={'text-white underline'}
							href={'/chains/avalanche'}>
							{'AVAX'}
						</Link>
						{' and more.'}
					</p>
					<p className={'mb-10 whitespace-pre-line text-base text-secondary/50'}>
						{'Do more with your crypto when you ShapeShift.'}
					</p>
					<div className={'flex gap-3'}>
						<Link
							href={'/apple-app-store'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/appstore.png'}
								alt={'appstore'}
								width={390}
								height={120}
							/>
						</Link>

						<Link
							href={'/google-play-store'}
							target={'_blank'}
							className={'h-[40px] w-[130px]'}>
							<Image
								src={'/google_play.png'}
								alt={'googleplay'}
								width={390}
								height={120}
							/>
						</Link>
					</div>
				</div>
				<div className={'aspect-square h-[400px] overflow-hidden rounded-2xl bg-secondHoverBg'}>
					<Image
						src={'/protocols/mobile-app.png'}
						alt={''}
						className={'object-contain p-10'}
						width={400}
						height={400}
					/>
				</div>
			</div>
		</div>
	);
}
function GetPaidToTradeFeature({index}: {index: number}): ReactNode {
	return (
		<div
			className={'container relative w-full overflow-hidden rounded-2xl bg-secondBg'}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div
				className={cl(
					'flex gap-x-[120px] justify-between flex-col',
					index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
				)}>
				<div className={'flex max-w-screen-sm flex-col p-10'}>
					<h2 className={'mb-4 text-[40px] leading-[48px]'}>{'Get Paid to Trade'}</h2>
					<p className={'mb-4 text-gray-500'}>
						{'Stake FOX into rFOX, get rewarded, and save when you trade.'}
					</p>
					<p className={'mb-10 text-gray-500'}>{'The more you trade, the more you earn.'}</p>
					<Button
						variant={'blue'}
						title={'Start Earning'}
						href={'https://app.shapeshift.com/pools#/rfox'}
						hasArrow
						className={'hidden lg:flex'}
					/>
				</div>
				<div className={'aspect-square h-[400px] overflow-hidden rounded-2xl bg-secondHoverBg'}>
					<Image
						src={'/protocols/rFox.png'}
						alt={''}
						className={' object-contain p-10'}
						width={603}
						height={605}
					/>
				</div>
			</div>
		</div>
	);
}
function PortalsFeature({index}: {index: number}): ReactNode {
	return (
		<div
			className={'container relative w-full overflow-hidden rounded-2xl bg-secondBg'}
			style={{
				backgroundImage: "url('/chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div
				className={cl(
					'flex gap-x-[120px] justify-between flex-col',
					index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
				)}>
				<div className={'flex max-w-screen-sm flex-col p-10'}>
					<h2 className={'mb-4 text-[40px] leading-[48px]'}>{'Powered by Portals'}</h2>
					<p className={'mb-4 text-gray-500'}>{'Shifts are Powered by Portals!'}</p>
					<p className={'mb-10 text-gray-500'}>
						{
							'When you Shift, you take advantage of Portals bespoke routing and optimizations to execute the best trades.'
						}
					</p>
					<Button
						variant={'blue'}
						title={'Start Trading'}
						href={'https://app.shapeshift.com/'}
						hasArrow
						className={'hidden lg:flex'}
					/>
				</div>
				<div className={'aspect-square h-[400px] overflow-hidden rounded-2xl bg-secondHoverBg'}>
					<Image
						src={'/protocols/portals.gif'}
						alt={''}
						className={'object-contain p-10'}
						width={603}
						height={605}
					/>
				</div>
			</div>
		</div>
	);
}

export function ProtocolFeatures({description}: {description: string}): ReactNode {
	return (
		<div className={'mt-40 grid gap-x-[120px] gap-y-40 lg:grid-cols-1'}>
			<OgPlatformFeature
				description={description}
				index={0}
			/>
			<MobileAppFeature index={1} />
			<GetPaidToTradeFeature index={2} />
			<PortalsFeature index={3} />
		</div>
	);
}
