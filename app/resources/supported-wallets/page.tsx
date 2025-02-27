import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {StrapiWallets} from '@/components/StrapiWallets';
import {getSupportedWallets} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function WalletPage(): Promise<ReactNode> {
	const wallets = await getSupportedWallets();

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[220px] flex flex-col justify-center'}>
				<section className={'flex flex-col items-start'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-7xl'}>{'Bring your own wallet'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>

				<section className={'mt-8'}>
					<StrapiWallets wallets={wallets} />
				</section>
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
