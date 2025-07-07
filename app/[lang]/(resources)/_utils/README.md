# Resources Utils

This directory contains utility functions and constants specific to the resources section of the ShapeShift application.

## Files

- **constants.ts**: Shared constants used across the resources section
- **fetchUtils.ts**: Utility functions for fetching resource data

## Purpose

These utilities provide:

- Consistent data fetching patterns for resource content
- Shared constants to maintain uniformity across the resources section
- Helper functions specific to resource-related operations
- Separation of data handling logic from UI components

## Usage

The utilities in this directory are designed to be:

- Used by components within the resources section
- Focused on resource-specific functionality
- Maintained separately from application-wide utilities
- Imported directly by components needing resource data

## Data Fetching Patterns

The `fetchUtils.ts` file likely contains:

- Functions for fetching blog posts
- Methods for retrieving newsroom content
- Utilities for getting chain and protocol information
- API interaction helpers for resources content
- Error handling for resource data fetching

## Constants

The `constants.ts` file likely contains:

- API endpoints for resources
- Configuration values for resource fetching
- Shared constants for content rendering
- Default values for resource components
- Enumeration types specific to resources

## Development Guidelines

When working with these utilities:

- Maintain consistent error handling patterns
- Keep fetching functions pure when possible
- Document return types and parameters clearly
- Consider caching strategies for frequently used data
- Follow established naming conventions
- Ensure proper TypeScript typing for all exports
