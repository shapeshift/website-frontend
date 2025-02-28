import {notFound} from 'next/navigation';

import {FAQContent} from '@/app/(resources)/faq/FAQContent';
import {getFaq} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function Faq(): Promise<ReactNode> {
	const faqData = await getFaq();
	if (!faqData) {
		return notFound();
	}
	return <FAQContent faqData={faqData} />;
}
