# Terms Directory

This directory contains legal documents and terms-related pages for the ShapeShift platform.

## Directory Structure

- **_components/**: Shared components used for displaying legal content
  - `TermsAccordion.tsx`: Collapsible sections for terms content
  - `TermsMarkdown.tsx`: Component for rendering markdown legal content
  - `TermsPage.tsx`: Layout template for all terms pages
  - `terms.module.css`: Specific styling for terms content
  - `utils.ts`: Helper functions for terms pages
- **privacy-policy/**: Privacy policy page
- **terms-of-service/**: Terms of service page
- **error.tsx**: Error handling for terms pages
- **layout.tsx**: Shared layout for all terms pages
- **loading.tsx**: Loading state for terms pages

## Route Convention

The parentheses in the directory name `(terms)` indicate a route group in Next.js. This means:
- The folder name itself doesn't affect URL paths
- All pages inside share UI layouts and features
- It keeps related legal content organized without affecting the URL structure

## Content Rendering

The components in this directory are designed to:
- Present legal content in a clean, readable format
- Support markdown formatting for easy content updates
- Provide consistent styling across all legal documents
- Offer collapsible sections for better user experience with lengthy legal text

## Special Considerations

- Legal content requires careful formatting and presentation
- The accordion component helps make dense legal text more digestible
- Error and loading states are provided for a complete user experience
- Custom styling ensures legal content is properly formatted and readable

## Development Guidelines

- Maintain strict formatting for legal content
- Ensure all legal pages share consistent structure
- Test thoroughly after any changes to legal document components
- Coordinate with legal team before updating content
- Preserve proper heading hierarchy for accessibility