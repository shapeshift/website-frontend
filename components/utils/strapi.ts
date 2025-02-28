/********************************************************************************************
 * Registry of all available section components
 * Makes it easy to add new section types and maintain the codebase
 ********************************************************************************************/

import CardsRow from '../strapi/cards-row/CardsRow';
import Grid from '../strapi/products/Grid';
import GridDisplaced from '../strapi/products/GridDisplaced';
import GridLadder from '../strapi/products/GridLadder';
import Hero from '../strapi/products/Hero';

export const sections = {
	hero: Hero,
	cardsRow: CardsRow,
	gridLadder: GridLadder,
	grid: Grid,
	gridDisplaced: GridDisplaced
} as const;

export type TSectionType = keyof typeof sections;
