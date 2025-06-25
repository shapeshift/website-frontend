# _utils Directory

This directory contains shared utility functions, types, and helpers used across the ShapeShift web application.

## Current Files

- **schema.ts**: Contains shared schema definitions, likely for data validation or TypeScript types

## Purpose

The `_utils` directory at the app level serves as a central location for application-wide utilities that are:

- Used across multiple route groups and pages
- Essential for core application functionality
- Common enough to warrant being accessible from anywhere in the codebase

## Naming Convention

The underscore prefix (`_`) in the directory name follows Next.js conventions to indicate:

- This is not a route directory (will not be accessible as a URL path)
- Contains utility code rather than components or pages
- Is meant for internal application use

## Usage Guidelines

When using or adding to this directory:

- Keep utilities focused and specific in their purpose
- Document functions with clear JSDoc comments
- Avoid placing component-specific logic here
- Maintain proper TypeScript typing for all exports
- Consider performance implications for widely-used utilities
- Group related utilities in logical files
- Export named functions rather than default exports
- Ensure utilities are pure when possible (no side effects)

## When to Use vs. Other Locations

- Use this directory for truly app-wide utilities
- For section-specific utilities, create a _utils directory within that section
- Component-specific utilities should be placed near the component itself

## Schema Utilities

The schema.ts file appears to handle data schemas that are important across the application. These may include:

- TypeScript interface definitions
- Validation schemas (possibly using Zod or similar)
- Data transformation utilities
- Type guards and type assertion functions