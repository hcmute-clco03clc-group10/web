/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderColor: (theme) => ({
				...theme('colors'),
				DEFAULT: theme.colors.slate[300],
			}),
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
