# ShapeShift Web App

This is the root directory of the ShapeShift web application built with Next.js. The app uses Next.js file-system based routing conventions.

## Directory Structure

- **(core-products)**: Contains product-related pages and components (DeFi wallet, earn, mobile app, trade)
- **(resources)**: Resources section including blog, newsroom, FAQ, and supported chains/protocols/wallets
- **(terms)**: Legal documents like privacy policy and terms of service
- **dao**: Pages related to ShapeShift DAO, governance, FOX token, and docs
- **\_utils**: Shared utility functions used across the application

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

## Customizing the Homepage

The homepage content can be easily customized by modifying specific constants in the `components/constants.tsx` file:

### Main Section Text

- `heroTitle` - Main headline text
- `heroDescription` - Descriptive text below the headline

### Feature Section Titles

- `homepageWhiteTitle` - White portion of the dual-color title
- `homepageBlueTitle` - Blue portion of the dual-color title
- `featuresTitle` - Title for the features section
- `featureTabTitle` - Title for the feature tabs section

### Feature Cards Text

- `featureCard1WhiteTitle` / `featureCard1BlueTitle` - First feature card title (white/blue parts)
- `featureCard3WhiteTitle` / `featureCard3BlueTitle` - Third feature card title (white/blue parts)
- `featureCard4WhiteTitle` / `featureCard4BlueTitle` - Fourth feature card title (white/blue parts)

### Other Homepage Elements

- To modify the cards in the CardsRow section, update the `landingCards` constant
- To change the feature tabs, modify the `homepageFeatureTabs` array
- To update the auto-scrolling carousel logos, adjust the `carouselLogos` constant

### Updating Images

To replace images while maintaining the current design:

1. Create new image files with the same dimensions as the originals
2. Replace the corresponding files in the `/public` directory using identical filenames
3. Clear your browser cache and refresh the page to see the changes

For optimal image quality, we recommend exporting images at 2x the display size. Please maintain the original aspect ratio when replacing images to ensure proper layout and visual consistency.

## Customizing Common Components

### Banner Component

Modify these constants in `components/constants.tsx` to update the global banner:

- `bannerLeftTitle` - Left section title
- `bannerRightTitle` - Right section title
- `bannerLeftButtonTitle` - Left button text
- `bannerRightButtonTitle` - Right button text
- `bannerMobileSubtitle` - Subtitle displayed on mobile devices

### Other Global Elements

- Header navigation and dropdown menus can be customized by modifying the `headerTabs`, `appResources`, `appProducts`, and `appDao` constants in the constants file. These control the main navigation items and their respective dropdown content.
- Footer links can be customized by updating the `footerLinks` and `footerButtonTitle` constants.
- To modify supported chains and wallets on the Supported Chains page, update the `allWallets` and `supportedChains` constants
