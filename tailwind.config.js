const colors = require('tailwindcss/colors')

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
		extend: {
			boxShadow: {
				'btn-primary': '0 0 8px #DFF5BA',
			},
		},
		colors: {
			primary: '#C9E791',
			muted: 'rgba(183, 211, 134, 0.5)',
			inverse: '#0C0C0A',
			depth: '#0C0E10',
			white: '#ffffff',
			footer: '#1E1E1E',
			transparent: 'transparent',
			green: colors.green,
			red: colors.red,
			amber: colors.amber,
			blue: colors.blue,
		},
		fontFamily: {
			sora: ['Sora', 'system-ui'],
		},
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
