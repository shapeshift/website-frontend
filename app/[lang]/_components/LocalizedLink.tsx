'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {forwardRef} from 'react'

import {DEFAULT_LANGUAGE, getLanguageFromPath} from '@/app/[lang]/_utils/i18nconfig'

import type {LinkProps} from 'next/link'
import type {AnchorHTMLAttributes, ReactNode} from 'react'
import type {UrlObject} from 'url'

/* eslint-disable @typescript-eslint/naming-convention */
declare const __adrsbl: {run: (event: string, conversion: boolean) => void} | undefined
/* eslint-enable @typescript-eslint/naming-convention */

type TLocalizedLinkProps = LinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		children: ReactNode
	}

/**
 * A localized version of Next.js Link that automatically prepends the current language
 * to internal links when needed.
 *
 * - Preserves UrlObject hrefs (pathname, query, hash).
 * - Detects and leaves external links unchanged.
 * - Opens app.shapeshift.com links in a new tab and fires the Addressable pixel event.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, TLocalizedLinkProps>(
	({href, children, onClick, ...props}, ref) => {
		const pathname = usePathname()
		const currentLanguage = getLanguageFromPath(pathname) || DEFAULT_LANGUAGE

		// Convert href to string for processing
		const hrefString =
			typeof href === 'string'
				? href
				: typeof href === 'object' &&
					  href !== null &&
					  'pathname' in href &&
					  typeof (href as UrlObject).pathname === 'string'
					? (href as UrlObject).pathname
					: ''

		// External app.shapeshift.com link detection
		const isAppLink = typeof hrefString === 'string' && /^https?:\/\/app\.shapeshift\.com(\/|$)/i.test(hrefString)

		// Compose click handler for external app links
		const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
			if (isAppLink) {
				try {
					if (__adrsbl?.run) {
						__adrsbl.run('app_click', true)
					}
				} catch {
					// ignore
				}
				e.preventDefault()
				try {
					window.open(hrefString || (typeof href === 'string' ? href : ''), '_blank', 'noopener,noreferrer')
				} catch {
					if (hrefString) {
						window.location.assign(hrefString)
					}
				}
			}
			if (onClick) {
				onClick(e)
			}
		}

		// Don't modify external links, anchors, or already localized paths
		if (
			hrefString?.startsWith('http') ||
			hrefString?.startsWith('#') ||
			hrefString?.startsWith('mailto:') ||
			hrefString?.startsWith('tel:') ||
			!hrefString?.startsWith('/')
		) {
			return (
				<Link
					href={href}
					ref={ref}
					{...props}
					onClick={isAppLink ? handleClick : onClick}>
					{children}
				</Link>
			)
		}

		// Check if the href already has a language prefix
		const hasLanguagePrefix = hrefString.match(/^\/([a-z]{2})(\/|$)/)

		// Build the localized href
		let localizedHref = hrefString
		if (!hasLanguagePrefix && currentLanguage !== DEFAULT_LANGUAGE) {
			localizedHref = `/${currentLanguage}${hrefString}`
		}

		return (
			<Link
				href={localizedHref}
				ref={ref}
				{...props}
				onClick={onClick}>
				{children}
			</Link>
		)
	}
)

LocalizedLink.displayName = 'LocalizedLink'
