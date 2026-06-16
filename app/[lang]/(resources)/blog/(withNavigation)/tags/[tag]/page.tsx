import { notFound } from 'next/navigation'

import { ListOfPosts } from '@/app/[lang]/(resources)/blog/(withNavigation)/tags/[tag]/ListOfPosts'
import { strapiServerFetch } from '@/app/[lang]/_utils/strapiServer'

export default async function BlogTagsPage(props: { params: Promise<{ tag: string }> }): Promise<React.ReactNode> {
  const { tag } = await props.params
  const data = await strapiServerFetch(
    `posts?filters[tags][$contains]=${encodeURIComponent(tag)}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc`
  )
  const { data: posts } = await data.json()

  if (!posts) {
    return notFound()
  }

  return <ListOfPosts tag={tag} />
}
