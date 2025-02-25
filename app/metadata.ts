/************************************************************************************************
 * Global metadata configuration
 * Defines default metadata, OpenGraph, and Twitter card settings
 * Used across the entire application with the ability to override per-page
 ************************************************************************************************/
import type {Metadata} from 'next';

const siteConfig = {
	name: 'ShapeShift',
	description: 'Your multichain crypto home base.',
	url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.builtby.dad',
	ogImage: '/og.png'
};

export const defaultMetadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	applicationName: siteConfig.name,
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: {
		icon: [
			{url: '/favicon.ico'},
			{url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
			{url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
			{url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png'},
			{url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png'}
		],
		apple: [
			{url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
			{url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
			{url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png'},
			{url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png'}
		]
	},
	openGraph: {
		type: 'website',
		siteName: siteConfig.name,
		title: siteConfig.name,
		description: siteConfig.description,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: '@ShapeShift'
	}
};
