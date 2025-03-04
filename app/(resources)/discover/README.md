# Discover Directory

This directory contains pages that showcase ShapeShift's features, products, and integrations in an exploratory format.

## Directory Structure

- **[slug]/**: Dynamic routes for individual discover feature pages
  - **page.tsx**: Page component for individual feature details
- **layout.tsx**: Layout component shared across all discover pages
- **loading.tsx**: Loading state component for discover pages
- **page.tsx**: Main discover landing/index page

## Features

- **Feature Discovery**: Showcase of ShapeShift's key features and capabilities
- **Interactive Exploration**: Engaging presentation of platform functionality
- **User Education**: Guides and information about using ShapeShift features
- **Dynamic Routing**: Slug-based routing for individual feature pages
- **Loading States**: Dedicated loading component for better UX

## Content Structure

The discover section likely includes:

- Feature highlights and showcases
- Interactive demonstrations
- Visual explanations of complex concepts
- Step-by-step guides for platform features
- Comparison of different platform capabilities
- Integration examples with supported protocols and chains

## Technical Implementation

- Uses Next.js dynamic routing with slug parameters
- Implements consistent layout across discover pages
- Provides loading states for content fetching
- Organizes content for optimal discovery and engagement
- Likely integrates with a CMS for content management

## UI Components

The discover pages utilize specialized components:

- **DiscoverFeature.tsx**: For showcasing individual features
- Custom components for interactive demonstrations
- Visual aids and explanatory graphics

## Development Guidelines

- Create engaging, visually appealing content presentations
- Balance information density with user engagement
- Ensure content is accessible to users with various levels of crypto knowledge
- Optimize for both desktop and mobile viewing experiences
- Use consistent terminology across all discover pages
- Provide clear calls-to-action for users to try featured functionality
- Consider performance when implementing interactive features
- Maintain a logical progression between related discover pages
- Update content regularly to reflect new platform capabilities