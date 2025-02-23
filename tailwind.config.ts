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
			colors: {
				white: '#FFFFFF',
				bg: '#0C0D0F',
				headerBg: '#0C0D0FF2',
				secondBg: '#101114',
				secondHoverBg: '#16181C',
				stroke: '#12141A',
				blue: '#386FF9',
				blueHover: '#1A5BFF',
				secondary: '#E6E6E6'
			},
			listStyleType: {
				roman: 'lower-roman',
				latin: 'lower-alpha'
			},
			keyframes: {
				'border-loading': {
					'0%': {clipPath: 'inset(0 0 0 0)'},
					'25%': {clipPath: 'inset(0 0 0 95%)'},
					'50%': {clipPath: 'inset(95% 0 0 95%)'},
					'75%': {clipPath: 'inset(95% 95% 0 0)'},
					'100%': {clipPath: 'inset(0 95% 0 0)'}
				},
				shimmer: {
					'100%': {
						transform: 'translateX(100%)'
					}
				}
			},
			animation: {
				'border-loading': 'border-loading 1.5s infinite linear',
				spin: 'spin 1s linear infinite',
				shimmer: 'shimmer 1.5s infinite'
			}
		}
	},
	plugins: []
} satisfies Config;
