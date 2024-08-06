/** @type {import('tailwindcss').Config} */

const flattenColorPalette =
	require('tailwindcss/lib/util/flattenColorPalette').default;

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
	addBase({
		':root': newVars,
	});
}

module.exports = {
	corePlugins: {
		filter: true,
	},
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'media',
	theme: {
		extend: {
			backdropBlur: {
				xs: '2px',
				md: '10px',
				lg: '24px',
				xl: '40px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			animation: {
				shimmer: 'shimmer 2s linear infinite',
				scroll:
					'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				'text-gradient': 'text-gradient 1.5s linear infinite',
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: '0 0',
					},
					to: {
						backgroundPosition: '-200% 0',
					},
				},
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				'text-gradient': {
					to: {
						backgroundPosition: '200% center',
					},
				},
			},
			boxShadow: {
				input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
			},
		},
		variants: {
			extend: {
				fontFamily: ['Mona Sans'],
				backgroundClip: ['responsive'],
				backdropFilter: ['responsive'],
			},
		},
	},
	plugins: [addVariablesForColors],
};
