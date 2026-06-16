import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

/**
 * Same-origin proxy for the Strapi Content API.
 *
 * Keeps the Strapi API token server-side: the browser calls /api/strapi/<collection> with no
 * credentials and this handler injects the bearer token before forwarding to Strapi.
 *
 * Forwarding is restricted to what the frontend actually uses:
 *  - only GET, and the upstream path is always prefixed with /api/
 *  - only the collections in ALLOWED_COLLECTIONS; anything else 404s
 *  - only the query params in ALLOWED_QUERY_KEYS; anything else 400s
 */

// Collections the browser is allowed to read through this proxy.
const ALLOWED_COLLECTIONS = new Set(['notification', 'posts', 'newsrooms', 'support-articles', 'faq'])

// Top-level query params the frontend uses.
const ALLOWED_QUERY_KEYS = new Set(['fields', 'filters', 'populate', 'sort', 'pagination', 'status', 'locale'])

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

  // Gate on the collection (first path segment) so the proxy can only reach allowlisted content.
  if (path.length !== 1 || !ALLOWED_COLLECTIONS.has(path[0])) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Reject any query param outside the known-safe set. Keys look like `filters[slug][$eq]`, so we
  // compare the base key before the first bracket.
  for (const key of request.nextUrl.searchParams.keys()) {
    const baseKey = key.split('[')[0]
    if (!ALLOWED_QUERY_KEYS.has(baseKey)) {
      return NextResponse.json({ error: `Unsupported query parameter: ${baseKey}` }, { status: 400 })
    }
  }

  const target = new URL(`/api/${path.join('/')}`, strapiUrl)
  target.search = request.nextUrl.search

  try {
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
  } catch {
    // Transport-level failure (Strapi unreachable, DNS, timeout) — surface a controlled 502
    // instead of letting the thrown fetch error bubble up as an opaque 500.
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 502 })
  }
}
