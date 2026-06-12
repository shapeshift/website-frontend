import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

/**
 * Same-origin proxy for the Strapi Content API.
 *
 * Keeps the Strapi API token server-side: the browser calls /api/strapi/<path> with no
 * credentials and this handler injects the bearer token before forwarding to Strapi. Only GET
 * is proxied and the upstream path is always prefixed with /api/, so this cannot be used to reach
 * Strapi admin or content-type-builder routes.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    return NextResponse.json({ error: 'Strapi proxy is not configured' }, { status: 500 })
  }

  const { path } = await params
  const target = new URL(`/api/${path.join('/')}`, strapiUrl)
  target.search = request.nextUrl.search

  const upstream = await fetch(target, {
    headers: { Authorization: `Bearer ${strapiToken}` },
    next: { revalidate: 60 },
  })

  const body = await upstream.text()
  const responseHeaders = new Headers()
  responseHeaders.set('content-type', upstream.headers.get('content-type') ?? 'application/json')
  return new NextResponse(body, {
    status: upstream.status,
    headers: responseHeaders,
  })
}
