import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = params;
    const searchParams = request.nextUrl.searchParams;

    // Construct the Chatwoot URL
    const chatwootPath = path.join('/');
    const chatwootUrl = `https://app.chatwoot.com/${chatwootPath}?${searchParams.toString()}`;

    // Forward the request to Chatwoot
    const response = await fetch(chatwootUrl, {
      method: 'GET',
      headers: {
        'User-Agent': request.headers.get('user-agent') || 'ShapeShift-Proxy',
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
        'Referer': request.headers.get('referer') || request.nextUrl.origin,
      },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const content = await response.text();

    // Create response with proper COEP headers
    const nextResponse = new NextResponse(content, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'text/html',
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'X-Frame-Options': 'SAMEORIGIN',
        // Preserve some original headers
        'Cache-Control': response.headers.get('cache-control') || 'no-cache',
        'ETag': response.headers.get('etag') || '',
        'Vary': response.headers.get('vary') || '',
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
    return new NextResponse('Proxy Error', { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = params;
    const searchParams = request.nextUrl.searchParams;
    const body = await request.text();

    // Construct the Chatwoot URL
    const chatwootPath = path.join('/');
    const chatwootUrl = `https://app.chatwoot.com/${chatwootPath}?${searchParams.toString()}`;

    // Forward the request to Chatwoot
    const response = await fetch(chatwootUrl, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'User-Agent': request.headers.get('user-agent') || 'ShapeShift-Proxy',
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
        'Referer': request.headers.get('referer') || request.nextUrl.origin,
      },
      body: body || undefined,
    });

    const content = await response.text();

    // Create response with proper COEP headers
    const nextResponse = new NextResponse(content, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'X-Frame-Options': 'SAMEORIGIN',
        'Cache-Control': response.headers.get('cache-control') || 'no-cache',
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
    return new NextResponse('Proxy Error', { status: 500 });
  }
}
