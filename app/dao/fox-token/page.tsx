'use client';

import Image from 'next/image';
import Link from 'next/link';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {RoundButton} from '@/components/common/RoundButton';
import {foxTokenBenefits, foxTokenCommunityItems, foxTokenContributeItems} from '@/components/constants';
import {usePosts} from '@/hooks/usePosts';

import type {ReactNode} from 'react';

export default function FoxTokenPage(): ReactNode {
	const {posts} = usePosts();

	return (
		<div className={'relative mt-28 flex w-full flex-col items-center justify-center'}>
			<div className={'relative mb-40 flex h-[440px] w-full flex-col items-center justify-center py-20'}>
				<Image
					src={'/fox-token/foxTokenHeader.png'}
					alt={'Fox Token Header'}
					width={3776}
					height={880}
					className={'absolute left-0 top-0 -z-10 size-full rounded-2xl object-cover'}
				/>

				<div className={'mb-6 size-[88px]'}>
					<Image
						src={'/fox-token/foxLogo.png'}
						alt={'Fox Logo'}
						width={176}
						height={176}
						className={'size-full object-cover'}
					/>
				</div>

				<div className={'mb-10'}>
					<span className={'text-7xl text-white'}>{'FOX '}</span>
					<span className={'text-7xl font-bold italic text-blue'}>{'Power'}</span>
				</div>

				<div className={'flex flex-col items-center justify-center gap-2'}>
					<p className={'text-2xl'}>{'FOX Tokens wield mighty powers for those who hodl them.'}</p>
					<p className={'text-xs'}>
						{'NOTE: FOX Token benefits are subject to change, as determined by FOX Token holders.'}
					</p>
				</div>
			</div>

			<div className={'container mb-[240px] grid grid-cols-2 gap-20'}>
				<div className={'w-[640px]'}>
					<h1 className={'mb-8 text-7xl'}>{'How do I Participate?'}</h1>
					<p className={'text-gray-500'}>
						{
							'‍You can contribute as little or as much as you want to. Contribute more to get rewarded more. Keep up on everything going on in the DAO. Follow on Twitter for updates, join the Discord to learn about contributing, and discuss governance proposals on the FOX Forum.'
						}
					</p>
				</div>
				<div className={'flex flex-col gap-2'}>
					{foxTokenContributeItems.map(item => (
						<Link
							href={item.href}
							className={'group flex w-full justify-between rounded-2xl bg-secondBg px-10 py-7'}
							key={item.title}>
							<p className={'text-[40px] leading-[40px]'}>{item.title}</p>
							<RoundButton
								className={
									'size-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'
								}
								iconName={'arrow'}
							/>
						</Link>
					))}
				</div>
			</div>

			<div className={'relative -mx-4 mb-[240px] flex h-[552px] w-screen justify-center'}>
				<Image
					src={'/fox-token/foxBanner.png'}
					alt={'Fox Banner'}
					width={1920}
					height={550}
					className={'absolute left-0 top-0 -z-10 size-full object-cover'}
				/>

				<div className={'container flex items-center justify-between'}>
					<div className={'max-w-[800px]'}>
						<h1 className={'mb-8 text-7xl'}>{'How is a DAO different than a centralized company?'}</h1>
						<p>
							{
								'DAOs (Decentralized Autonomous Organizations) are a collective organization owned and managed by its members with all of them having a voice. We are actively building a powerful community around the open-source, self-custody, multi-chain crypto platform for the world. ‍ FOX token holders govern the ShapeShift DAO—a treasury endowed with 567,000,000 FOX Tokens (56.7% of all FOX) and actively generating revenue.\t\t\t\t\t\t'
							}
						</p>
					</div>
					<div className={'h-[398px] w-[423px]'}>
						<Image
							src={'/fox-token/foxRounded.png'}
							alt={'Fox Token Benefits'}
							width={846}
							height={796}
							className={'size-full object-cover'}
						/>
					</div>
				</div>
			</div>

			<div className={'container'}>
				<h1 className={'mb-14 text-7xl'}>{'Benefits of working with the DAO.'}</h1>

				<div className={'mb-[240px] grid grid-cols-3 gap-2'}>
					{foxTokenBenefits.map(benefit => (
						<div
							key={benefit.title}
							className={'flex items-center justify-start gap-6 rounded-2xl bg-secondBg px-10 py-[62px]'}>
							<>
								{benefit.icon ? (
									benefit.icon
								) : (
									<div className={'size-14 min-w-14 rounded-2xl bg-white/5'} />
								)}
							</>
							<h2 className={'text-2xl'}>{benefit.title}</h2>
						</div>
					))}
				</div>

				<h1 className={'mb-14 text-7xl'}>{'Resources'}</h1>

				<div className={'mb-[240px] grid grid-cols-3 gap-4'}>
					{posts.slice(0, 3).map(post => (
						<BlogPost
							post={post}
							key={post.id}
						/>
					))}
				</div>
				<h1 className={'mb-14 text-7xl text-white'}>{'Join our community'}</h1>

				<div className={'mb-[240px] grid grid-cols-5 gap-2'}>
					{foxTokenCommunityItems.map(item => (
						<Link
							href={item.href}
							target={'_blank'}
							className={
								'group flex items-center justify-center rounded-[80px] bg-secondBg py-5 hover:bg-secondHoverBg'
							}
							key={item.href}>
							{item.icon}
						</Link>
					))}
				</div>
				<Banner />
			</div>
		</div>
	);
}
