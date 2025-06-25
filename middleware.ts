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
		console.log('rewriting to', request.nextUrl.pathname);
		return NextResponse.rewrite(request.nextUrl);
	}

	if (hasLocaleInPath || currentLocale === DEFAULT_LANGUAGE) {
		console.log('returning response');
		return response;
	}

	// Redirect if there is no locale
	request.nextUrl.pathname = `/${currentLocale}${pathname}`;
	console.log('redirecting to', request.nextUrl.pathname);
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt
		 * - public assets with extensions (images, fonts, etc.)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)).*)'
	]
};
