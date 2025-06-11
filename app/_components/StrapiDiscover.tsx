import {ElementCard} from '@/app/_components/ElementCard';

import type {TDiscoverData} from '@/app/_components/strapi/types';
import type {ReactNode} from 'react';

export function StrapiDiscover(props: {discover?: TDiscoverData[] | null; isLoading?: boolean}): ReactNode {
	const {discover, isLoading} = props;
	if (isLoading) {
		return <div className={'h-[50vh]'} />;
	}

	if (!discover || discover.length === 0) {
		return (
			<div className={'flex w-full justify-center'}>
				<div className={'container flex flex-col items-center justify-center py-16'}>
					<p className={'text-xl text-gray-400'}>{'No discover items available yet.'}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{discover.map(discover => (
						<ElementCard
							key={discover.slug}
							slug={discover.slug}
							title={discover.title}
							description={discover.description}
							featuredImg={discover.featuredImg}
							baseURL={'/discover'}
							position={'center'}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
