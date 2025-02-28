/********************************************************************************************
 * Registry of all available section components
 * Makes it easy to add new section types and maintain the codebase
 ********************************************************************************************/

import CardsRow from '../strapi-sections/cards-row/CardsRow';
import Grid from '../strapi-sections/products/Grid';
import GridDisplaced from '../strapi-sections/products/GridDisplaced';
import GridLadder from '../strapi-sections/products/GridLadder';
import Hero from '../strapi-sections/products/Hero';

export const sections = {
	hero: Hero,
	cardsRow: CardsRow,
	gridLadder: GridLadder,
	grid: Grid,
	gridDisplaced: GridDisplaced
} as const;

export type TSectionType = keyof typeof sections;
