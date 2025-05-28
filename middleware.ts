import {NextResponse} from 'next/server';

import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getLanguageFromPath} from '@/app/i18n/config';

import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest): NextResponse {
	const pathname = request.nextUrl.pathname;
	const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
		lang => pathname.startsWith(`/${lang.code}/`) || pathname === `/${lang.code}`
	);

	// Add headers
	const headers = new Headers(request.headers);
	headers.set('x-current-path', pathname);

	// Extract locale from pathname if present
	const locale = pathnameHasLocale ? getLanguageFromPath(pathname) : DEFAULT_LANGUAGE;
	
	// Add locale to headers so components can access it
	headers.set('x-locale', locale || DEFAULT_LANGUAGE);

	// Create response with headers
	const response = NextResponse.next({headers});

	// Set locale cookie for client-side access
	response.cookies.set('locale', locale || DEFAULT_LANGUAGE, {
		httpOnly: false,
		sameSite: 'lax',
		path: '/'
	});

	return response;
}

export const config = {
	matcher: [
		// match all routes except static files and APIs
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};
