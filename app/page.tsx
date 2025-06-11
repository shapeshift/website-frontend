'use client';

import Image from 'next/image';
import {useState} from 'react';

import {Banner} from '@/app/_components/Banner';
import {LatestBlogPosts} from '@/app/_components/BlogList';
import {Carousel} from '@/app/_components/Carousel';
import {LandingCard} from '@/app/_components/LandingCard';
import {LandingInfoCard} from '@/app/_components/LandingInfoCard';
import {LocalizedLink} from '@/app/_components/LocalizedLink';
import CardsRow from '@/app/_components/strapi/cards-row/CardsRow';
import {TabItem} from '@/app/_components/TabItem';
import {TradingWidget} from '@/app/_components/trading/TradingWidget';
import {cl} from '@/app/_utils/cl';
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
	landingCards,
	landingInfoCards,
	statCardsTitle
} from '@/app/_utils/constants';

import type {TCard} from '@/app/_components/strapi/types';
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
					<div>
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
					<div className={'group relative h-[350px] overflow-hidden rounded-2xl md:h-[500px] lg:h-[674px]'}>
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
							<Image
								src={'/landing/tabBuy.png'}
								alt={'img'}
								width={'2160'}
								height={'868'}
								className={`object-cover ${tab === 'Buy' ? 'block' : 'hidden'}`}
								priority
							/>
							<Image
								src={'/landing/tabTrade.png'}
								alt={'img'}
								width={'2160'}
								height={'868'}
								className={`object-cover ${tab === 'Trade' ? 'block' : 'hidden'}`}
								priority
							/>
							<Image
								src={'/landing/tabMarkets.png'}
								alt={'img'}
								width={'2160'}
								height={'868'}
								className={`object-cover ${tab === 'Markets' ? 'block' : 'hidden'}`}
								priority
							/>
						</div>

						<div className={'absolute left-0 top-0 mt-8 flex size-full flex-col items-center lg:mt-16'}>
							<h1
								className={
									'mb-7 px-4 text-center text-2xl text-white lg:px-0 lg:text-[40px] lg:leading-[40px]'
								}>
								{featureTabTitle}
							</h1>
							<div className={'flex w-min gap-2 rounded-full border border-white/10 p-2 lg:gap-4'}>
								{homepageFeatureTabs.map((item: string) => (
									<button
										key={item}
										onClick={() => setTab(item)}>
										<TabItem
											className={'!px-6 lg:!px-8'}
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
								<span className={'max-w-[560px] text-center text-sm text-white lg:text-base'}>
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
							href={'/defi-wallet'}>
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
										<LocalizedLink
											href={href}
											target={'_blank'}
											rel={'noopener noreferrer'}
											className={'relative flex max-h-10 w-max items-center justify-start'}>
											<Logo />
										</LocalizedLink>
									</div>
								))}
							</Carousel>
						</Card>
					</div>
					<div className={'mb-[120px] lg:mb-60'}>
						<LatestBlogPosts limit={2} />
					</div>
					<div className={'mb-[120px] lg:mb-60'}>
						<div className={'grid grid-cols-1 gap-4 lg:grid-cols-3'}>
							<div className={'col-span-1 mb-6 lg:mb-0'}>
								<h1 className={'max-w-[400px] text-[40px] leading-10 lg:text-7xl'}>{statCardsTitle}</h1>
							</div>
							<div className={'col-span-1 flex flex-col gap-4'}>
								<LandingInfoCard
									title={landingInfoCards[0].title}
									stat={landingInfoCards[0].stat}
								/>
								<LandingInfoCard
									title={landingInfoCards[1].title}
									stat={landingInfoCards[1].stat}
								/>
							</div>
							<div className={'col-span-1 flex flex-col gap-4'}>
								<LandingInfoCard
									title={landingInfoCards[2].title}
									stat={landingInfoCards[2].stat}
								/>
								<LandingInfoCard
									title={landingInfoCards[3].title}
									stat={landingInfoCards[3].stat}
								/>
							</div>
						</div>
					</div>
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
				<LocalizedLink
					href={href}
					target={target}
					className={cl('cursor-pointer overflow-hidden rounded-2xl', className)}>
					{children}
				</LocalizedLink>
			) : (
				<div className={cl('overflow-hidden rounded-2xl', className)}>{children}</div>
			)}
		</>
	);
};
