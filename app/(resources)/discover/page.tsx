import {Banner} from '@/app/_components/Banner';
import {Button} from '@/app/_components/Button';
import {RESOURCES_DICT} from '@/app/_utils/dictionary/resources';
import {getDiscovers} from '@/app/_utils/query';

import {DiscoverSearchWrapper} from './_components/DiscoverSearchWrapper';

import type {ReactNode} from 'react';

export default async function DiscoverPage(): Promise<ReactNode> {
	const discover = await getDiscovers();

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col justify-center lg:mt-48'}>
				<section className={'mb-16 flex flex-col items-center'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-[40px] leading-10 lg:text-7xl'}>{RESOURCES_DICT.discover.title}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={RESOURCES_DICT.discover.ctaButton}
					/>
				</section>

				<DiscoverSearchWrapper discover={discover} />

				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
