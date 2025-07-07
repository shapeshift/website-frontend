# Terms Components

This directory contains specialized components for rendering legal content and terms pages in the ShapeShift application.

## Component Files

- **TermsAccordion.tsx**: Collapsible accordion component for organizing legal content sections
- **TermsMarkdown.tsx**: Component for rendering markdown-formatted legal content
- **TermsPage.tsx**: Layout template used across all terms-related pages
- **terms.module.css**: CSS module with styles specific to terms components
- **utils.ts**: Helper functions for terms components

## Purpose

These components provide:

- Consistent styling and layout for all legal content
- Optimized rendering of markdown legal documents
- Standardized UI patterns for presenting terms and policies
- Accessible presentation of dense legal information
- Clear separation between content and presentation

## Design Patterns

The components follow these design principles:

- Content organization through collapsible sections
- Clean typography optimized for readability of legal text
- Consistent styling across all legal documents
- Accessibility-focused design for complex content
- Responsive layouts for all device sizes

## Usage Guidelines

When using or modifying these components:

- Maintain consistent structure across all legal pages
- Ensure proper heading hierarchy for accessibility
- Follow established styling patterns
- Preserve proper formatting of legal content
- Consider the user experience when presenting dense information
- Test thoroughly across different device sizes

## Special Considerations

- **Legal Accuracy**: Components must render legal content exactly as intended
- **Accessibility**: Legal content requires careful attention to accessibility standards
- **Responsive Design**: Content must be readable on all device sizes
- **Performance**: Markdown rendering should be optimized for large documents
- **Versioning**: Consider how to handle legal document updates and versioning

## CSS Module

The `terms.module.css` file contains specialized styles that:

- Enhance readability of legal text
- Provide proper spacing for dense content
- Style the accordion components appropriately
- Ensure responsive behavior
- Maintain consistent typography throughout legal documents