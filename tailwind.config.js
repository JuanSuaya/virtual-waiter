/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

const {
  default: flattenColorPalette
} = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontSize: {
        'display-2xl': ['62px', { lineHeight: '1.1' }],
        'display-xl': ['60px', { lineHeight: '1' }],
        'display-lg': ['48px', { lineHeight: '1.1' }],
        'display-md': ['38px', { lineHeight: '1.1' }],
        'display-sm': ['32px', { lineHeight: '1.1' }],
        'display-xs': ['28px', { lineHeight: '1.1' }],
        xl: ['22px', { lineHeight: '1.2' }],
        lg: ['18px', { lineHeight: '1.3' }],
        md: ['16px', { lineHeight: '1.3' }],
        sm: ['14px', { lineHeight: '1.6' }],
        xs: ['12px', { lineHeight: '1.6' }]
      },
      colors: {
        background: '#f3f3f3',
        foreground: 'hsl(var(--foreground))',
        blue: {
          50: '#f5f7ff',
          100: '#eaefff',
          200: '#e0e7ff',
          300: '#becdff',
          400: '#2d5fff',
          500: '#2956e6',
          600: '#244ccc',
          700: '#2247bf',
          800: '#1b3999',
          900: '#142b73',
          950: '#102159',
          DEFAULT: '#2d5fff'
        },
        'dark-blue': {
          50: '#f2f3f7',
          100: '#e6e7f0',
          200: '#d9dbe8',
          300: '#b0b4d0',
          400: '#010c66',
          500: '#010b5c',
          600: '#010a52',
          700: '#01094d',
          800: '#01073d',
          900: '#00052e',
          950: '#000424',
          DEFAULT: '#010c66'
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f4f6',
          200: '#eaeef1',
          300: '#d3dbe2',
          400: '#718ca1',
          500: '#667e91',
          600: '#5a7081',
          700: '#556979',
          800: '#445461',
          900: '#333f48',
          950: '#283138',
          DEFAULT: '#718ca1'
        },
        black: {
          50: '#f3f3f3',
          100: '#ebebeb',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#333333',
          500: '#2e2e2e',
          600: '#292929',
          700: '#262626',
          800: '#1f1f1f',
          900: '#171717',
          950: '#121212',
          DEFAULT: '#121212'
        },
        orange: {
          50: '#fff1ee',
          100: '#ffeae6',
          200: '#ffd4cb',
          300: '#ff7557',
          400: '#e6694e',
          500: '#cc5e46',
          600: '#bf5841',
          700: '#994634',
          800: '#733527',
          900: '#59291e',
          950: '#4c2119',
          DEFAULT: '#ff7557'
        },
        mint: {
          50: '#f1fdf9',
          100: '#eafcf7',
          200: '#d5f9ee',
          300: '#76edc7',
          400: '#6ad5b3',
          500: '#5ebe9f',
          600: '#59b295',
          700: '#478e77',
          800: '#356b5a',
          900: '#295346',
          950: '#214538',
          DEFAULT: '#76edc7'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          primary: 'oklch(var(--color-primary, #2d5fff) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))'
          }
        }
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), addVariablesForColors]
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars
  })
}
