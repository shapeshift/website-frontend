import { NextResponse } from 'next/server'

import { publicContentQuery } from '../query'

import type { NextRequest } from 'next/server'

const ALLOWED_COLLECTIONS = new Set(['notification', 'posts', 'newsrooms', 'support-articles', 'faq'])

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

  const target = new URL(`/api/${path[0]}`, strapiUrl)
  try {
    target.search = publicContentQuery(path[0], request.nextUrl.searchParams).toString()
  } catch {
    return NextResponse.json({ error: 'Unsupported content query' }, { status: 400 })
  }

  try {
    const upstream = await fetch(target, {
      headers: { Authorization: `Bearer ${strapiToken}` },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10_000),
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
