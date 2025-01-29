/********************************************************************************************
 * Registry of all available section components
 * Makes it easy to add new section types and maintain the codebase
 ********************************************************************************************/

import CardsRow from '../strapi-sections/CardsRow';
import Footer from '../strapi-sections/Footer';
import Grid from '../strapi-sections/Grid';
import GridDisplaced from '../strapi-sections/GridDisplaced';
import GridLadder from '../strapi-sections/GridLadder';
import Hero from '../strapi-sections/Hero';

export const sections = {
	hero: Hero,
	cardsRow: CardsRow,
	gridLadder: GridLadder,
	grid: Grid,
	gridDisplaced: GridDisplaced,
	footer: Footer
} as const;

export type TSectionType = keyof typeof sections;
