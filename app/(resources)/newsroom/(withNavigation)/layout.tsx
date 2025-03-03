import {NewsroomBreadcrumb} from '@/app/(resources)/_components/NewsroomBreadcrumb';
import {NewsroomNav} from '@/app/(resources)/_components/NewsroomNav';
import {NewsroomTitle} from '@/app/(resources)/_components/NewsroomTitle';

export default async function BlogPageLayout(props: {
	children: React.ReactNode;
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	await props.params;

	return (
		<main className={'container mx-auto mt-32 py-8'}>
			<NewsroomBreadcrumb />
			<NewsroomTitle />
			<NewsroomNav />
			{props.children}
		</main>
	);
}
