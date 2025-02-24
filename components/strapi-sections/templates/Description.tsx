import type {TTemplateDescriptionSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export function Description({data}: {data: TTemplateDescriptionSection}): ReactNode {
	if (!data) {
		return null;
	}

	return (
		<section className={'grid grid-cols-2 rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C] p-20'}>
			<h2 className={'col-span-1 my-auto text-7xl'}>{data.title}</h2>
			<div className={'col-span-1 flex max-w-[560px] flex-col gap-4'}>
				{data.articles.map((article, index) => (
					<div
						className={'text-gray-500'}
						key={index}>
						{article}
					</div>
				))}
			</div>
		</section>
	);
}
