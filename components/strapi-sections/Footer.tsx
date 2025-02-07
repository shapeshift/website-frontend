import Image from 'next/image';

import {Button} from '../common/Button';
import {cl} from '../utils/cl';

import type {TFooterSection} from '@/types/strapi';
import type {ReactNode} from 'react';

export default function Footer({data}: {data: TFooterSection}): ReactNode | null {
	if (!data) {
		return null;
	}

	return (
		<section
			className={
				'relative mb-40 h-[100px] w-full max-w-[1400px] overflow-hidden rounded-2xl sm:h-[200px] md:h-[300px] lg:h-[504px]'
			}>
			<div className={'mx-auto'}>
				{data?.imageBg?.url && (
					<Image
						src={`${process.env.STRAPI_URL}${data?.imageBg?.url}`}
						alt={data?.title}
						width={2800}
						height={1008}
						className={'absolute inset-0 w-full object-cover'}
					/>
				)}

				<div className={'absolute inset-0 z-10 flex w-full flex-col items-center justify-center gap-4 px-4'}>
					<div className={'rounded-3xl bg-white/10 px-6 py-2 text-white'}>{data?.cta}</div>
					<div
						className={cl(
							'mb-[60px] mt-4 max-w-[800px] text-center text-[36px] font-normal leading-[36px]',
							'text-white md:text-[48px] md:leading-[48px] lg:text-7xl'
						)}>
						{data?.title}
					</div>
					<Button
						variant={'blue'}
						href={data?.buttonCta?.url ?? '/'}
						title={data?.buttonCta?.title}
					/>
				</div>
			</div>
		</section>
	);
}
