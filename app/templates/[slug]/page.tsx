import {notFound} from 'next/navigation';

import {Banner} from '@/components/common/Banner';
import {ChainActions} from '@/components/strapi-sections/templates/ChainActions';
import {ChainDescription} from '@/components/strapi-sections/templates/ChainDescription';
import {ChainFeatures} from '@/components/strapi-sections/templates/ChainFeatures';
import {ChainHeader} from '@/components/strapi-sections/templates/ChainHeader';
import {ChainHero} from '@/components/strapi-sections/templates/ChainHero';
import {getSupportedChain} from '@/components/utils/query';

import type {ReactNode} from 'react';

export default async function ChainPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const chain = await getSupportedChain(slug);
	console.log(chain);

	if (!chain) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'context mt-[220px] flex flex-col justify-center'}>
				<ChainHeader chainName={chain.name} />

				<div className={'mb-[240px] mt-16'}>
					<ChainHero
						url={'/templates/templateHeroBg.png'}
						width={1400}
						height={360}
					/>
				</div>
				<ChainDescription
					chainName={chain.name}
					description={chain.description}
				/>

				<div className={'mt-[240px]'}>
					<ChainActions
						features={chain.actions}
						chainName={chain.name}
					/>
				</div>

				<div className={'mt-[240px]'}>
					<ChainFeatures
						chainName={chain.name}
						foxImg={chain.foxImg}
					/>
				</div>

				<div className={'mt-[240px]'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
