import SupportedTable from '@/app/resources/supported-chains/SupportedTable';
import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {StrapiChains} from '@/components/StrapiChains';

import type {ReactNode} from 'react';

export default function Loading(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[220px] flex flex-col justify-center'}>
				<section className={'flex flex-col items-start'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-7xl'}>{'Supported chains'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>

				<section className={'mt-8'}>
					<StrapiChains isLoading />
				</section>
				<section className={'mt-8'}>
					<SupportedTable />
				</section>
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
