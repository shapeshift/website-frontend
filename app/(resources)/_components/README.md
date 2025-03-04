# Resources Components

This directory contains shared components used across the resources section of the ShapeShift application.

## Component Files

### Resource Structure Components
- **ResourceCard.tsx**: Card component for displaying resource items
- **ResourceGrid.tsx**: Grid layout for arranging resource cards
- **ResourceHeader.tsx**: Header component for resource pages
- **ResourceHero.tsx**: Hero component for resource section landing pages

### Blog & Newsroom Components
- **BlogBreadcrumb.tsx**: Breadcrumb navigation for blog pages
- **NewsroomBreadcrumb.tsx**: Breadcrumb navigation for newsroom pages
- **NewsroomNav.tsx**: Navigation component for newsroom
- **NewsroomTitle.tsx**: Title component for newsroom content
- **PostList.tsx**: Component for listing blog or news posts

### Chain & Protocol Components
- **ChainList.tsx**: Component for displaying supported blockchain networks
- **ProtocolAbout.tsx**: About section for protocol pages
- **ProtocolEasier.tsx**: Component highlighting protocol ease of use
- **ProtocolFeatures.tsx**: Features section for protocol pages
- **ProtocolHeader.tsx**: Header component for protocol pages
- **ProtocolList.tsx**: List component for displaying protocols

### Wallet Components
- **SupportedWalletAccelerate.tsx**: Component for wallet acceleration features
- **SupportedWalletHeader.tsx**: Header component for wallet pages
- **SupportedWalletHero.tsx**: Hero component for wallet section
- **WalletList.tsx**: Component for displaying supported wallets

### Feature & Discovery Components
- **DiscoverFeature.tsx**: Component for highlighting discover features
- **SupportedChainTable.tsx**: Table component for displaying chain support details

### FAQ Components
- **FAQContent.tsx**: Component for rendering FAQ content
- **FAQNavigation.tsx**: Navigation component for FAQ sections

## Purpose

These components provide:
- Consistent UI across all resource pages
- Reusable layouts and design patterns
- Standardized presentation of various content types
- Clear separation of concerns between different resource categories

## Usage Guidelines

When using or adding to this directory:
- Group related components by resource type
- Maintain consistent naming conventions
- Ensure proper props typing and documentation
- Follow established design patterns
- Consider responsive behavior for all components
- Optimize components for content rendering performance

## Special Considerations

- Most components expect data from CMS or API sources
- Component naming reflects its primary purpose and content type
- Navigation components handle both desktop and mobile layouts
- List and grid components handle both loading and error states