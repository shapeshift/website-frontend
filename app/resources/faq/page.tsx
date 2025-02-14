import {notFound} from 'next/navigation';

import FaqPage from '@/components/pages/faq';
import {getFaq} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function Faq(): Promise<ReactNode> {
	const faqData = await getFaq();
	if (!faqData) {
		return notFound();
	}
	return <FaqPage faqData={faqData} />;
}
