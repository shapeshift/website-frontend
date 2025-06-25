import {NextResponse} from 'next/server';

import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getLanguageFromPath} from '@/app/[lang]/_utils/i18nconfig';

import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest): NextResponse {
	const pathname = request.nextUrl.pathname;
	const hostname = request.headers.get('host') || '';

	// Check if there's a language subdomain (e.g., fr.something.com)
	const hostParts = hostname.split('.');
	const possibleLangSubdomain = hostParts[0];
	const isLanguageSubdomain =
		hostParts.length > 2 && SUPPORTED_LANGUAGES.some(lang => lang.code === possibleLangSubdomain);

	// Check if path has locale
	const hasLocaleInPath = SUPPORTED_LANGUAGES.some(
		lang => pathname.startsWith(`/${lang.code}/`) || pathname === `/${lang.code}`
	);

	// Handle subdomain-based language redirect
	if (isLanguageSubdomain && possibleLangSubdomain !== DEFAULT_LANGUAGE) {
		// Remove the language subdomain from the host
		const mainDomain = hostParts.slice(1).join('.');

		// Build the new URL with language in path
		const newUrl = new URL(request.url);
		newUrl.hostname = mainDomain;
		newUrl.pathname = `/${possibleLangSubdomain}${pathname}`;

		// Permanent redirect from subdomain to path-based URL
		return NextResponse.redirect(newUrl, 301);
	}

	// Add headers
	const headers = new Headers(request.headers);
	headers.set('x-current-path', pathname);

	// Extract locale from pathname if present
	const locale = hasLocaleInPath ? getLanguageFromPath(pathname) || DEFAULT_LANGUAGE : DEFAULT_LANGUAGE;

	const currentLocale = locale || DEFAULT_LANGUAGE;
	headers.set('x-locale', currentLocale);

	// Create response with headers
	const response = NextResponse.next({headers});

	// Set locale cookie for client-side access
	response.cookies.set('locale', currentLocale, {
		httpOnly: false,
		sameSite: 'lax',
		path: '/'
	});

	if (currentLocale === DEFAULT_LANGUAGE) {
		request.nextUrl.pathname = `/${DEFAULT_LANGUAGE}${pathname}`;
		return NextResponse.rewrite(request.nextUrl);
	}

	if (hasLocaleInPath || currentLocale === DEFAULT_LANGUAGE) {
		return response;
	}

	// Redirect if there is no locale
	request.nextUrl.pathname = `/${currentLocale}${pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		// Match all routes except static files, APIs, and irrelevant files
		'/((?!api|_next/static|_next/image|favicon.ico|manifest|manifest.webmanifest|sw.js|service-worker.js|.well-known|robots.txt|sitemap.xml).*)'
	]
};
