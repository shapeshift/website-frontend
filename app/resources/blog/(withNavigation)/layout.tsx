import {BlogBreadcrumb} from '@/app/resources/blog/(withNavigation)/BlogBreadcrumb';
import {BlogNav} from '@/app/resources/blog/(withNavigation)/BlogNav';
import {BlogTitle} from '@/app/resources/blog/(withNavigation)/BlogTitle';

export default async function BlogPageLayout(props: {
	children: React.ReactNode;
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	await props.params;

	return (
		<main className={'container mx-auto mt-32 px-4 py-8'}>
			<BlogBreadcrumb />
			<BlogTitle />
			<BlogNav />
			{props.children}
		</main>
	);
}
