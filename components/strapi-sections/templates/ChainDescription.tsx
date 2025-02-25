import type {ReactNode} from 'react';

export function ChainDescription({chainName, description}: {chainName: string; description: string}): ReactNode {
	return (
		<section className={'grid grid-cols-2 rounded-2xl bg-gradient-to-b from-[#101114] to-[#16181C] p-20'}>
			<h2 className={'col-span-1 my-auto text-7xl'}>{`What is ${chainName}`}</h2>
			<div className={'col-span-1 flex max-w-[560px] flex-col gap-4'}>
				<p className={'whitespace-break-spaces break-keep text-gray-500'}>{description}</p>
			</div>
		</section>
	);
}
