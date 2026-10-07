import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { publicContentQuery } from './query'

test('forces published content even when status is omitted', () => {
  const query = publicContentQuery('posts', new URLSearchParams())
  assert.equal(query.get('status'), 'published')
  assert.equal(query.get('pagination[pageSize]'), '10')
  assert.equal(query.get('fields[0]'), 'slug')
})

test('rejects draft, wildcards, nested operators and excessive pagination', () => {
  for (const query of [
    'status=draft',
    'status[$ne]=published',
    'status=published&status=draft',
    'populate=*',
    'populate[0]=author.privateProfile',
    'fields[0]=privateNotes',
    'filters[$or][0][publishedAt][$null]=true',
    'pagination[pageSize]=1000000',
    'pagination[pageSize]=-1',
    'pagination[start]=999999999',
    'pagination[page]=1001',
  ])
    assert.throws(() => publicContentQuery('posts', new URLSearchParams(query)), query)
})

test('preserves the public post, support, newsroom, notification and FAQ queries', () => {
  for (const [collection, query] of [
    [
      'posts',
      'populate[0]=featuredImg&fields[0]=slug&sort[0]=isFeatured:desc&sort[1]=id:desc&filters[tags][$contains]=DeFi',
    ],
    ['support-articles', 'fields[0]=content&filters[slug][$eq]=recover-wallet&sort[0]=publishedAt:desc'],
    ['newsrooms', 'fields[14]=author&sort[0]=publishedOn:asc&filters[category][$contains]=Press'],
    ['notification', 'populate[0]=bgImage'],
    ['faq', 'populate[0]=faqSection&populate[1]=faqSection.faqSectionItem&locale=en'],
  ])
    assert.equal(publicContentQuery(collection, new URLSearchParams(query)).get('status'), 'published')
})

test('query permissions are collection-specific', () => {
  assert.throws(() => publicContentQuery('notification', new URLSearchParams('populate[0]=featuredImg')))
  assert.throws(() => publicContentQuery('support-articles', new URLSearchParams('filters[type][$contains]=foo')))
})
