# Newsroom Directory

This directory contains the newsroom section of the ShapeShift website, featuring company announcements, press releases, and updates.

## Directory Structure

- **(withNavigation)/**: Newsroom pages that include navigation elements
  - **categories/**: Category-based news filtering
    - **[category]/**: Dynamic routes for news categories
  - **tags/**: Tag-based news filtering
    - **[tag]/**: Dynamic routes for news tags
  - **layout.tsx**: Layout for newsroom pages with navigation
  - **page.tsx**: Main newsroom landing page
- **[slug]/**: Individual news post pages
  - **layout.tsx**: Layout for individual news posts
  - **page.tsx**: Page component for individual news posts

## Features

- **News Organization**: Posts organized by categories and tags
- **Dynamic Routing**: Slug-based routing for individual news items
- **Navigation Components**: Consistent navigation with breadcrumbs and filters
- **Latest News Showcase**: Featured and recent news items
- **News Archives**: Historical news organized chronologically

## Technical Implementation

- Uses Next.js dynamic routing for categories, tags, and post slugs
- Implements dedicated layout for consistent newsroom section UI
- Shares structure similar to the blog section but with news-specific content
- Utilizes components from the _components directory:
  - **NewsroomBreadcrumb.tsx**: Breadcrumb navigation for newsroom
  - **NewsroomNav.tsx**: Main navigation for newsroom section
  - **NewsroomTitle.tsx**: Title component for newsroom content

## Content Types

The newsroom likely contains various types of content:

- Press releases
- Product announcements
- Company updates
- Industry insights
- Partnership announcements
- Regulatory updates
- Community news

## Data Flow

- News content appears to be fetched from an external CMS
- Content is likely cached for performance (see contexts/CachedNews.tsx)
- The structure supports both listing and detailed views
- Components handle loading states and error conditions

## Development Guidelines

- Follow established patterns for news content presentation
- Maintain consistent metadata for SEO optimization
- Ensure proper date formatting for news items
- Consider time-sensitive nature of news content
- Implement proper loading states for content fetching
- Optimize images for faster loading
- Maintain mobile-responsive design
- Keep navigation intuitive for browsing news archives