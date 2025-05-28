import {NextResponse} from 'next/server';

import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getLanguageFromPath} from '@/app/i18n/config';

import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest): NextResponse {
	const pathname = request.nextUrl.pathname;
	const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
		lang => pathname.startsWith(`/${lang.code}/`) || pathname === `/${lang.code}`
	);

	// Add a new header x-current-path which passes the path to downstream components
	const headers = new Headers(request.headers);
	headers.set('x-current-path', pathname);

	// If pathname doesn't have a locale, redirect to default locale
	if (!pathnameHasLocale) {
		// Don't redirect if it's the root path - let it be handled naturally
		if (pathname === '/') {
			return NextResponse.next({headers});
		}

		// For other paths, check if we should add a locale prefix
		// We'll let the LanguageContext handle this based on Weglot's current language
		return NextResponse.next({headers});
	}

	// Extract locale from pathname
	const locale = getLanguageFromPath(pathname);
	
	// If locale is the default language, we could optionally redirect to remove it
	// But for now, we'll keep it for consistency
	
	return NextResponse.next({headers});
}

export const config = {
	matcher: [
		// match all routes except static files and APIs
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};
