type TContentPolicy = {
  fields: string[]
  populate: string[]
  populateFields?: Record<string, string[]>
  filters: string[]
  sort: string[]
}

const imageFields = ['url', 'width', 'height', 'formats']

const policies: Record<string, TContentPolicy> = {
  posts: {
    fields: ['slug', 'summary', 'title', 'type', 'tags', 'publishedAt', 'isFeatured', 'content'],
    populate: ['featuredImg'],
    populateFields: { featuredImg: imageFields },
    filters: ['filters[slug][$eq]', 'filters[type][$contains]', 'filters[tags][$contains]'],
    sort: ['isFeatured:desc', 'id:asc', 'id:desc'],
  },
  newsrooms: {
    fields: [
      'slug',
      'postSummary',
      'title',
      'category',
      'tags',
      'publishedAt',
      'publishedOn',
      'author',
      'externalURL',
      'content',
    ],
    populate: ['featuredImg'],
    populateFields: { featuredImg: imageFields },
    filters: ['filters[slug][$eq]', 'filters[category][$contains]', 'filters[tags][$contains]'],
    sort: ['publishedOn:asc', 'publishedOn:desc'],
  },
  ['support-articles']: {
    fields: ['slug', 'summary', 'title', 'publishedAt', 'content'],
    populate: ['featuredImg'],
    populateFields: { featuredImg: imageFields },
    filters: ['filters[slug][$eq]'],
    sort: ['publishedAt:asc', 'publishedAt:desc'],
  },
  notification: {
    fields: ['title', 'description', 'enabled', 'type', 'tag', 'href'],
    populate: ['bgImage'],
    populateFields: { bgImage: ['url'] },
    filters: [],
    sort: [],
  },
  faq: { fields: ['documentId'], populate: ['faqSection', 'faqSection.faqSectionItem'], filters: [], sort: [] },
}

export function publicContentQuery(collection: string, input: URLSearchParams): URLSearchParams {
  const policy = policies[collection]
  if (!policy || input.toString().length > 4096) throw new Error('Unsupported content query')
  const output = new URLSearchParams()
  const seen = new Set<string>()
  for (const [key, value] of input) {
    if (seen.has(key) || value.length > 200) throw new Error('Invalid query parameter')
    seen.add(key)
    const indexed = /^(fields|populate|sort)\[(\d{1,2})\]$/.exec(key)
    if (indexed) {
      const kind = indexed[1] as 'fields' | 'populate' | 'sort'
      if (!policy[kind].includes(value)) throw new Error('Unsupported selection')
      const relationFields = kind === 'populate' ? policy.populateFields?.[value] : undefined
      if (relationFields) {
        // Replace unrestricted media population with server-owned field selections.
        relationFields.forEach((field, index) => output.set(`populate[${value}][fields][${index}]`, field))
      } else {
        output.append(key, value)
      }
    } else if (policy.filters.includes(key) && value.length > 0) {
      output.set(key, value)
    } else if (key === 'status' && value === 'published') {
      continue
    } else if (key === 'locale' && /^[a-z]{2}(-[A-Z]{2})?$/.test(value)) {
      output.set(key, value)
    } else if (key === 'pagination[withCount]' && ['true', 'false'].includes(value)) {
      output.set(key, value)
    } else if (['pagination[page]', 'pagination[pageSize]'].includes(key)) {
      const maximum = key === 'pagination[page]' ? 1000 : 50
      if (!/^[1-9]\d*$/.test(value) || Number(value) > maximum) throw new Error('Invalid pagination')
      output.set(key, value)
    } else {
      throw new Error('Unsupported query parameter')
    }
  }
  if (![...seen].some((key) => key.startsWith('fields['))) {
    policy.fields.forEach((field, index) => output.set(`fields[${index}]`, field))
  }
  output.set('status', 'published')
  if (!output.has('pagination[pageSize]')) output.set('pagination[pageSize]', '10')
  if (!output.has('pagination[page]')) output.set('pagination[page]', '1')
  return output
}
