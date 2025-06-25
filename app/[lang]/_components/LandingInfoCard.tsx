import type {ReactNode} from 'react';

type TLandingInfoCard = {
	title: string;
	stat: string;
};

export function LandingInfoCard({title, stat}: TLandingInfoCard): ReactNode {
	return (
		<div
			className={
				'group flex flex-col gap-9 rounded-2xl bg-secondBg p-10 transition-all duration-100 lg:hover:bg-blue'
			}>
			<h1 className={'text-xl text-gray-600 lg:group-hover:text-white'}>{title}</h1>
			<p className={'text-[40px] leading-[48px]'}>{stat}</p>
		</div>
	);
}
