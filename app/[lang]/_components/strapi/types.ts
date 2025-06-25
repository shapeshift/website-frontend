/********************************************************************************************
 * Types for Strapi API responses and component structures
 * Each component type corresponds to a section that can be included in a page
 ********************************************************************************************/
export type TStrapiImage = {
	url: string;
	width: number;
	height: number;
	formats: {
		thumbnail: {url: string; width: number; height: number};
		small?: {url: string; width: number; height: number};
		medium?: {url: string; width: number; height: number};
		large?: {url: string; width: number; height: number};
	};
};

export type TDownloadButton = {
	id: number;
	variant: 'appstore' | 'googleplay';
	url: string;
};

export type TButton = {
	id: number;
	title: string;
	url: string;
};

export type TStat = {
	id: number;
	title: string;
	value: string;
};

export type TCard = {
	id: number;
	title: string;
	description: string;
	isTextFirst: boolean;
	image: TStrapiImage;
	href?: string;
	buttonCta?: TButton;
	target?: string;
	items?: {
		url?: string;
		image?: TStrapiImage;
	}[];
};

export type TGridLadderStep = {
	id: number;
	title: string;
	description: string;
	image?: TStrapiImage;
	buttonCta: TButton;
};

export type TCardsRowSection = {
	id: number;
	title: string;
	ctaBlock: TButton | null;
	cards: TCard[];
};

export type TGridSection = {
	id: number;
	card: TCard[];
	cardCta: {
		id: number;
		title: string;
		description: string;
		imageBg?: TStrapiImage;
		buttonCta: TButton;
	}[];
};

export type TGridDisplacedSection = {
	id: number;
	title: string;
	description: string;
	cta: TButton;
	cards: TCard[];
	features: {
		title: string;
		description: string;
		image?: TStrapiImage;
	}[];
};

export type TGridLadderSection = {
	id: number;
	steps: TGridLadderStep[];
};

export type TFooterSection = {
	id: number;
	title: string;
	cta: string;
	imageBg: TStrapiImage;
	buttonDownload: TButton[];
	buttonCta: TButton;
};

/********************************************************************************************
 * Types for Strapi Blog API responses
 * Includes both list and single post interfaces
 ********************************************************************************************/
export type TBlogPost = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	featuredImg: TStrapiImage;
	tags: string[];
	type: string[];
	summary: string;
	isFeatured: boolean;
};

export type TPagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type TBlogListResponse = {
	data: TBlogPost[];
	meta: {
		pagination: TPagination;
	};
};

export type TFaqData = {
	id: number;
	documentId: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	faqSection: TFaqSection[];
};

export type TFaqSection = {
	id: number;
	sectionTitle: string;
	faqSectionItem: TFaqSectionItem[];
};

export type TFaqSectionItem = {
	id: number;
	question: string;
	answer: string;
};

export type TSupportData = {
	id: number;
	supportItems: {
		id: number;
		title: string;
		description?: string;
		href: string;
	}[];
};
export type TSupportedWalletData = {
	id: number;
	documentId: string;
	name: string;
	description: string;
	slug: string;
	featuredImg: TStrapiImage;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	isFeatured: boolean;
};

export type TSupportedChainData = {
	id: number;
	documentId: string;
	name: string;
	description: string;
	slug: string;
	featuredImg: TStrapiImage;
	foxImg: TStrapiImage;
	actions: string[];
	features: string[];
	typeOfChain: TSupportedChainTypes;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type TSupportedProtocolData = {
	id: number;
	documentId: string;
	name: string;
	description: string;
	collabDescription: string;
	slug: string;
	featuredImg: TStrapiImage;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	isFeatured: boolean;
	features: string[];
	cards: {
		title: string;
		description?: string;
	}[];
};

export type TDiscoverData = {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	tag: string;
	type: string;
	featuredImg: TStrapiImage;
	features: TCard[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type TNewsroomPost = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	publishedOn: string;
	featuredImg: TStrapiImage;
	tags: string[];
	category: string[];
	author: string;
	postSummary: string;
	externalURL: string;
};

export type TPrivacyPolicyData = {
	id: number;
	documentId: string;
	policy: {
		id: number;
		title: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		policy: string;
		date: string;
	}[];
};

export type TTermsOfServiceData = {
	id: number;
	documentId: string;
	terms: {
		id: number;
		title: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		policy: string;
		date: string;
	}[];
};

export type TNewsroomListResponse = {
	data: TNewsroomPost[];
	meta: {
		pagination: TPagination;
	};
};

export type TStrapiNotification = {
	id: number;
	title: string;
	description: string;
	href?: string;
	tag?: string;
	type: 'popup' | 'modal' | 'bar';
	enabled: boolean;
	bgImage?: TStrapiImage;
};

export type TSupportedChainTypes = 'EVM' | 'Solana' | 'Bitcoin' | 'Cosmos' | string;

/********************************************************************************************
 * Types for Strapi Article API responses
 * Includes both list and single article interfaces
 ********************************************************************************************/
export type TSupportArticle = {
	id: number;
	documentId: string;
	slug: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	featuredImg: TStrapiImage;
	summary: string;
};

export type TArticleListResponse = {
	data: TSupportArticle[];
	meta: {
		pagination: TPagination;
	};
};
