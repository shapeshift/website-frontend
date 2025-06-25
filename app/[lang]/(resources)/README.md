# Resources Directory

This directory contains all resource-related pages and components including blog, newsroom, documentation, and support materials.

## Directory Structure

- **\_components/**: Shared components used across all resource pages
    - Resource cards, grids, headers, heroes, navigation components
    - Chain and wallet list displays, protocol information components
- **\_utils/**: Utility functions and constants specific to resources
- **blog/**: Blog posts and category/tag navigation
    - **(withNavigation)/**: Blog pages with navigation elements
    - **[slug]/**: Individual blog post pages
- **discover/**: Discovery pages for features and products
- **faq/**: Frequently asked questions page
- **newsroom/**: News and announcements
    - **(withNavigation)/**: Newsroom with navigation elements
    - **[slug]/**: Individual news post pages
- **chains/**: Pages documenting supported blockchain networks
- **protocols/**: Pages documenting supported protocols
- **wallets/**: Pages documenting supported wallet integrations

## Route Convention

The parentheses in the directory name `(resources)` indicate a route group in Next.js. This means:

- The folder name itself doesn't affect URL paths
- All pages inside share UI layouts and features
- It keeps related content organized without affecting the URL structure

## Component Integration

The components in this directory are designed to:

- Present content in a consistent, well-structured format
- Support a content-first approach with clean typography
- Enable easy navigation between related resources
- Scale well for both small and large amounts of content

## Content Management

- Blog and newsroom content appears to be managed via an external CMS
- Supported chains, protocols, and wallets use dynamic routes with slugs
- FAQ content is structured for easy updates and maintenance

## Development Guidelines

- Follow established patterns for new resource pages
- Maintain consistent styling across all content types
- Leverage shared components from \_components directory
- Ensure proper SEO metadata for all resource pages
- Implement proper loading states for dynamic content
