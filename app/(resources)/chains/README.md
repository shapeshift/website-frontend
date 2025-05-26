# Supported Chains Directory

This directory contains pages that showcase and document the blockchain networks supported by ShapeShift.

## Directory Structure

- **[slug]/**: Dynamic routes for individual chain pages
  - **page.tsx**: Page component for individual chain details
- **layout.tsx**: Layout component for all supported chains pages
- **loading.tsx**: Loading state component for supported chains pages
- **page.tsx**: Main supported chains landing page

## Features

- **Chain Overview**: Comprehensive list of all supported blockchain networks
- **Individual Chain Pages**: Detailed information about each supported chain
- **Dynamic Routing**: Slug-based routing for individual chain pages
- **Loading States**: Dedicated loading component for better UX

## Content Structure

Individual chain pages likely include:

- Chain introduction and overview
- Technical specifications and features
- Integration details with ShapeShift
- Usage guides and examples
- Token support information
- Special features or limitations

## Technical Implementation

- Uses Next.js dynamic routing with slug parameters
- Implements consistent layout across chain pages
- Provides loading states while content loads
- Likely fetches chain data from an API or CMS
- Organizes content for optimal SEO and discoverability

## UI Components

The chain pages utilize specialized components from the `_components` directory:

- **ChainList.tsx**: For displaying the list of supported chains
- **SupportedChainTable.tsx**: For presenting detailed chain support information

## Development Guidelines

- Maintain consistent information architecture across all chain pages
- Ensure accurate and up-to-date technical information
- Include clear integration instructions for developers
- Provide visual elements to enhance understanding (logos, diagrams)
- Optimize for both technical and non-technical audiences
- Consider performance when loading chain-specific resources
- Ensure all chain information is properly categorized and searchable
- Update content when chain support details change