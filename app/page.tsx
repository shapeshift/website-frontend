'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';

import {LatestBlogPosts} from '@/components/BlogList';
import {Carousel} from '@/components/Carousel';
import {Banner} from '@/components/common/Banner';
import {TabItem} from '@/components/common/TabItem';
import {
	carouselLogos,
	featureCard1BlueTitle,
	featureCard1WhiteTitle,
	featureCard3BlueTitle,
	featureCard3WhiteTitle,
	featureCard4BlueTitle,
	featureCard4WhiteTitle,
	featureTabTitle,
	featuresTitle,
	heroDescription,
	heroTitle,
	homepageBlueTitle,
	homepageFeatureTabs,
	homepageWhiteTitle,
	landingCards
} from '@/components/constants';
import {LandingCard} from '@/components/LandingCard';
import CardsRow from '@/components/strapi/cards-row/CardsRow';
import {StrapiFAQ} from '@/components/StrapiFAQ';
import {TradingWidget} from '@/components/trading/TradingWidget';
import {cl} from '@/components/utils/cl';

import type {TCard} from '@/components/strapi/types';
import type {ReactNode} from 'react';

export default function HomePage(): ReactNode {
	const [tab, setTab] = useState(homepageFeatureTabs[0]);
	return (
		<div className={'flex min-h-screen flex-col items-center pt-4'}>
			<div className={'relative flex h-[814px] w-full justify-center rounded-2xl p-6'}>
				<Image
					src={'/homepageBanner.png'}
					alt={'homepage_banner'}
					width={'3776'}
					height={'1628'}
					priority
					loading={'eager'}
					className={'absolute left-0 top-0 z-10 size-full rounded-2xl object-cover'}
				/>

				<div
					className={
						'container z-20 flex w-full flex-col items-center justify-between pb-20 pt-6 lg:flex-row'
					}>
					<div className={'flex h-full max-w-[800px] flex-col justify-end'}>
						<div className={'flex flex-col gap-6'}>
							<h1
								className={
									'mb-6 max-w-screen-sm text-center text-[40px] leading-10 text-white lg:text-left lg:text-7xl'
								}>
								{heroTitle}
							</h1>

							<p className={'mb-[60px] text-center text-sm text-white lg:text-left lg:text-xl'}>
								{heroDescription}
							</p>
						</div>
					</div>
					<div className={''}>
						<TradingWidget />
					</div>
				</div>
			</div>
			<div className={'absolute inset-0 -z-10 mt-[95vh] hidden lg:block'}>
				<Image
					src={'/heroBg.png'}
					alt={'hero-bg'}
					height={'2256'}
					width={'3840'}
					className={'object-cover'}
				/>
			</div>
			<div className={'container mt-[120px]'}>
				<div className={' mb-14 mt-40 inline'}>
					<span className={'mb-6 text-[40px] leading-10 text-white lg:text-7xl'}>{homepageWhiteTitle}</span>
					<br className={'hidden lg:block'} />
					&nbsp;
					<span className={'text-[40px] leading-10 text-blue lg:text-7xl'}>{homepageBlueTitle}</span>
				</div>

				<CardsRow data={landingCards}>{(card: TCard) => <LandingCard data={card} />}</CardsRow>

				<div className={'mb-[120px] lg:mb-60'}>
					<h1 className={'mb-8 text-[40px] leading-10 text-white lg:mb-14 lg:text-7xl'}>{featuresTitle}</h1>
					<div className={'group relative h-[674px] overflow-hidden rounded-2xl'}>
						<Image
							src={'/landing/landingTabsBg.png'}
							alt={'tab_bg'}
							width={'2800'}
							height={'1348'}
							className={'size-full object-cover transition-all duration-300 group-hover:scale-[1.02]'}
						/>
						<div
							className={
								'absolute -bottom-6 left-1/2 w-3/4 -translate-x-1/2 overflow-hidden rounded-t-2xl'
							}>
							{tab === 'Buy' ? (
								<Image
									src={'/landing/tabBuy.png'}
									alt={'img'}
									width={'2160'}
									height={'868'}
									className={'object-cover'}
								/>
							) : tab === 'Trade' ? (
								<Image
									src={'/landing/tabTrade.png'}
									alt={'img'}
									width={'2160'}
									height={'868'}
									className={'object-cover'}
								/>
							) : (
								<Image
									src={'/landing/tabMarkets.png'}
									alt={'img'}
									width={'2160'}
									height={'868'}
									className={'object-cover'}
								/>
							)}
						</div>

						<div className={'absolute left-0 top-0 mt-8 flex size-full flex-col items-center lg:mt-16'}>
							<h1 className={'mb-7 text-center text-[40px] leading-[40px] text-white'}>
								{featureTabTitle}
							</h1>
							<div className={'flex w-min gap-4 rounded-full border border-white/10 p-2'}>
								{homepageFeatureTabs.map((item: string) => (
									<button
										key={item}
										onClick={() => setTab(item)}>
										<TabItem
											className={'!px-10'}
											title={item}
											selected={tab === item}
										/>
									</button>
								))}
							</div>
						</div>
					</div>
					<div className={'mb-[120px] mt-2 grid w-full grid-cols-1 gap-2 lg:mb-60 lg:grid-cols-3'}>
						<Card
							className={
								'relative col-span-1 rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C] transition-all duration-300 hover:scale-[1.02] lg:col-span-2 lg:row-span-1'
							}>
							<Image
								src={'/landing/landingCard1.png'}
								alt={'tab_bg'}
								width={'931'}
								height={'322'}
								className={'size-full object-cover'}
							/>
							<div
								className={
									'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-[40px] leading-[48px]'
								}>
								<span className={'max-w-[560px] text-center text-white'}>
									{featureCard1WhiteTitle}
									<span className={'text-blue'}>{featureCard1BlueTitle}</span>
								</span>
							</div>
						</Card>
						<Card
							className={'col-span-1 row-span-2'}
							href={'/mobile-app'}>
							<Image
								src={'/landing/landingCard2.png'}
								alt={'tab_bg'}
								width={'461'}
								height={'652'}
								className={'size-full object-cover transition-all duration-300 hover:scale-[1.02]'}
							/>
						</Card>
						<Card
							className={'relative col-span-1 row-span-1 transition-all duration-300 hover:scale-[1.02]'}
							href={'https://shapeshift.builtby.dad/defi-wallet'}>
							<Image
								src={'/landing/landingCard3.png'}
								alt={'tab_bg'}
								width={'461'}
								height={'322'}
								className={'size-full object-cover transition-all duration-300 '}
							/>
							<div
								className={
									'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-[40px] leading-[48px]'
								}>
								<span className={'text-center text-[64px] italic leading-[64px] text-blue'}>
									{featureCard3WhiteTitle}
								</span>
								<span className={'text-center text-[40px] leading-[48px]'}>
									{featureCard3BlueTitle}
								</span>
							</div>
						</Card>
						<Card
							className={'relative col-span-1 row-span-1 transition-all duration-300 hover:scale-[1.02]'}
							href={'https://app.shapeshift.com/markets/recommended#/markets/recommended'}
							target={'_blank'}>
							<Image
								src={'/landing/landingCard4.png'}
								alt={'tab_bg'}
								width={'461'}
								height={'322'}
								className={'size-full object-cover'}
							/>
							<div
								className={
									'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-[40px] leading-[48px]'
								}>
								<span className={'text-center text-[64px] italic leading-[64px] text-blue'}>
									{featureCard4WhiteTitle}
								</span>
								<span className={'text-center text-[40px] leading-[48px]'}>
									{featureCard4BlueTitle}
								</span>
							</div>
						</Card>
						<Card className={'col-span-1 row-span-1 flex items-center bg-secondBg lg:col-span-3'}>
							<Carousel pauseOnHover>
								{Object.values(carouselLogos).map(({Logo, href}, index) => (
									<div
										key={index}
										className={'mx-10'}>
										<Link
											href={href}
											target={'_blank'}
											rel={'noopener noreferrer'}
											className={'relative flex max-h-10 w-max items-center justify-start'}>
											<Logo />
										</Link>
									</div>
								))}
							</Carousel>
						</Card>
					</div>
					<div className={'mb-[120px] lg:mb-60'}>
						<LatestBlogPosts limit={2} />
					</div>

					<StrapiFAQ />
				</div>
				<Banner />
			</div>
		</div>
	);
}

const Card = ({
	children,
	className,
	href,
	target
}: {
	children: ReactNode;
	className: string;
	href?: string;
	target?: string;
}): ReactNode => {
	return (
		<>
			{href ? (
				<Link
					href={href}
					target={target}
					className={cl('cursor-pointer overflow-hidden rounded-2xl', className)}>
					{children}
				</Link>
			) : (
				<div className={cl('overflow-hidden rounded-2xl', className)}>{children}</div>
			)}
		</>
	);
};
