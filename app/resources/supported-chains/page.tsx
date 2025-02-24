import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {IconPlus} from '@/components/common/icons/IconPlus';
import {allWallets, supportedChains} from '@/components/constants';
import {StrapiWallets} from '@/components/StrapiWallets';

import type {ReactNode} from 'react';

export default function SupportedChainsPage(): ReactNode {
	return (
		<main className={'relative mt-40 flex w-full flex-col items-center justify-center gap-20'}>
			<div className={'flex w-full justify-center'}>
				<section className={'flex flex-col items-center'}>
					<div className={'mb-10 flex flex-col items-center gap-2'}>
						<h1 className={'mb-6 text-7xl'}>{'Supported chains & wallets'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/#/demo/'}
						title={'Get Started'}
					/>
				</section>
			</div>

			<div className={'container flex flex-col'}>
				<div>
					<table className={'w-full border-collapse rounded-2xl border border-stroke'}>
						<thead>
							<tr>
								<th
									className={
										'sticky left-0 border border-stroke pb-6 text-left text-sm text-gray-500'
									}
								/>
								{allWallets.map(wallet => (
									<th
										key={wallet}
										className={
											'h-20 w-[184px] border border-stroke text-center font-normal text-gray-500'
										}>
										{wallet}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Object.keys(supportedChains).map(chain => (
								<tr key={chain}>
									<td
										align={'center'}
										className={'left-0 h-20 w-[184px] border border-stroke py-4 text-gray-500'}>
										{supportedChains[chain as keyof typeof supportedChains].name}
									</td>
									{allWallets.map(wallet => (
										<td
											align={'center'}
											key={wallet}
											className={'h-20 w-[184px] border border-stroke'}>
											{supportedChains[chain as keyof typeof supportedChains].supported.includes(
												wallet
											) ? (
												<div
													className={
														'flex size-10 items-center justify-center rounded-full bg-blue'
													}>
													<IconPlus className={'size-4 text-white'} />
												</div>
											) : (
												<div className={'h-px w-[14px] rounded-[1px] bg-white/20'} />
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className={'context flex flex-col justify-center'}>
					<section className={'mt-16'}>
						<StrapiWallets />
					</section>

					<div className={'my-16'}>
						<Banner />
					</div>
				</div>
			</div>
		</main>
	);
}
