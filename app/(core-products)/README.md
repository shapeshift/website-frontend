# Core Products Directory

This directory contains all product-related pages and components for ShapeShift's core offerings.

## Directory Structure

- **_components/**: Shared components used across all core product pages
  - Product heroes, stats displays, background images, etc.
  - Utility functions and constants for product data fetching
- **defi-wallet/**: DeFi wallet product page
- **earn/**: Yield-earning opportunities product page
- **mobile-app/**: Mobile application product page 
- **trade/**: Trading platform product page

## Route Convention

The parentheses in the directory name `(core-products)` indicate a route group in Next.js. This means:
- The folder name itself doesn't affect URL paths
- All pages inside share UI layouts and features
- It keeps related features organized without affecting the URL structure

## Component Integration

The components in this directory are designed to:
- Integrate with the main layout defined in the app root
- Share consistent styling and branding
- Leverage common utilities for product data fetching
- Present each core product with unified UX patterns while highlighting unique features

## Development Guidelines

- Follow the design patterns established in the shared components
- Maintain consistent UI/UX across all product pages
- Use the ProductFetcher utility for data retrieval
- Ensure responsive layouts for all device sizes