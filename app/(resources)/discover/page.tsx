import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {StrapiDiscover} from '@/components/StrapiDiscover';
import {getDiscovers} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function DiscoverPage(): Promise<ReactNode> {
	const discover = await getDiscovers();

	/**********************************************************************************************
	 ** Group discover items by type for organized display
	 ** This reduces the array of discover items into an object where:
	 ** - Keys are the different types (categories) of discover items
	 ** - Values are arrays of items belonging to each type
	 ** This grouping enables rendering items by category sections on the page
	 *********************************************************************************************/
	const groupedDiscover = discover?.reduce(
		(acc, item) => {
			const type = item.type;
			if (!acc[type]) {
				acc[type] = [];
			}
			acc[type].push(item);
			return acc;
		},
		{} as Record<string, typeof discover>
	);

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col justify-center lg:mt-48'}>
				<section className={'flex flex-col items-start'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-[40px] leading-10 lg:text-7xl'}>{'Explore Web3 with ShapeShift'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>

				{groupedDiscover &&
					Object.entries(groupedDiscover).map(([type, items]) => (
						<section
							key={type}
							className={'mt-8'}>
							<h2 className={'mb-6 text-2xl font-medium'}>{type}</h2>
							<StrapiDiscover discover={items} />
						</section>
					))}

				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
