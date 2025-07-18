import {IconBorrow} from '@/app/[lang]/_icons/IconBorrow';
import {IconEarn} from '@/app/[lang]/_icons/IconEarn';
import {IconGlobe} from '@/app/[lang]/_icons/IconGlobe';
import {IconKey} from '@/app/[lang]/_icons/IconKey';
import {IconShield} from '@/app/[lang]/_icons/IconShield';
import {IconTrade} from '@/app/[lang]/_icons/IconTrade';

import type {ReactNode, SVGProps} from 'react';

const ACCELERATE_WITH_SHAPESHIFT_DATA = [
	{
		title: 'Trade',
		description: 'Trade 50,000+ assets for Bitcoin, Ethereum, DOGE, & more with one click.',
		icon: (props: SVGProps<SVGSVGElement>) => <IconTrade {...props} />
	},
	{
		title: 'Save',
		description: 'Compare the top trading routes in real time and always get the best rate.',
		icon: (props: SVGProps<SVGSVGElement>) => <IconBorrow {...props} />
	},
	{
		title: 'Earn',
		description:
			'Earn, manage, and discover your DeFi opportunities in one click.',
		icon: (props: SVGProps<SVGSVGElement>) => <IconEarn {...props} />
	},
	{
		title: 'Control your crypto',
		description: 'ShapeShift is a noncustodial App. Your keys, your crypto.',
		icon: (props: SVGProps<SVGSVGElement>) => <IconKey {...props} />
	},
	{
		title: 'Multichain',
		description:
			'Connect your self custodial wallet, and navigate 14+ chains seamlessly.',
		icon: (props: SVGProps<SVGSVGElement>) => <IconGlobe {...props} />
	},
	{
		title: 'Privacy',
		description: 'Use ShapeShift with no KYC. Always.',
		icon: (props: SVGProps<SVGSVGElement>) => <IconShield {...props} />
	}
];

export function SupportedWalletAccelerate(): ReactNode {
	return (
		<div className={'mb-24 mt-[120px] lg:mb-48 lg:mt-60'}>
			<section className={'container flex flex-col gap-14'}>
				<h1 className={'text-[40px] leading-10 lg:text-7xl'}>{'Accelerate with ShapeShift'}</h1>
				<div className={'grid grid-cols-1 gap-1 md:grid-cols-3'}>
					{ACCELERATE_WITH_SHAPESHIFT_DATA.map(action => (
						<div
							className={'flex gap-6 rounded-2xl bg-secondBg px-6 py-8 lg:px-10 lg:py-[30px]'}
							key={action.title}>
							<div
								className={
									'flex size-12 items-center justify-center rounded-2xl bg-white/5 p-4 lg:size-16 lg:p-5'
								}>
								{action.icon({className: 'size-5'})}
							</div>

							<div className={'flex flex-col gap-1'}>
								<h2 className={'text-base lg:text-2xl'}>{action.title}</h2>
								<p className={'text-sm text-gray-500 lg:text-base'}>{action.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
