/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	safelist: ['dark'],
	content: [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			primary: {
				DEFAULT: 'var(--primary)',
				foreground: 'var(--primary-foreground)'
			},
			foreground: 'var(--foreground)',
			background: 'var(--background)',
			card: {
				DEFAULT: 'var(--card)',
				foreground: 'var(--card-foreground)'
			},
			popover: {
				DEFAULT: 'var(--popover)',
				foreground: 'var(--popover-foreground)'
			},
			secondary: {
				DEFAULT: 'var(--secondary)',
				foreground: 'var(--secondary-foreground)'
			},
			muted: {
				DEFAULT: 'var(--muted)',
				foreground: 'var(--muted-foreground)'
			},
			accent: {
				DEFAULT: 'var(--accent)',
				foreground: 'var(--accent-foreground)'
			},
			destructive: {
				DEFAULT: 'var(--destructive)',
				foreground: 'var(--destructive-foreground)'
			},
			border: 'var(--border)',
			input: 'var(--input)',
			ring: 'var(--ring)',
			chart: {
				'1': 'var(--chart-1)',
				'2': 'var(--chart-2)',
				'3': 'var(--chart-3)',
				'4': 'var(--chart-4)',
				'5': 'var(--chart-5)'
			}
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
};
