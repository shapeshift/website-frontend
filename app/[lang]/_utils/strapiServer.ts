import 'server-only'

/**
 * Server-only low-level fetch against the Strapi Content API.
 *
 * This is the single place (besides the /api/strapi proxy in route.ts) that attaches the API token,
 * so no page, component, or util needs to inline it. The `server-only` import turns importing this
 * module from a client component into a build error, so the token can never be bundled into client
 * code (where process.env.STRAPI_API_TOKEN is undefined and the request would send `Bearer
 * undefined`). Client-side data goes through the /api/strapi proxy instead.
 *
 * `path` is everything after `/api/`, e.g. `posts?filters[slug][$eq]=foo`. Pass `revalidate`
 * (seconds) to opt into Next's data cache.
 */
export async function strapiServerFetch(path: string, options?: { revalidate?: number }): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    ...(options?.revalidate !== undefined ? { next: { revalidate: options.revalidate } } : {}),
  })
}
