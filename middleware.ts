import {NextResponse} from 'next/server';

import {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getLanguageFromPath} from '@/app/i18n/config';

import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest): NextResponse {
	const pathname = request.nextUrl.pathname;
	const hostname = request.headers.get('host') || '';
	
	// Check if there's a language subdomain (e.g., fr.something.com)
	const hostParts = hostname.split('.');
	const possibleLangSubdomain = hostParts[0];
	const isLanguageSubdomain = hostParts.length > 2 && 
		SUPPORTED_LANGUAGES.some(lang => lang.code === possibleLangSubdomain);
	
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
		
		console.log('[Middleware] Redirecting from subdomain:', hostname, 'to:', newUrl.toString());
		
		// Permanent redirect from subdomain to path-based URL
		return NextResponse.redirect(newUrl, 301);
	}

	// Add headers
	const headers = new Headers(request.headers);
	headers.set('x-current-path', pathname);

	// Extract locale from pathname if present
	const locale = hasLocaleInPath ? getLanguageFromPath(pathname) : DEFAULT_LANGUAGE;

	// Log middleware detection
	console.log('[Middleware] Path:', pathname);
	console.log('[Middleware] Has locale in path:', hasLocaleInPath);
	console.log('[Middleware] Detected locale:', locale);

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
