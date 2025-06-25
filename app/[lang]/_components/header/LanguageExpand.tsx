'use client';

import {IconCheck} from '@/app/[lang]/_icons/IconCheck';
import {cl} from '@/app/[lang]/_utils/cl';
import {SUPPORTED_LANGUAGES} from '@/app/[lang]/_utils/i18nconfig';

import {expandAnimation} from './animations';

import type {ReactNode} from 'react';

export function LanguageExpand({
	switchLanguageAction,
	currentLanguage
}: {
	switchLanguageAction: (symbol: string) => void;
	currentLanguage: string;
}): ReactNode {
	return (
		<div
			className={'grid grid-cols-1'}
			{...expandAnimation}>
			{/* Left section with main CTA */}
			<div className={'col-span-1 p-16'}>
				<div className={'flex flex-wrap justify-center gap-1'}>
					{SUPPORTED_LANGUAGES.map(language => (
						<button
							className={cl(
								'rounded-lg px-6 py-4 hover:bg-white/10',
								currentLanguage === language.code ? 'bg-white/10' : ''
							)}
							key={language.code}
							onClick={() => switchLanguageAction(language.code)}>
							<div className={'flex w-[184px] items-center justify-between'}>
								<div className={'flex flex-col items-start'}>
									<span className={'text-sm font-medium'}>{language.name}</span>
									<span className={'no-translate text-xs opacity-70'}>{language.nativeName}</span>
								</div>
								{currentLanguage === language.code && <IconCheck />}
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
