import type {Config} from 'tailwindcss';

export default {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				bg: '#0C0D0F',
				'bg-header': '#0C0D0FF2',
				'second-bg': '#101114',
				'second-hover': '#16181C',
				stoke: '#12141A',
				text: '#E6E6E6',
				button: '#386FF9',
				'button-hover': '#1A5BFF'
			}
		}
	},
	plugins: []
} satisfies Config;
