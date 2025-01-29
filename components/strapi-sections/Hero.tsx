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
		<section className={'relative mb-60 pt-52 md:px-4 lg:px-0'}>
			<div className={'container mx-auto'}>
				<div className={'grid gap-10 lg:grid-cols-2'}>
					<h1 className={'mb-4 text-h1 font-normal leading-[72px]'}>{data.title}</h1>
					<div className={'flex flex-col'}>
						<p className={'mb-8 text-xl font-normal text-gray-500'}>{data.description}</p>
						{data.buttonCta ? (
							<Button
								variant={'blue'}
								title={data.buttonCta?.title ?? 'Title'}
								href={data.buttonCta?.url ?? '/'}
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
						src={`${process.env.STRAPI_URL}${data?.featuredImg.formats.large.url}`}
						alt={data.title}
						width={1400}
						height={data?.featuredImg?.formats.large.height ?? 0}
					/>
				</div>

				{/* Stats */}
				<div className={'mb-16 mt-20 flex w-full justify-center gap-4'}>
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
