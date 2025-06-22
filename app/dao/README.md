# DAO Directory

This directory contains pages related to ShapeShift DAO (Decentralized Autonomous Organization), governance, and FOX token.

## Directory Structure

- **docs/**: Documentation and resources for DAO participants
- **forum/**: Link to or integration with the DAO's forum/discussion platform
- **fox-token/**: Information about the FOX token, its utility and tokenomics
- **governance/**: Details about governance processes, proposals, and voting
- **page.tsx**: Main DAO landing page that introduces the ShapeShift DAO

## Features

This section covers key aspects of ShapeShift's decentralized governance model:

- **DAO Introduction**: Overview of ShapeShift's transition to a DAO structure
- **Governance Process**: How proposals and voting work within the DAO
- **FOX Token**: Information about the governance token, including utility and distribution
- **Community Participation**: How users can get involved in governance

## Integration Points

The DAO section integrates with:

- ShapeShift's governance platform
- FOX token statistics and metrics
- External governance forums and tools
- Documentation resources

## Development Guidelines

- Ensure governance data is presented clearly and accurately
- Create intuitive navigation between DAO-related resources
- Provide up-to-date information about DAO proposals and votes
- Include clear calls-to-action for community participation
- Ensure token information is accurate and regularly updated
- Maintain proper accessibility for governance tools
- Design mobile-responsive interfaces for all DAO pages

## Customizing the FOX Token Page

To modify the content on the DAO **FOX Token** page, you can update the following constants in the `components/constants.tsx` file:

### Page Titles and Descriptions

- `foxTokenTitleWhite` - White portion of the main title
- `foxTokenTitleBlue` - Blue portion of the main title
- `foxTokenDescription` - Main description text
- `foxTokenDescriptionNote` - Note displayed below the description

### Section Content

- `section1Title` - "How do I Participate?" section heading
- `section1Description` - Participation description text
- `section2Title` - "How is a DAO different..." section heading
- `section2Article1` - First paragraph of section 2
- `section2Article2` - Second paragraph of section 2
- `benefitsTitle` - Title for the benefits section

### Lists and Collections

- `foxTokenBenefits` - Array of benefit items with titles and icons
- `foxTokenContributeItems` - Contribution and governance links

### Additional Section Titles

- `resourcesTitle` - Title for the resources section
- `communityTitle` - Title for the community section

After updating these constants, the changes will automatically reflect on the FOX Token page.
