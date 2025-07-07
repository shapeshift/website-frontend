import {notFound} from 'next/navigation';

import {ListOfPosts} from '@/app/[lang]/(resources)/blog/(withNavigation)/categories/[category]/ListOfPosts';

export default async function BlogCategoriesPage(props: {
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	const {category} = await props.params;
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?filters[type][$contains]=${category}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc&pagination[pageSize]=1`,
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

	return <ListOfPosts category={category} />;
}
