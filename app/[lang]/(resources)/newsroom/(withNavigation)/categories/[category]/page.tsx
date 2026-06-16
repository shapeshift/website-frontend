import { notFound } from 'next/navigation'

import { ListOfPosts } from '@/app/[lang]/(resources)/newsroom/(withNavigation)/categories/[category]/ListOfPosts'
import { strapiServerFetch } from '@/app/[lang]/_utils/strapiServer'

export default async function BlogCategoriesPage(props: {
  params: Promise<{ category: string }>
}): Promise<React.ReactNode> {
  const { category } = await props.params
  const data = await strapiServerFetch(
    `newsrooms?filters[category][$contains]=${encodeURIComponent(category)}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc&pagination[pageSize]=1`
  )
  const { data: posts } = await data.json()

  if (!posts) {
    return notFound()
  }

  return <ListOfPosts category={category} />
}
