# Blog Directory

This directory contains the blog section of the ShapeShift website, featuring blog posts, categories, and tags.

## Directory Structure

- **(withNavigation)/**: Blog pages that include navigation elements
  - **BlogBreadcrumb.tsx**: Breadcrumb navigation for blog
  - **BlogNav.tsx**: Main navigation for blog section
  - **BlogTitle.tsx**: Title component for blog section
  - **categories/**: Category-based blog post filtering
    - **[category]/**: Dynamic routes for individual categories
  - **tags/**: Tag-based blog post filtering
    - **[tag]/**: Dynamic routes for individual tags
  - **layout.tsx**: Layout for blog pages with navigation
  - **page.tsx**: Main blog landing page
- **[slug]/**: Individual blog post pages
  - **BlogContent.tsx**: Component for rendering blog post content
  - **BlogSkeleton.tsx**: Loading skeleton for blog posts
  - **layout.tsx**: Layout for individual blog posts
  - **page.tsx**: Page component for individual blog posts

## Features

- **Content Organization**: Posts organized by categories and tags
- **Dynamic Routing**: Slug-based routing for individual posts
- **Navigation**: Consistent navigation with breadcrumbs and main nav
- **Loading States**: Skeleton loaders for content while fetching
- **Layouts**: Separate layouts for list views versus individual posts

## Technical Implementation

- Uses Next.js dynamic routing for categories, tags, and post slugs
- Implements dedicated layout for consistent blog section UI
- Provides loading states for better user experience
- Separates navigation elements into dedicated components
- Organizes route structure for efficient SEO and content discovery

## Data Flow

- Blog content appears to be fetched from an external CMS
- Content is likely cached for performance (see contexts/CachedPosts.tsx)
- The structure supports pagination and filtering
- Components handle both successful content fetching and error states

## Development Guidelines

- Follow established naming conventions for new components
- Maintain consistency between list views and detail views
- Ensure proper SEO metadata for all blog pages
- Test loading states and error handling
- Consider performance optimizations for image-heavy blog posts
- Ensure responsive design works across all device sizes
- Preserve consistent typography and styling