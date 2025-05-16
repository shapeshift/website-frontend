# Supported Wallets Directory

This directory contains pages that showcase and document the cryptocurrency wallets integrated with ShapeShift.

## Directory Structure

- **[slug]/**: Dynamic routes for individual wallet pages
  - **page.tsx**: Page component for individual wallet details
- **layout.tsx**: Layout component for all supported wallets pages
- **loading.tsx**: Loading state component for supported wallets pages
- **page.tsx**: Main supported wallets landing page

## Features

- **Wallet Overview**: Comprehensive list of all supported wallet types
- **Individual Wallet Pages**: Detailed information about each supported wallet
- **Dynamic Routing**: Slug-based routing for individual wallet pages
- **Loading States**: Dedicated loading component for better UX

## Content Structure

Individual wallet pages likely include:

- Wallet introduction and overview
- Integration details with ShapeShift
- Security features and considerations
- Supported chains and tokens
- Setup and connection instructions
- Unique features and capabilities
- Hardware vs. software distinctions (where applicable)
- Usage guides and examples

## Technical Implementation

- Uses Next.js dynamic routing with slug parameters
- Implements consistent layout across wallet pages
- Provides loading states while content loads
- Likely fetches wallet data from an API or CMS
- Organizes content for optimal SEO and discoverability

## UI Components

The wallet pages utilize specialized components from the `_components` directory:

- **SupportedWalletAccelerate.tsx**: For highlighting wallet acceleration features
- **SupportedWalletHeader.tsx**: For consistent wallet page headers
- **SupportedWalletHero.tsx**: For hero sections on wallet pages
- **WalletList.tsx**: For displaying the list of supported wallets

## Development Guidelines

- Maintain consistent information architecture across all wallet pages
- Ensure accurate and up-to-date technical information
- Include clear wallet connection instructions
- Provide visual elements to enhance understanding (screenshots, diagrams)
- Differentiate between hardware, software, and mobile wallets
- Highlight security considerations for different wallet types
- Consider performance when loading wallet-specific resources
- Ensure all wallet information is properly categorized and searchable
- Update content when wallet support changes or is enhanced
- Coordinate with wallet development teams for accurate representation
- Include troubleshooting tips for common connection issues