/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderColor: (theme) => ({
				...theme('colors'),
				DEFAULT: theme.colors.slate[300]
			}),
			keyframes: {
				shimmer: {
					from: { backgroundPosition: '200% 0' },
					to: { backgroundPosition: '-200% 0' }
				},
				flash: {
					'0%': { opacity: '0.2' },
					'20%': { opacity: '1' },
					'100%': { opacity: '0.2' }
				}
			},
			animation: {
				shimmer: 'shimmer 8s ease-in-out infinite',
				flash: 'flash 1.4s infinite linear'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
