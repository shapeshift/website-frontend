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

type TLocalizedLinkProps = LinkProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
		children: ReactNode
	}

/**
 * A localized version of Next.js Link that automatically prepends the current language to internal links when needed.
 * - Preserves UrlObject hrefs (pathname, query, hash).
 * - Detects and leaves external links unchanged.
 * - Opens app.shapeshift.com links in a new tab and fires the Addressable pixel event.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, TLocalizedLinkProps>(
	({href, children, onClick, ...props}, ref) => {
		const pathname = usePathname()
		const currentLanguage = getLanguageFromPath(pathname) || DEFAULT_LANGUAGE

		// Preserve UrlObject hrefs (pathname + query + hash) when provided
		const hrefObj = typeof href === 'object' && href !== null ? (href as UrlObject) : undefined

		// Convert href to string for pathname-based processing when needed
		const hrefString = typeof href === 'string' ? href : (hrefObj?.pathname ?? '')

		// Helper to build a full absolute URL string from a UrlObject when it has host/protocol
		const fullUrlFromObj = (obj: UrlObject) => {
			if (!obj) {
				return ''
			}
			const protocol = (obj.protocol as string) ?? ''
			const host = (obj.host as string) ?? (obj.hostname as string) ?? ''
			const pathname = (obj.pathname as string) ?? ''
			const hash = (obj.hash as string) ?? ''
			let query = ''
			// Support both string-form and object-form queries.
			if (obj.query) {
				if (typeof obj.query === 'string') {
					// Use provided string query, ensure it starts with '?'
					const raw = obj.query as string
					query = raw.startsWith('?') ? raw : `?${raw}`
				} else if (typeof obj.query === 'object') {
					// obj.query can be Record<string, string | string[]>.
					const params = new URLSearchParams()
					for (const [k, v] of Object.entries(obj.query as Record<string, string | string[]>)) {
						if (Array.isArray(v)) {
							for (const item of v) {
								params.append(k, String(item))
							}
						} else if (v !== undefined && v !== null) {
							params.append(k, String(v))
						}
					}
					const qs = params.toString()
					query = qs ? `?${qs}` : ''
				}
			}
			if (host) {
				// If protocol is provided, include it; otherwise emit a
				// protocol-relative URL ("//host/path") rather than defaulting
				// to https:. This avoids making assumptions about the desired
				// transport protocol.
				const protoPrefix = protocol ? `${protocol}//` : '//'
				return `${protoPrefix}${host}${pathname}${query}${hash}`
			}
			return `${pathname}${query}${hash}`
		}

		// External app.shapeshift.com link detection.
		// Match http(s)://app.shapeshift.com, protocol-relative //app.shapeshift.com,
		// and UrlObject cases where host/hostname equals app.shapeshift.com.
		const isAppLink = (() => {
			const appHostRegex = /^(?:https?:)?\/\/app\.shapeshift\.com(\/|$)/i
			if (typeof href === 'string') {
				return appHostRegex.test(href)
			}
			if (hrefObj) {
				// If host/hostname explicitly provided, compare directly (covers host-only UrlObject)
				const host = (hrefObj.host as string) ?? (hrefObj.hostname as string) ?? ''
				if (host && host.toLowerCase() === 'app.shapeshift.com') {
					return true
				}

				const full = fullUrlFromObj(hrefObj)
				return appHostRegex.test(full)
			}
			return false
		})()

		// Compose click handler for external app links
		const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
			// Invoke the user's handler first so they may call e.preventDefault().
			if (onClick) {
				try {
					onClick(e)
				} catch {
					// Swallow user handler errors to avoid breaking navigation logic.
				}
			}

			// If the user's handler prevented default, respect that and do nothing.
			if (e.defaultPrevented) {
				return
			}

			if (isAppLink) {
				try {
					if (__adrsbl?.run) {
						__adrsbl.run('app_click', true)
					}
				} catch {
					// ignore
				}

				const absolute = hrefObj
					? fullUrlFromObj(hrefObj)
					: hrefString || (typeof href === 'string' ? href : '')
				if (!absolute) {
					return
				}

				try {
					// Prevent default navigation so we can control behavior and fallbacks.
					e.preventDefault()

					// Attempt to open a new tab. Some browsers/pop-up blockers return null.
					const newWin = window.open(absolute, '_blank', 'noopener,noreferrer')
					if (!newWin) {
						// Popup blocked or couldn't open new tab — navigate in the same tab.
						try {
							window.location.assign(absolute)
						} catch {
							// ignore
						}
					}
				} catch {
					// In case window.open throws for some reason, fallback to assign.
					try {
						window.location.assign(absolute)
					} catch {
						// ignore
					}
				}
			}
		}

		// Don't modify external links, anchors, or already localized paths
		const isExternalObject = !!hrefObj && !!(hrefObj.host || hrefObj.hostname || hrefObj.protocol)
		if (
			typeof href === 'string'
				? hrefString.startsWith('http') ||
					hrefString.startsWith('#') ||
					hrefString.startsWith('mailto:') ||
					hrefString.startsWith('tel:') ||
					!hrefString.startsWith('/')
				: // href is an object
					isExternalObject
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

		// Build the localized href. Preserve query/hash by returning a UrlObject when the original
		// href was a UrlObject, otherwise return a string.
		let localizedPathname = hrefString
		if (!hasLanguagePrefix && currentLanguage !== DEFAULT_LANGUAGE) {
			localizedPathname = `/${currentLanguage}${hrefString}`
		}

		const localizedHref = hrefObj
			? // copy the original UrlObject but replace/normalize pathname
				({...hrefObj, pathname: localizedPathname} as UrlObject)
			: localizedPathname

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
