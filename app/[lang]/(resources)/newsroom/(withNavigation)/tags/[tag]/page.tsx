import {notFound} from 'next/navigation';

import {ListOfPosts} from '@/app/[lang]/(resources)/newsroom/(withNavigation)/tags/[tag]/ListOfPosts';

export default async function NewsroomTagsPage(props: {params: Promise<{tag: string}>}): Promise<React.ReactNode> {
	const {tag} = await props.params;
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsrooms?filters[tags][$contains]=${tag}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
			}
		}
	);
	const {data: posts} = await data.json();

	if (!posts) {
		return notFound();
	}

	return <ListOfPosts tag={tag} />;
}
