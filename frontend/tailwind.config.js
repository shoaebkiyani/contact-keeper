/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: { min: '300px', max: '499px' },
			sm: { min: '500px', max: '760px' },
			md: { min: '761px' },
			lg: { min: '1021px' },
		},
		extend: {},
	},
	plugins: [],
};
