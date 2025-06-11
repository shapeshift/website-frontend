import Image from 'next/image';

import {Button} from '@/app/_components/Button';

type TRequestCardProps = {
	title: string;
	buttonTitle: string;
	buttonHref: string;
	bgImage: string;
	buttonVariant?: 'white' | 'blue';
};

export function WalletRequestCard({
	title,
	buttonTitle,
	buttonHref,
	bgImage,
	buttonVariant
}: TRequestCardProps): JSX.Element {
	return (
		<div
			className={
				'relative flex flex-col items-center justify-between overflow-hidden rounded-2xl px-10 py-12 lg:w-[392px]'
			}>
			<div className={'absolute left-0 top-0 size-full'}>
				<Image
					src={bgImage}
					width={786}
					height={920}
					alt={'Request card background'}
					className={'size-full object-cover'}
				/>
			</div>
			<div className={'z-10 flex max-w-[312px] items-start justify-start text-[40px] leading-10'}>{title}</div>
			<div className={'flex items-end justify-end'}>
				<Button
					hasArrow
					title={buttonTitle}
					variant={buttonVariant || 'white'}
					href={buttonHref}
				/>
			</div>
		</div>
	);
}
