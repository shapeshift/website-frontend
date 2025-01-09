'use client';

import {useTranslations} from 'next-intl';
import {ConnectButton} from '@rainbow-me/rainbowkit';

import type {ReactNode} from 'react';

export default function HomePage(): ReactNode {
	const t = useTranslations('SomePage');
	return (
		<div>
			<h1>{t('first_translation')}</h1>
			<ConnectButton />
		</div>
	);
}
