const commonGridTemplate = {
	'fr/auto': '1fr auto',
	'auto/fr': 'auto 1fr',
	'auto/fr/auto': 'auto 1fr auto',
	'auto/auto/fr': 'auto auto 1fr',
}

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
	gridTemplateColumns: {
		container: '1fr minmax(0, calc(328 * .25rem)) 1fr',
		'container-wide': '1fr minmax(0, calc(353 * .25rem)) 1fr',
		...commonGridTemplate,
	},

	gridTemplateRows: {
		...commonGridTemplate,
	},
}
