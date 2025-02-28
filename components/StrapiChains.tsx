import {ElementCard} from '@/components/ElementCard';

import type {TSupportedChainData} from '@/types/strapi';
import type {ReactNode} from 'react';

export function StrapiChains(props: {chains?: TSupportedChainData[] | null; isLoading?: boolean}): ReactNode {
	const {chains, isLoading} = props;

	if (isLoading) {
		return <div className={'h-[50vh]'} />;
	}

	if (!chains || chains.length === 0) {
		return (
			<div className={'flex w-full justify-center'}>
				<div className={'container flex flex-col items-center justify-center py-16'}>
					<p className={'text-xl text-gray-400'}>{'No chains items available yet.'}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'context flex flex-col justify-center'}>
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{chains.map(chain => (
						<ElementCard
							key={chain.slug}
							slug={chain.slug}
							title={chain.name}
							description={chain.description}
							featuredImg={chain.featuredImg}
							baseURL={'/supported-chains'}
							position={'bottom'}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
