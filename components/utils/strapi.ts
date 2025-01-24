/********************************************************************************************
 * Registry of all available section components
 * Makes it easy to add new section types and maintain the codebase
 ********************************************************************************************/

import Hero from '../strapi-sections/Hero';

export const sections = {
	hero: Hero
	// cards_row: CardsRow,
	// grid_displaced: GridDisplaced,
	// footer: Footer
} as const;

export type TSectionType = keyof typeof sections;
