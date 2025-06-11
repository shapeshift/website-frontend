'use client';

import {cl} from '@/app/_utils/cl';
import {PRODUCTS_DICT} from '@/app/_utils/dictionary/products';

import type {ReactNode} from 'react';

export function BuyCryptoCard(): ReactNode {
	return (
		<div
			style={{
				padding: '2px',
				position: 'relative',
				borderRadius: '1rem',
				background: 'linear-gradient(to bottom, #FBA590, #AE5367, #1F5A9E)'
			}}>
			<div
				className={cl(
					'size-full min-w-[420px] p-6 pb-1 flex flex-col items-center justify-between rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C]'
				)}>
				<div>
					<h1 className={'text-2xl'}>{PRODUCTS_DICT.buyCrypto.title}</h1>

					<p className={'mt-2 text-gray-600'}>{PRODUCTS_DICT.buyCrypto.description}</p>
				</div>
				<div className={'my-10 size-min overflow-hidden rounded-2xl'}>
					<iframe
						src={process.env.ONRAMPER_URL}
						title={PRODUCTS_DICT.buyCrypto.widgetTitle}
						height={'630px'}
						width={'420px'}
						allow={'accelerometer; autoplay; camera; gyroscope; payment; microphone'}
					/>
				</div>
			</div>
		</div>
	);
}
