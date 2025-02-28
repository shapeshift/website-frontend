/************************************************************************************************
** ResourceHeader Component:
**
** A versatile, reusable header component for resource pages
** Displays title, description, feature badges, and optional CTA button
**
** Features:
** - Responsive design for mobile and desktop layouts
** - Configurable badge items with check icons
** - Optional CTA button with customizable text and URL
** - Supports SEO-friendly heading structure
**
** Usage:
** - Import in any resource page that needs a consistent header
** - Configure with title, description, feature items
** - Optionally add CTA button and custom classes
************************************************************************************************/

import Image from 'next/image';

import {Button} from '@/components/common/Button';
import {IconCheck} from '@/components/common/icons/IconCheck';
import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TResourceHeaderProps = {
    title: string;
    description: string;
    items: string[];
    ctaButton?: {
        text: string;
        url: string;
    };
    className?: string;
    titlePrefix?: string;
    hasLogo?: boolean;
    logoUrl?: string;
    logoWidth?: number;
    logoHeight?: number;
    logoAlt?: string;
};

export function ResourceHeader({
    title,
    description,
    items,
    ctaButton,
    className,
    titlePrefix,
    hasLogo = false,
    logoUrl,
    logoWidth,
    logoHeight,
    logoAlt
}: TResourceHeaderProps): ReactNode {
    return (
        <section className={cl('flex flex-col items-center', className)}>
            {/* Feature badges - desktop only */}
            <div className={'mb-10 hidden gap-2 lg:flex'}>
                {items.map(item => (
                    <div
                        className={'flex items-center gap-1 rounded-[24px] bg-secondBg px-4 py-[10px]'}
                        key={item}
                        aria-label={`Feature: ${item}`}
                    >
                        <IconCheck className={'text-blue'} />
                        <span className={'text-blue'}>{item}</span>
                    </div>
                ))}
            </div>

            {/* Title and description */}
            <div className={'mb-10 flex flex-col items-center gap-2'}>
                <h1 className={'mb-6 text-center text-[40px] leading-10 lg:text-7xl'}>
                    {titlePrefix ? `${titlePrefix} ${title}` : title}
                </h1>
                <p className={'mx-auto max-w-screen-md text-center text-base text-gray-500 lg:text-xl'}>
                    {description}
                </p>
            </div>

            {/* Optional CTA Button */}
            {ctaButton && (
                <Button
                    variant={'blue'}
                    href={ctaButton.url}
                    title={ctaButton.text}
                    aria-label={`${ctaButton.text} for ${title}`}
                />
            )}

            {/* Optional Logo display */}
            {hasLogo && logoUrl && (
                <div className="mt-8 flex justify-center">
                    <Image
                        src={logoUrl}
                        alt={logoAlt || title}
                        width={logoWidth || 120}
                        height={logoHeight || 120}
                        className="h-auto w-auto max-w-[180px]"
                    />
                </div>
            )}
        </section>
    );
}