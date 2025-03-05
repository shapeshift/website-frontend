# Supported Protocols Directory

This directory contains pages that showcase and document the DeFi protocols integrated with ShapeShift.

## Directory Structure

- **[slug]/**: Dynamic routes for individual protocol pages
  - **page.tsx**: Page component for individual protocol details
- **layout.tsx**: Layout component for all supported protocols pages
- **loading.tsx**: Loading state component for supported protocols pages
- **page.tsx**: Main supported protocols landing page

## Features

- **Protocol Overview**: Comprehensive list of all supported DeFi protocols
- **Individual Protocol Pages**: Detailed information about each integrated protocol
- **Dynamic Routing**: Slug-based routing for individual protocol pages
- **Loading States**: Dedicated loading component for better UX

## Content Structure

Individual protocol pages likely include:

- Protocol introduction and overview
- Integration details with ShapeShift
- Key features and capabilities
- Token and chain support
- Yield opportunities
- Risk considerations
- Usage guides and examples
- Partnership details

## Technical Implementation

- Uses Next.js dynamic routing with slug parameters
- Implements consistent layout across protocol pages
- Provides loading states while content loads
- Likely fetches protocol data from an API or CMS
- Organizes content for optimal SEO and discoverability

## UI Components

The protocol pages utilize specialized components from the `_components` directory:

- **ProtocolAbout.tsx**: For displaying protocol overview information
- **ProtocolEasier.tsx**: For highlighting ease-of-use features
- **ProtocolFeatures.tsx**: For showcasing protocol-specific features
- **ProtocolHeader.tsx**: For consistent protocol page headers
- **ProtocolList.tsx**: For displaying the list of supported protocols

## Development Guidelines

- Maintain consistent information architecture across all protocol pages
- Ensure accurate and up-to-date technical information
- Include clear integration instructions for users
- Provide visual elements to enhance understanding (logos, diagrams)
- Optimize for both technical and non-technical audiences
- Consider performance when loading protocol-specific resources
- Ensure all protocol information is properly categorized and searchable
- Update content when protocol integrations change or are enhanced
- Coordinate with protocol teams for accurate representation
- Include relevant risk disclosures where appropriate