import Image from 'next/image';
import Link from 'next/link';

import {Button} from '@/components/common/Button';

import type {THeroSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function Hero({data}: {data: THeroSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'relative pt-20 md:px-4 lg:mb-60 lg:px-0 lg:pt-52'}>
			<div className={'container mx-auto'}>
				<div className={'grid gap-4 lg:grid-cols-2 lg:gap-10'}>
					<h1 className={'mb-4 text-center text-4xl font-normal leading-10 lg:text-left lg:text-7xl'}>
						{data.title}
					</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-center text-sm font-normal text-gray-500 lg:text-left lg:text-xl'}>
							{data.description}
						</p>
						{data.buttonCta ? (
							<Button
								variant={'blue'}
								title={data.buttonCta?.title ?? 'Click here'}
								href={data.buttonCta?.url ?? '/'}
								hasArrow
								className={'!w-full'}
							/>
						) : data.buttonDownload.length > 0 ? (
							<div className={'flex gap-4'}>
								{data.buttonDownload.map(button => (
									<Link
										href={button.url ?? ''}
										target={'_blank'}
										className={'h-[40px] w-[130px]'}
										key={button.id}>
										<Image
											src={`/${button.variant}.png`}
											alt={button.id.toString()}
											width={390}
											height={120}
										/>
									</Link>
								))}
							</div>
						) : null}
					</div>
				</div>

				<div className={'mt-20 overflow-hidden rounded-2xl'}>
					<Image
						src={`${process.env.STRAPI_URL}${data?.featuredImg.formats.large?.url}`}
						alt={data.title}
						width={1400}
						height={data?.featuredImg?.formats.large?.height ?? 0}
						className={'hidden lg:block'}
					/>
					<Image
						src={`${process.env.STRAPI_URL}${data?.featuredImg.formats.large?.url}`}
						alt={data.title}
						width={1000}
						height={data?.featuredImg?.formats.large?.height ?? 0}
						className={'block lg:hidden'}
					/>
				</div>

				{/* Stats */}
				<div className={'mb-16 mt-20 flex w-full flex-col items-center justify-center gap-4 lg:flex-row'}>
					{data.stats.map(stat => (
						<div
							key={stat.id}
							className={'flex w-min flex-col items-center lg:min-w-[245px]'}>
							<div className={'w-min text-[40px] font-normal leading-[48px]'}>{stat.value}</div>
							<div className={'text-xl text-gray-500'}>{stat.title}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
