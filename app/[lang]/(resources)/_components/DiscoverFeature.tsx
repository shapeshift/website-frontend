/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 ** FeatureSection Component:
 **
 ** A reusable component for displaying product/protocol features
 ** Presents features in a grid with optional images, titles, and descriptions
 **
 ** Features:
 ** - Flexible grid layout that adapts to different screen sizes
 ** - Consistent styling for feature items
 ** - Support for images or icons
 ** - Accessibility-optimized structure
 **
 ** Usage:
 ** - Use in any resource page where features need to be displayed in a grid
 ** - Pass features array with title, description, and optional image
 ** - Customize number of columns and spacing as needed
 ************************************************************************************************/

import Image from 'next/image'

import {LocalizedLink} from '@/app/[lang]/_components/LocalizedLink'
import {cl} from '@/app/[lang]/_utils/cl'

import type {ReactNode} from 'react'

type TFeatureItem = {
	id?: number
	title: string
	description: string
	image?: {
		url: string
		width: number
		height: number
		alt?: string
	}
	buttonCta?: {
		title: string
		url: string
	}
}

type TDiscoverFeatureProps = {
	features: TFeatureItem[]
	title?: string
	description?: string
	columns?: 2 | 3 | 4
	className?: string
}

export function DiscoverFeature({
	features,
	title,
	description,
	columns = 3,
	className
}: TDiscoverFeatureProps): ReactNode {
	if (!features || features.length === 0) {
		return null
	}

	// Get the grid columns class based on the columns prop
	const gridColumnsClass = {
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-2 lg:grid-cols-3',
		4: 'md:grid-cols-2 lg:grid-cols-4'
	}[columns]

	return (
		<section
			className={cl('mb-20 mt-32', className)}
			aria-labelledby={'features-title'}>
			{/* Optional title and description */}
			{title && (
				<div className={'mb-16 text-center'}>
					<h2
						id={'features-title'}
						className={'mb-4 text-4xl'}>
						{title}
					</h2>
					{description && <p className={'mx-auto max-w-3xl text-lg text-gray-500'}>{description}</p>}
				</div>
			)}

			{/* Features grid */}
			<div className={cl('grid gap-8', gridColumnsClass)}>
				{features.map((feature, index) => (
					<div
						key={feature.id || index}
						className={'flex flex-col items-start rounded-2xl bg-secondBg p-6'}>
						{/* Feature image if provided */}
						{feature.image?.url && (
							<div className={'mb-6'}>
								<Image
									src={
										feature.image.url.startsWith('http')
											? feature.image.url
											: `${process.env.NEXT_PUBLIC_STRAPI_URL}${feature.image.url}`
									}
									alt={feature.image.alt || feature.title}
									width={feature.image.width || 64}
									height={feature.image.height || 64}
									className={'size-16 object-contain'}
								/>
							</div>
						)}

						{/* Feature title and description */}
						<h3 className={'mb-2 text-xl font-medium'}>{feature.title}</h3>
						<p className={'whitespace-break-spaces break-keep text-gray-500'}>{feature.description}</p>
						{/* CTA under description (only if provided) */}
						{feature.buttonCta?.url && feature.buttonCta?.title ? (
							<div className={'mt-4'}>
								{feature.buttonCta.url.startsWith('/') ? (
									<LocalizedLink
										href={feature.buttonCta.url}
										className={
											'inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-primary text-white hover:opacity-90'
										}>
										{feature.buttonCta.title}
									</LocalizedLink>
								) : /^(https?:)\/\//i.test(feature.buttonCta.url) ? (
									<a
										href={feature.buttonCta.url}
										target={'_blank'}
										rel={'noopener noreferrer'}
										className={
											'inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-primary text-white hover:opacity-90'
										}>
										{feature.buttonCta.title}
									</a>
								) : null}
							</div>
						) : null}
					</div>
				))}
			</div>
		</section>
	)
}
