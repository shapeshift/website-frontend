# ShapeShift Web App

This is the root directory of the ShapeShift web application built with Next.js. The app uses Next.js file-system based routing conventions.

## Directory Structure

- **(core-products)**: Contains product-related pages and components (DeFi wallet, earn, mobile app, trade)
- **(resources)**: Resources section including blog, newsroom, FAQ, and supported chains/protocols/wallets
- **(terms)**: Legal documents like privacy policy and terms of service
- **dao**: Pages related to ShapeShift DAO, governance, FOX token, and docs
- **_utils**: Shared utility functions used across the application

## Key Files

- `layout.tsx`: Main layout wrapper for the entire application
- `page.tsx`: Homepage component
- `metadata.ts`: SEO metadata configuration
- `globals.css`: Global CSS styles
- Various image assets for icons, OpenGraph, and Twitter cards

## Development Guidelines

- Follow Next.js App Router conventions
- See CLAUDE.md in the root directory for code style guidelines
- Implement responsive design with Tailwind CSS using mobile-first approach
- Optimize for Web Vitals (LCP, CLS, FID)