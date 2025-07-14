import {NextResponse} from 'next/server';

import {
	DEFAULT_LANGUAGE,
	DEPRECATED_LANGUAGES,
	SUPPORTED_LANGUAGES,
	getLanguageFromPath
} from '@/app/[lang]/_utils/i18nconfig';

import type {NextRequest} from 'next/server';

/**
 * Extract language from subdomain if present
 */
function extractLanguageFromSubdomain(hostname: string): string | null {
	const hostParts = hostname.split('.');

	if (hostParts.length <= 2) {
		return null;
	}

	const possibleLang = hostParts[0];
	const isValidLanguage = SUPPORTED_LANGUAGES.some(lang => lang.code === possibleLang);
	const isValidDeprecatedLanguage = DEPRECATED_LANGUAGES.includes(possibleLang);

	return isValidLanguage || isValidDeprecatedLanguage ? possibleLang : null;
}

/**
 * Check if pathname contains a locale
 */
function hasLocaleInPath(pathname: string): boolean {
	return SUPPORTED_LANGUAGES.some(lang => pathname.startsWith(`/${lang.code}/`) || pathname === `/${lang.code}`);
}

/**
 * Create headers with locale information
 */
function createLocaleHeaders(requestHeaders: Headers, pathname: string, locale: string): Headers {
	const headers = new Headers(requestHeaders);
	headers.set('x-current-path', pathname);
	headers.set('x-locale', locale);
	return headers;
}

/**
 * Set locale cookie on response
 */
function setLocaleCookie(response: NextResponse, locale: string): void {
	response.cookies.set('locale', locale, {
		httpOnly: false,
		sameSite: 'lax',
		path: '/'
	});
}

/**
 * Handle subdomain-based language redirect
 */
function handleSubdomainRedirect(request: NextRequest, hostname: string, subdomainLang: string): NextResponse {
	const hostParts = hostname.split('.');
	const mainDomain = hostParts.slice(1).join('.');

	const newUrl = new URL(request.url);
	newUrl.hostname = mainDomain;

	// Redirect deprecated languages to default language without prefix
	if (DEPRECATED_LANGUAGES.includes(subdomainLang)) {
		newUrl.pathname = request.nextUrl.pathname; // Preserve path
		return NextResponse.redirect(newUrl, 301);
	}

	newUrl.pathname = `/${subdomainLang}${request.nextUrl.pathname}`;

	return NextResponse.redirect(newUrl, 301);
}

/**
 * Handle locale-based routing logic
 */
function handleLocaleRouting(
	request: NextRequest,
	response: NextResponse,
	locale: string,
	pathHasLocale: boolean
): NextResponse {
	const pathname = request.nextUrl.pathname;

	// If path has locale, return as is (Next.js will handle the routing)
	if (pathHasLocale) {
		console.log('returning response - path has locale');
		return response;
	}

	// If no locale in path and it's the default language, rewrite to include it
	if (locale === DEFAULT_LANGUAGE) {
		request.nextUrl.pathname = `/${DEFAULT_LANGUAGE}${pathname}`;
		console.log('rewriting to', request.nextUrl.pathname);
		return NextResponse.rewrite(request.nextUrl);
	}

	// Redirect to include locale in path for non-default languages
	request.nextUrl.pathname = `/${locale}${pathname}`;
	console.log('redirecting to', request.nextUrl.pathname);
	return NextResponse.redirect(request.nextUrl);
}

export function middleware(request: NextRequest): NextResponse {
	const pathname = request.nextUrl.pathname;
	const hostname = request.headers.get('host') || '';

	// Check for language subdomain
	const subdomainLang = extractLanguageFromSubdomain(hostname);

	// Handle subdomain-based language redirect
	if (subdomainLang && subdomainLang !== DEFAULT_LANGUAGE) {
		return handleSubdomainRedirect(request, hostname, subdomainLang);
	}

	// Check if path has locale
	const isPathWithLocale = hasLocaleInPath(pathname);

	// Extract locale
	const locale = isPathWithLocale ? getLanguageFromPath(pathname) || DEFAULT_LANGUAGE : DEFAULT_LANGUAGE;

	// Create response with locale headers
	const headers = createLocaleHeaders(request.headers, pathname, locale);
	const response = NextResponse.next({headers});

	// Set locale cookie
	setLocaleCookie(response, locale);

	// Handle locale routing
	return handleLocaleRouting(request, response, locale, isPathWithLocale);
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
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest|ico|css|js|woff|woff2|ttf|otf)).*)'
	]
};
