import Link from 'next/link';
import {notFound} from 'next/navigation';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {IconBack} from '@/components/common/icons/IconBack';

import type {TBlogPost} from '@/types/strapi';

export default async function BlogTagsPage({params}: {params: {tag: string}}): Promise<React.ReactNode> {
	const tag = await params.tag;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/posts?filters[tags][$contains]=${tag}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=imageFeatured&sort[0]=publishedAt:desc`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const {data: posts} = await data.json();

	if (!posts) {
		return notFound();
	}

	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<Link
				className={'mb-6 flex items-center gap-1 px-4 py-2 text-gray-500'}
				href={'/resources/blog'}>
				<IconBack />
				<span>{'Back to blog'}</span>
			</Link>
			<div className={'mb-8 text-7xl'}>
				<span className={'text-white'}>{'Tagged: '}</span>
				&nbsp;
				<span className={'text-blue'}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
			</div>

			{posts.length === 0 ? (
				<p className={'my-20 text-center text-2xl text-gray-400'}>
					{"We couldn't find any blog posts matching your criteria."}
				</p>
			) : (
				<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
					{posts.map((post: TBlogPost) => (
						<BlogPost
							key={post.documentId}
							post={post}
							className={'!bg-stroke'}
						/>
					))}
				</div>
			)}

			<Banner />
		</main>
	);
}
