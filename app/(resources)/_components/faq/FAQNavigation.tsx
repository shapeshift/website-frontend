/************************************************************************************************
** FAQ Navigation Component:
**
** Client-side component for sticky FAQ section navigation
** Highlights the active section and provides smooth scrolling
**
** Features:
** - Sticky positioning that follows user as they scroll
** - Active section highlighting based on scroll position
** - Smooth scrolling to sections on click
** - Accessibility optimized with proper ARIA attributes
**
** Usage:
** - Use with FAQContent to provide navigation for FAQ sections
** - Pass sections and active section from parent component
** - Handle scroll behavior through provided onClick handler
************************************************************************************************/

'use client';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TFAQNavigationProps = {
    sections: Array<{
        id: number;
        sectionTitle: string;
    }>;
    activeSection: string;
    onSectionClick: (sectionTitle: string) => void;
};

export function FAQNavigation({
    sections,
    activeSection,
    onSectionClick
}: TFAQNavigationProps): ReactNode {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <nav 
            className={'sticky top-[360px] ml-20 hidden h-full lg:block'}
            aria-label="FAQ sections navigation"
        >
            <ul className={'flex flex-col gap-4'}>
                {sections.map(section => (
                    <li key={section.id}>
                        <button
                            onClick={() => onSectionClick(section.sectionTitle)}
                            className={cl(
                                'text-left text-lg transition-all hover:text-blue',
                                activeSection === section.sectionTitle ? 'text-white' : 'text-gray-500'
                            )}
                            aria-current={activeSection === section.sectionTitle ? 'true' : 'false'}
                        >
                            {section.sectionTitle}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}