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
		small: {url: string; width: number; height: number};
		medium: {url: string; width: number; height: number};
		large: {url: string; width: number; height: number};
	};
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
};

// Component types
export type THeroSection = {
	id: number;
	title: string;
	description: string;
	stats: TStat[];
	featuredImg: TStrapiImage;
	buttonDownload: TButton[];
	buttonCta: TButton;
};

export type TCardsRowSection = {
	id: number;
	title: string;
	blockCta: TButton | null;
	cards: TCard[];
};

export type TGridDisplacedSection = {
	id: number;
	title: string;
	cards: TCard[];
};

export type TFooterSection = {
	id: number;
	title: string;
	cta: string;
	imageBg: TStrapiImage;
	buttonDownload: TButton[];
	buttonCta: TButton;
};

export type TPageData = {
	id: number;
	documentId: string;
	slug: string;
	hero?: THeroSection;
	cardsRow?: TCardsRowSection;
	grid?: any;
	gridLadder?: any;
	gridDisplaced?: TGridDisplacedSection;
	footer?: TFooterSection;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};
