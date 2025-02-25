/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 * Global metadata configuration
 * Defines default metadata, OpenGraph, and Twitter card settings
 * Used across the entire application with the ability to override per-page
 ************************************************************************************************/
import type {MetadataRoute} from 'next';

const siteConfig = {
	name: 'ShapeShift',
	description: 'Your multichain crypto home base.',
	url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.builtby.dad',
	ogImage: '/og.png'
};

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteConfig.name,
		short_name: siteConfig.name,
		description: siteConfig.description,
		start_url: '/',
		display: 'standalone',
		background_color: '#0C0D0F',
		theme_color: '#FFFFFF',
		icons: [
			{src: '/favicon.ico', sizes: 'any', type: 'image/x-icon'},
			{src: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
			{src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
			{src: '/favicon-180x180.png', sizes: '180x180', type: 'image/png'},
			{src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png'}
		]
	};
}
