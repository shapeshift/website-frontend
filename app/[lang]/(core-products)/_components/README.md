# Core Products Components

This directory contains shared components used across all core product pages within the ShapeShift application.

## Component Files

- **BackgroundImage.tsx**: Background image component used across product pages
- **DownloadButtons.tsx**: Standardized download buttons for apps/extensions
- **ProductFetcher.ts**: Utility for fetching product data from APIs
- **ProductFooterBanner.tsx**: Banner component for product page footers
- **ProductHero.tsx**: Hero component template for product landing pages
- **ProductStats.tsx**: Component for displaying product statistics
- **TradeHero.tsx**: Specialized hero component for the trading product
- **constants.ts**: Shared constants used across product components
- **fetchUtils.ts**: Utility functions for data fetching

## Purpose

The `_components` directory contains UI components and utilities that are:

- Shared across multiple product pages
- Specific to the core products section
- Designed for consistency across different product offerings
- Not meant to be used outside the core products route group

## Design Patterns

These components follow consistent patterns:

- Consistent API interfaces for similar components
- Shared styling and branding elements
- Responsive design across all device sizes
- Clear separation between data fetching and presentation

## Usage Guidelines

When using or adding to this directory:

- Maintain consistency with existing component styles
- Follow established naming conventions
- Keep components focused on a single responsibility
- Leverage shared constants and utilities
- Ensure proper TypeScript typing for props
- Document component APIs with JSDoc comments

## Special Considerations

- **Product Data**: The ProductFetcher handles data retrieval for product information
- **Hero Components**: Multiple hero variants exist for different product types
- **Stats Display**: ProductStats presents metrics in a standardized format
- **Image Handling**: BackgroundImage provides optimized image loading