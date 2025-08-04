import {NextResponse} from 'next/server';

import type {NextRequest} from 'next/server';

export async function GET(
	request: NextRequest,
	{params}: {params: {path: string[]}}
): Promise<NextResponse> {
  	try {
		const {path} = params;
		const searchParams = request.nextUrl.searchParams;

		// Construct the Chatwoot URL
		const chatwootPath = path.join('/');
		const chatwootUrl = `https://app.chatwoot.com/${chatwootPath}?${searchParams.toString()}`;

		// Forward the request to Chatwoot
		const response = await fetch(chatwootUrl, {
			method: 'GET',
			headers: {
				'user-agent': request.headers.get('user-agent') || 'ShapeShift-Proxy',
				accept: request.headers.get('accept') || '*/*',
				'accept-language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
				referer: request.headers.get('referer') || request.nextUrl.origin
			}
		});

    		if (!response.ok) {
			return new NextResponse(null, {status: response.status});
		}

		const content = await response.text();

		// Create response with proper COEP headers
		const nextResponse = new NextResponse(content, {
			status: response.status,
			headers: {
				'content-type': response.headers.get('content-type') || 'text/html',
				'cross-origin-embedder-policy': 'credentialless',
				'cross-origin-resource-policy': 'cross-origin',
				'cross-origin-opener-policy': 'same-origin',
				'x-frame-options': 'SAMEORIGIN',
				// Preserve some original headers
				'cache-control': response.headers.get('cache-control') || 'no-cache',
				etag: response.headers.get('etag') || '',
				vary: response.headers.get('vary') || ''
			}
		});

		// Copy Set-Cookie headers if present (for Chatwoot session)
		const setCookieHeaders = response.headers.get('set-cookie');
		if (setCookieHeaders) {
			nextResponse.headers.set('Set-Cookie', setCookieHeaders);
		}

		return nextResponse;
	} catch (error) {
		console.error('Chatwoot proxy error:', error);
		return new NextResponse('Proxy Error', {status: 500});
	}
}

export async function POST(
	request: NextRequest,
	{params}: {params: {path: string[]}}
): Promise<NextResponse> {
	try {
		const {path} = params;
		const searchParams = request.nextUrl.searchParams;
		const body = await request.text();

		// Construct the Chatwoot URL
		const chatwootPath = path.join('/');
		const chatwootUrl = `https://app.chatwoot.com/${chatwootPath}?${searchParams.toString()}`;

		// Forward the request to Chatwoot
		const response = await fetch(chatwootUrl, {
			method: 'POST',
			headers: {
				'content-type': request.headers.get('content-type') || 'application/json',
				'user-agent': request.headers.get('user-agent') || 'ShapeShift-Proxy',
				accept: request.headers.get('accept') || '*/*',
				'accept-language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
				referer: request.headers.get('referer') || request.nextUrl.origin
			},
			body: body || undefined
		});

    		const content = await response.text();

		// Create response with proper COEP headers
		const nextResponse = new NextResponse(content, {
			status: response.status,
			headers: {
				'content-type': response.headers.get('content-type') || 'application/json',
				'cross-origin-embedder-policy': 'credentialless',
				'cross-origin-resource-policy': 'cross-origin',
				'cross-origin-opener-policy': 'same-origin',
				'x-frame-options': 'SAMEORIGIN',
				'cache-control': response.headers.get('cache-control') || 'no-cache'
			}
		});

		// Copy Set-Cookie headers if present
		const setCookieHeaders = response.headers.get('set-cookie');
		if (setCookieHeaders) {
			nextResponse.headers.set('Set-Cookie', setCookieHeaders);
		}

		return nextResponse;
	} catch (error) {
		console.error('Chatwoot proxy error:', error);
		return new NextResponse('Proxy Error', {status: 500});
	}
}
