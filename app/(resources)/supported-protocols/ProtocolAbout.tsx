import type {ReactNode} from 'react';

type THeaderData = {
	name: string;
	description: string;
};
export function ProtocolAbout(data: THeaderData): ReactNode {
	return (
		<div className={'mt-4'}>
			<section
				className={
					'grid grid-cols-1 rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C] p-6 lg:grid-cols-2 lg:p-20'
				}>
				<h2 className={'col-span-1 my-auto mb-6 text-[28px] leading-[32px] lg:mb-0 lg:text-7xl'}>
					{`What is ${data.name}`}
				</h2>
				<div className={'col-span-1 flex max-w-[560px] flex-col gap-4'}>
					<p className={'whitespace-break-spaces break-keep text-gray-500'}>{data.description}</p>
				</div>
			</section>
		</div>
	);
}
