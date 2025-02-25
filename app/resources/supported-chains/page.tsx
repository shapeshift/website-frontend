import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {StrapiWallets} from '@/components/StrapiWallets';

import type {ReactNode} from 'react';

export default function SupportedChainsPage(): ReactNode {
	return (
		<main className={'relative mt-40 flex w-full flex-col items-center justify-center gap-20'}>
			<div className={'flex w-full justify-center'}>
				<section className={'flex flex-col items-center'}>
					<div className={'mb-10 flex flex-col items-center gap-2'}>
						<h1 className={'mb-6 text-7xl'}>{'Supported chains'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/#/demo/'}
						title={'Get Started'}
					/>
				</section>
			</div>

			<div className={'container flex flex-col'}>
				<div className={'context flex flex-col justify-center'}>
					<section className={'mt-0'}>
						<StrapiWallets />
					</section>

					<div className={'my-16'}>
						<Banner />
					</div>
				</div>
			</div>
		</main>
	);
}
