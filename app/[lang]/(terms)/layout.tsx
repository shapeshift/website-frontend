/**************************************************************************************************
 ** Terms Layout Component
 ** Shared layout for all pages in the (terms) route group
 ** Provides consistent structure and styling for terms of service and privacy policy pages
 ** Includes proper SEO metadata for search engine optimization
 ** Sets up responsive container layout with consistent spacing
 **************************************************************************************************/

import {Banner} from '@/app/[lang]/_components/Banner';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = {
	title: 'Legal Documents | ShapeShift',
	description: 'ShapeShift privacy policy and terms of service documents.',
	openGraph: {
		title: 'ShapeShift Legal Documents',
		description: 'Privacy Policy and Terms of Service for ShapeShift',
		type: 'website',
		locale: 'en_US',
		url: 'https://shapeshift.com/terms',
		siteName: 'ShapeShift'
	}
};

type TTermsLayoutProps = {
	children: ReactNode;
};

export default function TermsLayout({children}: TTermsLayoutProps): ReactNode {
	return (
		<>
			{children}
			<div className={'container mx-auto mt-20 px-4'}>
				<Banner />
			</div>
		</>
	);
}
