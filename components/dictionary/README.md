# Text Dictionaries

This directory contains centralized text constants used throughout the application. Each dictionary file is responsible for a specific domain or feature area.

## Available Dictionaries

### `products.ts`

Contains text related to product features and descriptions:

- Header text
- Product descriptions
- CTA buttons
- Product-specific messaging

### `resources.ts`

Contains text for the resources section:

- Discover page text
- FAQ page text and metadata
- Resources expand section text

### `dao.ts`

Contains text for DAO-related features:

- FOX token information
- DAO expand section text
- Power features descriptions

## Usage Guidelines

1. **Adding New Text**

    - Add new text constants to the appropriate dictionary file
    - Follow the existing structure and naming conventions
    - Use camelCase for property names
    - Add TypeScript types when necessary

2. **Using Text Constants**

    ```typescript
    import {PRODUCTS_DICT} from '@/components/dictionary/products';

    function MyComponent() {
        return (
            <h1>{PRODUCTS_DICT.header.title}</h1>
        );
    }
    ```

## Example

```typescript
// dictionary/example.ts
export const EXAMPLE_DICT = {
    section: {
        title: 'Section Title',
        description: 'Section description text',
        buttons: {
            primary: 'Click Me',
            secondary: 'Learn More'
        }
    }
} as const;

// Component usage
import {EXAMPLE_DICT} from '@/components/dictionary/example';

function ExampleComponent() {
    return (
        <section>
            <h1>{EXAMPLE_DICT.section.title}</h1>
            <p>{EXAMPLE_DICT.section.description}</p>
            <button>{EXAMPLE_DICT.section.buttons.primary}</button>
        </section>
    );
}
```
