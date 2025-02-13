'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo} from 'react';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {ShapeshiftLogo} from '@/components/common/icons/ShapeshiftLogo';
import {TabItem} from '@/components/common/TabItem';
import {landingCards} from '@/components/constants';
import {LandingCard} from '@/components/LandingCard';
import {QuestionSection} from '@/components/QuestionSection';
import CardsRow from '@/components/strapi-sections/cards-row/CardsRow';
import {cl} from '@/components/utils/cl';
import {useFaq} from '@/hooks/useFaq';
import {usePosts} from '@/hooks/usePosts';

import type {TBlogPost, TCard, TFaqSectionItem} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function HomePage(): ReactNode {
	const {posts} = usePosts();
	const {data} = useFaq();

	const allQuestions = useMemo(() => {
		const questions: TFaqSectionItem[] = [];
		data?.faqSection.forEach(item => {
			item.faqSectionItem.forEach(item => {
				questions.push(item);
			});
		});
		return questions;
	}, [data]);

	return (
		<div className={'flex min-h-screen flex-col items-center pt-4'}>
			<div className={'relative flex h-[814px] w-full justify-center rounded-2xl'}>
				<Image
					src={'/homepageBanner.png'}
					alt={'homepage_banner'}
					width={'3776'}
					height={'1628'}
					className={'absolute left-0 top-0 -z-10 size-full rounded-2xl object-cover'}
				/>

				<div className={'container flex w-full items-center justify-between pb-20 pt-6'}>
					<div className={'flex h-full max-w-[800px] flex-col justify-between'}>
						<ShapeshiftLogo />
						<div className={'flex flex-col gap-6'}>
							<h1 className={'text-7xl text-white'}>
								{'Your multichain '}
								{'crypto home base.'}
							</h1>

							<p className={'text-xl text-white'}>
								{
									'Your gateway to trading, tracking, earning, and exploring crypto effortlessly. A community-owned, private, non-custodial, multichain platform putting you in full control of your digital assets.'
								}
							</p>
						</div>
					</div>
					<div className={'h-[508px] w-[500px]'}>
						<Image
							src={'/widget.png'}
							alt={'widget'}
							width={'1000'}
							height={'1016'}
							className={'size-full rounded-2xl object-cover'}
						/>
					</div>
				</div>
			</div>
			<div className={'container'}>
				<div className={'mb-14 mt-40 flex flex-col'}>
					<h1 className={'text-7xl text-white'}>{'Your Wallet. One App.'}</h1>
					<h1 className={'text-7xl text-blue'}>{'Endless Opportunity.'}</h1>
				</div>

				<CardsRow data={landingCards}>{(card: TCard) => <LandingCard data={card} />}</CardsRow>

				<div className={'mb-[240px]'}>
					<h1 className={'mb-14 text-7xl text-white'}>{'Explore our features.'}</h1>
					<div className={'group relative h-[674px] overflow-hidden rounded-2xl'}>
						<Image
							src={'/landing/landingTabsBg.png'}
							alt={'tab_bg'}
							width={'2800'}
							height={'1348'}
							className={'size-full object-cover transition-all duration-300 group-hover:scale-[1.02]'}
						/>

						<Image
							src={'/landing/tabWidget.png'}
							alt={'tab_bg'}
							width={'400'}
							height={'500'}
							className={'absolute bottom-0 left-1/2 -translate-x-1/2'}
						/>

						<div className={'absolute left-0 top-0 mt-16 flex size-full flex-col items-center'}>
							<h1 className={'mb-7 text-center text-[40px] leading-[40px] text-white'}>
								{'Multichain crypto home base'}
							</h1>
							<div className={'flex w-min gap-4 rounded-full border border-white/10 p-2'}>
								{[{title: 'Buy'}, {title: 'Trade'}, {title: 'Earn'}].map(item => (
									<TabItem
										key={item.title}
										title={item.title}
									/>
								))}
							</div>
						</div>
					</div>
					<div className={'mb-[240px] mt-2 grid w-full grid-cols-3 gap-2'}>
						<Card className={'col-span-2 row-span-1'}>
							<Image
								src={'/landing/landingCard1.png'}
								alt={'tab_bg'}
								width={'931'}
								height={'322'}
								className={'size-full object-cover transition-all duration-300 hover:scale-[1.02]'}
							/>
						</Card>
						<Card
							className={'col-span-1 row-span-2'}
							href={'/products/mobile-app'}>
							<Image
								src={'/landing/landingCard2.png'}
								alt={'tab_bg'}
								width={'461'}
								height={'652'}
								className={'size-full object-cover transition-all duration-300 hover:scale-[1.02]'}
							/>
						</Card>
						<Card
							className={'col-span-1 row-span-1'}
							href={'/resources/supported-chains'}>
							<Image
								src={'/landing/landingCard3.png'}
								alt={'tab_bg'}
								width={'461'}
								height={'322'}
								className={'size-full object-cover transition-all duration-300 hover:scale-[1.02]'}
							/>
						</Card>
						<Card
							className={'col-span-1 row-span-1'}
							href={'/products/earn'}>
							<Image
								src={'/landing/landingCard4.png'}
								alt={'tab_bg'}
								width={'461'}
								height={'322'}
								className={'size-full object-cover transition-all duration-300 hover:scale-[1.02]'}
							/>
						</Card>
						<Card
							className={'col-span-3'}
							href={'/'}>
							<Image
								src={'/landing/landingCard5.png'}
								alt={'tab_bg'}
								width={'1400'}
								height={'80'}
								className={'size-full object-cover transition-all duration-300 hover:scale-[1.02]'}
							/>
						</Card>
					</div>
					<div className={'mb-[240px] grid w-full grid-cols-3 gap-4'}>
						<div className={'col-span-1 flex flex-col gap-16'}>
							<h1 className={'text-7xl text-white'}>{'Read more about ShapeShift.'}</h1>
							<Button
								title={'See all articles'}
								href={'/resources/blog'}
							/>
						</div>
						{posts.slice(0, 2).map((post: TBlogPost) => (
							<BlogPost
								key={post.id}
								post={post}
							/>
						))}
					</div>

					<div>
						<div className={'mb-[77px] text-7xl'}>{'FAQ'}</div>
						<div className={'flex flex-col gap-2'}>
							{allQuestions.slice(0, 7).map(question => (
								<div key={question.id}>
									<QuestionSection faqSectionItem={question} />
								</div>
							))}
						</div>
					</div>
				</div>
				<Banner />
			</div>
		</div>
	);
}

const Card = ({children, className, href}: {children: ReactNode; className: string; href?: string}): ReactNode => {
	return (
		<>
			{href ? (
				<Link
					href={href}
					target={'_blank'}
					className={cl('cursor-pointer overflow-hidden rounded-2xl', className)}>
					{children}
				</Link>
			) : (
				<div className={cl('cursor-pointer overflow-hidden rounded-2xl', className)}>{children}</div>
			)}
		</>
	);
};
