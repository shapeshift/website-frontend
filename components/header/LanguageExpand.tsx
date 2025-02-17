'use client';
import {useState} from 'react';

import {expandAnimation} from './animations';
import {IconCheck} from '../common/icons/IconCheck';
import {cl} from '../utils/cl';

import type {ReactNode} from 'react';

const LANGUAGES = [
	{symbol: 'en', name: 'English'},
	{symbol: 'fr', name: 'French'}
];

export function LanguageExpand(): ReactNode {
	//@ts-ignore
	const staticCurrentLanguage = window.Weglot.getCurrentLang();
	const [dynamicCurrentLang, setDynamicCurrentLang] = useState(staticCurrentLanguage);

	const switchLanguage = (symbol: string): void => {
		//@ts-ignore
		if (window.Weglot.initialized) {
			//@ts-ignore
			window.Weglot.switchTo(symbol);
			setDynamicCurrentLang(symbol);
		}
	};
	return (
		<div
			className={'mt-16 flex max-w-[1400px] justify-between pb-10'}
			{...expandAnimation}>
			{/* Left section with main CTA */}
			<div className={'flex max-w-[840px] flex-wrap justify-center gap-1'}>
				{LANGUAGES.map(language => (
					<button
						className={cl(
							'rounded-lg px-6 py-4 hover:bg-white/10',
							dynamicCurrentLang === language.symbol ? 'bg-white/10' : ''
						)}
						key={language.symbol}
						onClick={() => switchLanguage(language.symbol)}>
						<div className={'flex w-[184px] items-center justify-between'}>
							{language.name}
							{dynamicCurrentLang === language.symbol && <IconCheck />}
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
