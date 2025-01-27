import Image from 'next/image';

import type {THeroSection} from '@/types/strapi';

export default function Hero({data}: {data: THeroSection}): React.ReactNode {
	return (
		<section className={'relative'}>
			<div className={'container mx-auto px-4 py-12'}>
				<h1 className={'mb-4 text-4xl font-bold'}>{data.title}</h1>
				<p className={'mb-8 text-xl'}>{data.description}</p>

				{/* Stats */}
				<div className={'mb-8 grid grid-cols-3 gap-8'}>
					{data.stats.map(stat => (
						<div key={stat.id}>
							<div className={'text-3xl font-bold'}>{stat.value}</div>
							<div className={'text-gray-600'}>{stat.title}</div>
						</div>
					))}
				</div>

				{/* CTA Buttons */}
				<div className={'flex gap-4'}>
					{data.buttonCta && (
						<a
							href={data.buttonCta.url}
							className={'btn btn-primary'}>
							{data.buttonCta.title}
						</a>
					)}
				</div>

				{/* Featured Image */}
				{data.featuredImg && (
					<Image
						src={`${process.env.STRAPI_URL}${data.featuredImg.formats.medium.url}`}
						width={data.featuredImg.formats.medium.width}
						height={data.featuredImg.formats.medium.height}
						alt={data.title}
						className={'mt-8'}
					/>
				)}
			</div>
		</section>
	);
}
