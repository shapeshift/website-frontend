/**
 * Builds a full image URL from a Strapi image url field.
 * Strapi may return either a relative path (/uploads/...) or an absolute CDN URL.
 * Prepend NEXT_PUBLIC_STRAPI_URL only when the url is relative.
 */
export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) {
    return ''
  }
  if (url.startsWith('http')) {
    return url
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`
}
