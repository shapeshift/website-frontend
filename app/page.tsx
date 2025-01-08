import type {ReactElement} from 'react';

import {Button} from '@/components/Button';

export default function Home(): ReactElement {
	return (
		<div className={'font-[family-name:var(--font-geist-sans)]'}>
			<h1 className={'font-bold text-white'}>{'Hello World'}</h1>
			<Button />
		</div>
	);
}
