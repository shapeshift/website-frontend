'use client';

import {useEffect, useRef, useState} from 'react';

import {Banner} from '@/components/common/Banner';
import {QuestionSection} from '@/components/QuestionSection';
import {cl} from '@/components/utils/cl';
import {useFaq} from '@/hooks/useFaq';

import type {ReactNode} from 'react';

/********************************************************************************************
 * FAQ Page Component
 * Displays FAQ sections with smooth scrolling navigation
 * Features:
 * - Automatic section highlighting on scroll
 * - Smooth scroll to section on click
 * - Sticky navigation sidebar
 ********************************************************************************************/
export default function FaqPage(): ReactNode {
	const {data} = useFaq();
	const [activeSection, setActiveSection] = useState<string>('');
	const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const isManualScrolling = useRef(false);
	const rafId = useRef<number>();

	/********************************************************************************************
	 * Handle scroll events to update active section
	 * Uses requestAnimationFrame for smooth performance
	 * Ignores scroll events during manual navigation
	 ********************************************************************************************/
	useEffect(() => {
		const handleScroll = (): void => {
			if (isManualScrolling.current) {
				return;
			}

			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}

			rafId.current = requestAnimationFrame(() => {
				// Find all sections and their positions
				const sectionPositions = Object.entries(sectionRefs.current).map(([title, element]) => ({
					title,
					top: element?.getBoundingClientRect().top ?? 0
				}));

				// Find the section closest to our offset position (160px from top)
				const activeSection = sectionPositions?.reduce((closest, current) => {
					const currentDistance = Math.abs(current.top - 160);
					const closestDistance = Math.abs(closest.top - 160);
					return currentDistance < closestDistance ? current : closest;
				});

				setActiveSection(activeSection.title);
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, []);

	/********************************************************************************************
	 * Handles click navigation to sections
	 * Includes smooth scrolling and temporary disable of scroll handling
	 * @param {string} sectionTitle - Title of the section to scroll to
	 ********************************************************************************************/
	const scrollToSection = (sectionTitle: string): void => {
		const element = sectionRefs.current[sectionTitle];
		if (!element) {
			return;
		}

		isManualScrolling.current = true;
		setActiveSection(sectionTitle);

		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - 160;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});

		// Reset the manual scrolling flag after animation
		setTimeout(() => {
			isManualScrolling.current = false;
		}, 500);
	};

	return (
		<div className={'container relative mt-40 grid grid-cols-4 gap-20'}>
			<div className={'col-span-3'}>
				<div className={'mb-14 max-w-[600px] text-h1 leading-[72px]'}>{data?.title}</div>
				<div className={'mb-40 flex flex-col gap-10'}>
					{data?.faqSection.map(section => (
						<div
							key={section.id}
							ref={el => {
								sectionRefs.current[section.sectionTitle] = el;
							}}>
							<div className={'mb-6 text-2xl text-gray-500'}>{section.sectionTitle}</div>
							<div className={'flex flex-col gap-2'}>
								{section.faqSectionItem.map(item => (
									<QuestionSection
										key={item.id}
										faqSectionItem={item}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={'sticky top-[360px] col-span-1 ml-20 h-screen'}>
				<div className={'flex flex-col gap-4'}>
					{data?.faqSection.map(section => (
						<button
							key={section.id}
							onClick={() => scrollToSection(section.sectionTitle)}
							className={cl(
								'text-left text-lg transition-all hover:text-white',
								activeSection === section.sectionTitle ? 'text-white' : 'text-gray-500'
							)}>
							{section.sectionTitle}
						</button>
					))}
				</div>
			</div>
			<div className={'col-span-4'}>
				<Banner />
			</div>
		</div>
	);
}
