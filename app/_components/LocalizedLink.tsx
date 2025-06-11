'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {forwardRef} from 'react';

import {DEFAULT_LANGUAGE, getLanguageFromPath} from '@/app/_utils/i18nconfig';

import type {LinkProps} from 'next/link';
import type {AnchorHTMLAttributes, ReactNode} from 'react';

type TLocalizedLinkProps = LinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		children: ReactNode;
	};

/**
 * A localized version of Next.js Link that automatically prepends the current language
 * to internal links when needed.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, TLocalizedLinkProps>(({href, children, ...props}, ref) => {
	const pathname = usePathname();
	const currentLanguage = getLanguageFromPath(pathname);

	// Convert href to string for processing
	const hrefString =
		typeof href === 'string'
			? href
			: typeof href === 'object' &&
				  href !== null &&
				  'pathname' in href &&
				  typeof (href as any).pathname === 'string'
				? (href as any).pathname
				: '';

	// Don't modify external links, anchors, or already localized paths
	if (
		hrefString.startsWith('http') ||
		hrefString.startsWith('#') ||
		hrefString.startsWith('mailto:') ||
		hrefString.startsWith('tel:') ||
		!hrefString.startsWith('/')
	) {
		return (
			<Link
				href={href}
				ref={ref}
				{...props}>
				{children}
			</Link>
		);
	}

	// Check if the href already has a language prefix
	const hasLanguagePrefix = hrefString.match(/^\/[a-z]{2}(\/|$)/);

	// Build the localized href
	let localizedHref = hrefString;
	if (!hasLanguagePrefix && currentLanguage !== DEFAULT_LANGUAGE) {
		localizedHref = `/${currentLanguage}${hrefString}`;
	}

	return (
		<Link
			href={localizedHref}
			ref={ref}
			{...props}>
			{children}
		</Link>
	);
});

LocalizedLink.displayName = 'LocalizedLink';
