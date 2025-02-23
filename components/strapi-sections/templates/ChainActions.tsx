import Image from 'next/image';

import type {TTemplateChainActionsSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export function ChainActions({data}: {data: TTemplateChainActionsSection}): ReactNode {
	if (!data) {
		return null;
	}

	return (
		<section className={'container flex flex-col gap-16'}>
			<h1 className={'max-w-[700px] text-7xl'}>{data.title}</h1>
			<div className={'grid grid-cols-1  gap-1 md:grid-cols-3'}>
				{data.actions.map(action => (
					<div
						className={'flex h-[144px] gap-6 rounded-2xl bg-secondBg px-10 py-[30px]'}
						key={action.id}>
						<div className={'size-16 rounded-2xl bg-white/5 p-5'}>
							<Image
								src={action.icon.url}
								alt={action.title}
								width={action.icon.width}
								height={action.icon.height}
							/>
						</div>

						<div className={'flex flex-col gap-1'}>
							<h2 className={'text-2xl'}>{action.title}</h2>
							<p className={'text-gray-500'}>{action.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
