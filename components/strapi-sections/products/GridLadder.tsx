import Image from 'next/image';
import React from 'react';

import {Button} from '../../common/Button';
import {cl} from '../../utils/cl';

import type {TGridLadderSection, TGridLadderStep} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function GridLadder({data}: {data: TGridLadderSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section className={'container mb-[120px] lg:mb-60'}>
			<div className={'grid gap-x-[120px] gap-y-40 lg:grid-cols-1'}>
				{data.steps.map((step, index) => (
					<div
						key={step.id}
						className={'container relative overflow-hidden rounded-2xl bg-secondBg'}
						style={{
							backgroundImage: "url('/supported-chains/grid-bg.png')",
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}>
						<div
							className={cl(
								'flex gap-x-[120px] justify-between flex-col',
								index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
							)}
							key={step.id}>
							<LadderItem data={step} />
							<div className={'h-[400px] w-[640px] overflow-hidden rounded-2xl bg-secondHoverBg'}>
								<Image
									src={`${process.env.STRAPI_URL}${step.image?.url}`}
									alt={step.id.toString()}
									width={step.image?.width}
									height={step.image?.height}
									className={'size-full object-cover'}
								/>
							</div>
						</div>
						{step.buttonCta && (
							<Button
								variant={'blue'}
								title={step.buttonCta.title}
								href={step.buttonCta.url}
								hasArrow
								className={'mt-10 block !w-full lg:hidden'}
							/>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

const LadderItem = ({data}: {data: TGridLadderStep}): ReactNode | null => {
	if (!data) {
		return null;
	}

	return (
		<div className={'flex max-w-screen-sm flex-col p-10'}>
			<h2 className={'mb-4 text-[40px] leading-[48px]'}>{data.title}</h2>
			<p className={'mb-10 text-gray-500'}>{data.description}</p>
			{data.buttonCta && (
				<Button
					variant={'blue'}
					title={data.buttonCta.title}
					href={data.buttonCta.url}
					hasArrow
					className={'hidden lg:flex'}
				/>
			)}
		</div>
	);
};
