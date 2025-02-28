import {ElementCard} from '@/components/ElementCard';

import type {TSupportedProtocolData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiProtocols(props: {protocols?: TSupportedProtocolData[] | null; isLoading?: boolean}): ReactNode {
	const {protocols, isLoading} = props;
	if (isLoading) {
		return <div className={'h-[50vh]'} />;
	}

	if (!protocols || protocols.length === 0) {
		return (
			<div className={'flex w-full justify-center'}>
				<div className={'container flex flex-col items-center justify-center py-16'}>
					<p className={'text-xl text-gray-400'}>{'No protocols items available yet.'}</p>
				</div>
			</div>
		);
	}
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{(protocols || []).map(protocol => {
						return (
							<ElementCard
								key={protocol.slug}
								slug={protocol.slug}
								title={protocol.name}
								description={protocol.description}
								featuredImg={protocol.featuredImg}
								baseURL={'/supported-protocols'}
								position={'center'}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
