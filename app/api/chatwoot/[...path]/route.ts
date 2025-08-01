import {NextRequest, NextResponse} from 'next/server';

const CHATWOOT_BASE_URL = 'https://app.chatwoot.com';
const ALLOWED_PATHS = ['/packs/js/sdk.js', '/widget', '/widget/bubble'];

export async function GET(request: NextRequest, {params}: {params: {path: string[]}}): Promise<NextResponse> {
	const path = params.path.join('/');
	const fullPath = `/${path}`;
	
	// Security: Only allow specific paths
	const isAllowed = ALLOWED_PATHS.some(allowedPath => 
		fullPath === allowedPath || fullPath.startsWith(`${allowedPath}?`)
	);
	
	if (!isAllowed) {
		return NextResponse.json({error: 'Forbidden'}, {status: 403});
	}
	
	// Forward the request to Chatwoot
	const url = new URL(fullPath, CHATWOOT_BASE_URL);
	const searchParams = request.nextUrl.searchParams;
	searchParams.forEach((value, key) => {
		url.searchParams.append(key, value);
	});
	
	try {
		const response = await fetch(url.toString(), {
			headers: {
				'User-Agent': request.headers.get('User-Agent') || '',
				'Accept': request.headers.get('Accept') || '*/*',
				'Accept-Language': request.headers.get('Accept-Language') || 'en-US,en;q=0.9',
				'Referer': request.headers.get('Referer') || ''
			}
		});
		
		const contentType = response.headers.get('Content-Type') || 'text/plain';
		const body = await response.arrayBuffer();
		
		// Create response with proper headers
		const proxyResponse = new NextResponse(body, {
			status: response.status,
			statusText: response.statusText,
			headers: {
				'Content-Type': contentType,
				'Cross-Origin-Embedder-Policy': 'credentialless',
				'Cross-Origin-Resource-Policy': 'cross-origin',
				'Cross-Origin-Opener-Policy': 'same-origin'
			}
		});
		
		// Copy cache control headers if present
		const cacheControl = response.headers.get('Cache-Control');
		if (cacheControl) {
			proxyResponse.headers.set('Cache-Control', cacheControl);
		}
		
		return proxyResponse;
	} catch (error) {
		console.error('[Chatwoot Proxy] Error:', error);
		return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
	}
}

export async function POST(request: NextRequest, {params}: {params: {path: string[]}}): Promise<NextResponse> {
	const path = params.path.join('/');
	const fullPath = `/${path}`;
	
	// Security: Only allow widget path for POST
	if (!fullPath.startsWith('/widget')) {
		return NextResponse.json({error: 'Forbidden'}, {status: 403});
	}
	
	const url = new URL(fullPath, CHATWOOT_BASE_URL);
	const searchParams = request.nextUrl.searchParams;
	searchParams.forEach((value, key) => {
		url.searchParams.append(key, value);
	});
	
	try {
		const body = await request.text();
		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': request.headers.get('Content-Type') || 'application/json',
				'User-Agent': request.headers.get('User-Agent') || '',
				'Accept': request.headers.get('Accept') || '*/*',
				'Referer': request.headers.get('Referer') || ''
			},
			body
		});
		
		const responseBody = await response.arrayBuffer();
		const contentType = response.headers.get('Content-Type') || 'text/plain';
		
		const proxyResponse = new NextResponse(responseBody, {
			status: response.status,
			statusText: response.statusText,
			headers: {
				'Content-Type': contentType,
				'Cross-Origin-Embedder-Policy': 'credentialless',
				'Cross-Origin-Resource-Policy': 'cross-origin',
				'Cross-Origin-Opener-Policy': 'same-origin'
			}
		});
		
		return proxyResponse;
	} catch (error) {
		console.error('[Chatwoot Proxy] POST Error:', error);
		return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
	}
}