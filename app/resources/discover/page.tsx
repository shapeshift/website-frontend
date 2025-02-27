import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {StrapiDiscover} from '@/components/StrapiDiscover';
import {getDiscovers} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function DiscoverPage(): Promise<ReactNode> {
	const discover = await getDiscovers();

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[220px] flex flex-col justify-center'}>
				<section className={'flex flex-col items-center'}>
					<div className={'mb-10 flex flex-col items-center gap-2'}>
						<h1 className={'mb-6 text-7xl'}>{'Explore Web3 with ShapeShift'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>

				<section className={'mt-16'}>
					<StrapiDiscover discover={discover} />
				</section>
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
