/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 ** Schema.org JSON-LD Generator
 ** Utility functions to generate structured data for better SEO and rich snippets
 ** Supports blog posts, product pages, and organization schema
 ************************************************************************************************/

import type { TBlogPost, TSupportArticle } from "@/components/strapi/types";

// Base organization data
const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "ShapeShift",
	url: "https://shapeshift.com",
	logo: "https://shapeshift.com/icon.png",
	sameAs: [
		"https://twitter.com/ShapeShift",
		"https://discord.com/invite/shapeshift",
	],
};

/**
 * Generate Article schema for blog posts
 */
export function generateBlogPostSchema(
	post: TBlogPost,
	baseUrl: string,
): Record<string, any> {
	// Ensure we have required fields
	if (!post?.title || !post.slug) {
		return {};
	}

	const postUrl = `${baseUrl}/blog/${post.slug}`;
	const imageUrl = post.featuredImg?.url
		? `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.shapeshift.com"}${post.featuredImg.url}`
		: `${baseUrl}/opengraph-image.png`;

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.summary || "",
		image: imageUrl,
		url: postUrl,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			"@type": "Organization",
			name: "ShapeShift",
			url: baseUrl,
		},
		publisher: organizationSchema,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": postUrl,
		},
		keywords: post.tags?.join(", ") || "",
		articleSection: post.type?.[0] || "General",
	};
}

/**
 * Generate Product schema for product pages
 */
export function generateProductSchema({
	title,
	description,
	featuredImage,
	pageURL,
	features = [],
}: {
	title: string;
	description: string;
	featuredImage?: string;
	pageURL: string;
	features?: { title: string; description: string }[];
}): Record<string, any> {
	// Ensure we have required fields
	if (!title || !pageURL) {
		return {};
	}

	const productID = pageURL.split("/").pop() || "shapeshift-product";
	const image =
		featuredImage ||
		`${process.env.NEXT_PUBLIC_SITE_URL || "https://shapeshift.com"}/opengraph-image.png`;

	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		id: productID,
		name: title,
		description: description || "",
		image: image,
		url: pageURL,
		applicationCategory: "FinanceApplication",
		operatingSystem: "Web, Android, iOS",
		author: organizationSchema,
		publisher: organizationSchema,
		...(features.length > 0 && {
			featureList: {
				"@type": "ItemList",
				itemListElement: features.map((feature, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: feature.title,
					description: feature.description,
				})),
			},
		}),
	};
}

/**
 * Generate Article schema for support articles
 */
export function generateSupportArticleSchema(
	article: TSupportArticle,
	baseUrl: string,
): Record<string, any> {
	if (!article?.title || !article.slug) {
		return {};
	}

	const articleUrl = `${baseUrl}/support/${article.slug}`;
	const imageUrl = article.featuredImg?.url
		? `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.shapeshift.com"}${article.featuredImg.url}`
		: `${baseUrl}/opengraph-image.png`;

	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: article.title,
		description: article.summary || "",
		image: imageUrl,
		url: articleUrl,
		datePublished: article.publishedAt,
		dateModified: article.updatedAt || article.publishedAt,
		author: organizationSchema,
		publisher: organizationSchema,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": articleUrl,
		},
	};
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebsiteSchema(baseUrl: string): Record<string, any> {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "ShapeShift",
		url: baseUrl,
	};
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): Record<string, any> {
	return organizationSchema;
}
