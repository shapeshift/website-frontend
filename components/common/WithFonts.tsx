'use client';

import React from 'react';
import {Inter_Tight} from 'next/font/google';

import type {ReactElement, ReactNode} from 'react';

const interTight = Inter_Tight({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--inter-font'
});

export function WithFonts({children}: {children: ReactNode}): ReactElement {
	return (
		<div
			style={{
				fontFamily: `${interTight.style.fontFamily}`
			}}>
			<style
				jsx
				global>
				{`
					:root {
						--inter-font: ${interTight.style.fontFamily};
					}
				`}
			</style>

			{children}
		</div>
	);
}
