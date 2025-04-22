'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {Carousel} from '@/components/Carousel';
import {cl} from '@/components/utils/cl';

import type {TCard, TGridDisplacedSection} from '@/components/strapi/types';
import type {ReactNode} from 'react';

const MotionLink = motion(Link);

export default function GridDisplaced({data}: {data: TGridDisplacedSection}): ReactNode | null {
	if (!data) {
		return null;
	}
	// Create an array of random delays for each bubble
	const randomDelays = data?.cards[0].items?.map(() => Math.random() * 2) || [];

	return (
		<section className={'container relative'}>
			<div className={'grid grid-cols-1 gap-2 lg:grid-cols-3'}>
				<div className={'col-span-2 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl'}>
					<div className={'col-span-2 p-10'}>
						<p className={'text-[28px] leading-[32px] lg:text-[40px] lg:leading-[48px]'}>{data?.title}</p>
					</div>
					<div className={'col-span-2 flex h-full flex-col rounded-2xl bg-secondBg'}>
						<div className={'min-h-[330px] p-10'}>
							<p className={'text-2xl text-white'}>{data?.cards[0].title}</p>
							<p className={'text-gray-500'}>{data?.cards[0].description}</p>

							<div className={'mt-14 grid grid-cols-5 gap-4'}>
								{data?.cards[0].items?.slice(0, 5).map((item, index) => (
									<div
										key={item.url}
										className={'flex h-10 items-center justify-center lg:h-20'}>
										{/* Mobile version */}
										<MotionLink
											href={item.url}
											target={'_blank'}
											className={
												'relative flex items-center justify-center rounded-full border-2 border-[#386FF91A] bg-[#386FF91A] transition-all hover:!h-[130px] hover:!w-[130px] lg:hidden'
											}
											initial={{width: 70, height: 70}}
											animate={{
												width: [70, 100, 70],
												height: [70, 100, 70]
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												repeatType: 'reverse',
												ease: 'easeInOut',
												delay: randomDelays[index]
											}}>
											<div
												className={
													'absolute left-1/2 top-1/2 size-[32px] -translate-x-1/2 -translate-y-1/2'
												}>
												<Image
													unoptimized
													src={`${process.env.STRAPI_URL}${item.image?.url}`}
													alt={item.image?.url || ''}
													width={62}
													height={62}
													className={'size-[32px]'}
												/>
											</div>
										</MotionLink>

										{/* Desktop version */}
										<MotionLink
											href={item.url}
											target={'_blank'}
											className={cl(
												'relative hidden items-center justify-center rounded-full border-2 border-[#386FF91A] bg-[#386FF91A]',
												'transition-all duration-300 lg:flex lg:hover:!h-[120px] lg:hover:!w-[120px]'
											)}
											initial={{width: 100, height: 100}}
											animate={{
												width: [100, 120, 90],
												height: [100, 120, 90]
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												repeatType: 'reverse',
												ease: 'easeInOut',
												delay: randomDelays[index]
											}}>
											<div
												className={
													'absolute left-1/2 top-1/2 size-[62px] -translate-x-1/2 -translate-y-1/2'
												}>
												<Image
													unoptimized
													src={`${process.env.STRAPI_URL}${item.image?.url}`}
													alt={item.image?.url || ''}
													width={62}
													height={62}
													className={'size-[62px]'}
												/>
											</div>
										</MotionLink>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className={'col-span-2 grid h-full grid-cols-2 gap-2'}>
						<div className={'flex flex-col rounded-2xl bg-secondBg'}>
							<div className={'p-10'}>
								<p className={'text-2xl text-white'}>{data?.cards[1]?.title}</p>
								<p className={'text-gray-500'}>{data?.cards[1]?.description}</p>
								<div className={'-mx-10 -mb-5 mt-10 overflow-hidden'}>
									<Carousel
										pauseOnHover
										speed={20}
										className={''}>
										{data?.cards[1].items?.map(({image, url}, index) => (
											<Link
												href={url ?? 'https://app.shapeshift.com'}
												key={index}
												className={'mx-6'}>
												<div
													className={
														'relative flex max-h-10 w-max items-center justify-start'
													}>
													<Image
														src={`${process.env.STRAPI_URL}${image?.url}`}
														alt={image?.url || ''}
														width={696}
														height={168}
														className={'h-10 w-auto'}
														unoptimized
													/>
												</div>
											</Link>
										))}
									</Carousel>
								</div>
							</div>
						</div>
						<GridCard
							className={'!col-span-1 overflow-hidden'}
							data={data?.cards[2]}
							imageWidth={696}
							imageHeight={168}
						/>
					</div>
				</div>
				<div
					style={{
						padding: '2px',
						position: 'relative',
						borderRadius: '1rem',
						background: 'linear-gradient(to bottom, #FBA590, #AE5367, #1F5A9E)'
					}}>
					<div
						className={cl(
							'size-full min-w-[420px] p-6 pb-1 flex flex-col items-center justify-between rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C]'
						)}>
						<div>
							<h1 className={'text-2xl'}>{'Buy Crypto'}</h1>

							<p className={'mt-2 text-gray-600'}>
								{'Need to top up your crypto balance? ShapeShift has you covered with'}
							</p>
						</div>
						<div className={'my-10 size-min overflow-hidden rounded-2xl'}>
							<iframe
								src={
									'https://buy.onramper.com/?apiKey=pk_prod_01HWMA66BYRB2271G08XDZVVCX&defaultCrypto=btc&wallets=btc%3A&onlyCryptos=btc&supportSell=false&isAddressEditable=false&language=en&defaultFiat=USD&themeName=dark&redirectURL=https%3A%2F%2Fapp.shapeshift.com%2F%23%2Fbuy-crypto&signature=cf9f78149db21574bbfe02dc72a1ab15ae15a0bd25d7b932ef0b453d8a922f30'
								}
								title={'Onramper Widget'}
								height={'630px'}
								width={'420px'}
								allow={'accelerometer; autoplay; camera; gyroscope; payment; microphone'}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

const GridCard = (props: {data: TCard; imageWidth: number; imageHeight: number; className?: string}): ReactNode => {
	const {data, imageWidth, imageHeight, className} = props;

	return (
		<div className={cl('flex flex-col rounded-2xl bg-secondBg', className)}>
			<div className={'p-10'}>
				<p className={'text-2xl text-white'}>{data?.title}</p>
				<p className={'text-gray-500'}>{data?.description}</p>
			</div>
			<div className={'mt-auto overflow-hidden'}>
				<Image
					src={`${process.env.STRAPI_URL}${data?.image?.url}`}
					alt={data?.title}
					width={imageWidth}
					height={imageHeight}
					className={'w-full object-contain'}
					unoptimized
				/>
			</div>
		</div>
	);
};
