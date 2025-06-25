import Image from 'next/image';

import {Banner} from '@/app/[lang]/_components/Banner';
import {LatestBlogPosts} from '@/app/[lang]/_components/BlogList';
import {LocalizedLink} from '@/app/[lang]/_components/LocalizedLink';
import {RoundButton} from '@/app/[lang]/_components/RoundButton';
import {
	benefitsTitle,
	communityTitle,
	foxTokenBenefits,
	foxTokenContributeItems,
	foxTokenDescription,
	foxTokenDescriptionNote,
	foxTokenTitleBlue,
	foxTokenTitleWhite,
	resourcesTitle,
	section1Description,
	section1Title,
	section2Article1,
	section2Article2,
	section2Title
} from '@/app/[lang]/_utils/constants';

import type {ReactNode} from 'react';

export default function FoxTokenPage(): ReactNode {
	return (
		<div className={'relative mt-16 flex w-full flex-col items-center justify-center lg:mt-28'}>
			<div
				className={
					'relative mb-[120px] flex h-[440px] w-full flex-col items-center justify-center py-20 lg:mb-40'
				}>
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

				<div className={'no-translate mb-10 flex items-center gap-2'}>
					<span className={'no-translate text-[40px] leading-10 text-white lg:text-7xl'}>
						{foxTokenTitleWhite}
					</span>
					<span className={'no-translate text-[40px] font-bold italic leading-10 text-blue lg:text-7xl'}>
						{foxTokenTitleBlue}
					</span>
				</div>

				<div className={'flex flex-col items-center justify-center gap-2'}>
					<p className={'text-center text-2xl'}>{foxTokenDescription}</p>
					<p className={'text-center text-xs'}>{foxTokenDescriptionNote}</p>
				</div>
			</div>

			<div className={'container mb-[120px] grid grid-cols-1 lg:mb-60 lg:grid-cols-2 lg:gap-20'}>
				<div>
					<h1 className={'mb-8 text-[28px] leading-[32px] lg:text-7xl'}>{section1Title}</h1>
					<p className={'hidden text-gray-500 lg:block'}>{section1Description}</p>
				</div>
				<div className={'flex flex-col gap-2'}>
					{foxTokenContributeItems.map(item => (
						<LocalizedLink
							href={item.href}
							target={item.target}
							className={
								'group flex w-full items-center justify-between rounded-2xl bg-secondBg px-10 py-7'
							}
							key={item.title}>
							<p className={'text-2xl lg:text-[40px] lg:leading-[40px]'}>{item.title}</p>
							<RoundButton
								className={
									'size-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'
								}
								iconName={'arrow'}
							/>
						</LocalizedLink>
					))}
				</div>
			</div>

			<div
				className={
					'relative mx-0 mb-[120px] flex justify-center overflow-hidden rounded-2xl px-6 py-8 lg:-mx-4 lg:mb-60 lg:h-[552px] lg:w-screen lg:p-0'
				}>
				<Image
					src={'/fox-token/foxBanner.png'}
					alt={'Fox Banner'}
					width={1920}
					height={550}
					className={'absolute left-0 top-0 -z-10 size-full object-cover'}
				/>

				<div className={'container relative flex items-center justify-between'}>
					<div className={'max-w-[800px]'}>
						<h1 className={'mb-8 text-2xl leading-[24px] lg:text-7xl'}>{section2Title}</h1>
						<p className={'text-sm'}>
							{section2Article1}
							<br />
							<br />
							{section2Article2}
						</p>
					</div>
					<div className={'absolute bottom-0 right-[5%] hidden h-[398px] w-[423px] lg:block '}>
						<Image
							src={'/fox-token/foxBannerImage.png'}
							alt={'Fox Token Benefits'}
							width={846}
							height={796}
							className={'size-full object-cover'}
						/>
					</div>
				</div>
			</div>

			<div className={'container'}>
				<h1 className={'mb-14 text-[28px] leading-[32px] lg:text-7xl'}>{benefitsTitle}</h1>

				<div className={'mb-[120px] grid grid-cols-1 gap-2 lg:mb-60 lg:grid-cols-3'}>
					{foxTokenBenefits.map(benefit => (
						<div
							key={benefit.title}
							className={
								'flex items-center justify-start gap-6 rounded-2xl bg-secondBg px-6 py-[36px] lg:px-10 lg:py-[62px]'
							}>
							{benefit.icon ? (
								<div
									className={
										'flex size-14 min-w-14 items-center justify-center rounded-2xl bg-white/5'
									}>
									{benefit.icon}
								</div>
							) : (
								<div className={'size-14 min-w-14 rounded-2xl bg-white/5'} />
							)}
							<h2 className={'text-base lg:text-2xl'}>{benefit.title}</h2>
						</div>
					))}
				</div>

				<h1 className={'mb-14 text-[40px] leading-10 lg:text-7xl'}>{resourcesTitle}</h1>

				<LatestBlogPosts
					limit={3}
					isWithTitle={false}
				/>
				<h1 className={'mb-14 mt-[120px] text-[40px] leading-10 lg:text-7xl'}>{communityTitle}</h1>

				<Banner />
			</div>
		</div>
	);
}
