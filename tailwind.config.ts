import type {Config} from 'tailwindcss';

export default {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		container: {
			screens: {
				xl: '1400px'
			}
		},
		extend: {
			fontSize: {
				h1: '72px'
			},
			leading: {
				h1: '72px'
			},
			colors: {
				white: '#FFFFFF',
				bg: '#0C0D0F',
				headerBg: '#0C0D0FF2',
				secondBg: '#101114',
				secondHoverBg: '#16181C',
				stoke: '#12141A',
				blue: '#386FF9',
				blueHover: '#1A5BFF',
				secondary: '#E6E6E6'
			}
		}
	},
	plugins: []
} satisfies Config;
