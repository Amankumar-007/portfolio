import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        playfair: ["var(--font-playfair)", ...fontFamily.serif],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        hourglassRotate: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
        hideCurves: {
          '0%': { opacity: '1' },
          '25%': { opacity: '0' },
          '30%': { opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        sandStream1: {
          '0%': { height: '0', top: '35px' },
          '50%': { height: '0', top: '45px' },
          '60%': { height: '35px', top: '8px' },
          '85%': { height: '35px', top: '8px' },
          '100%': { height: '0', top: '8px' },
        },
        sandStream2: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '51%': { opacity: '1' },
          '90%': { opacity: '1' },
          '91%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        sandFillup: {
          '0%': { opacity: '0', height: '0' },
          '60%': { opacity: '1', height: '0' },
          '100%': { opacity: '1', height: '17px' },
        },
        sandDeplete: {
          '0%': { opacity: '0', top: '45px', height: '17px', width: '38px', left: '6px' },
          '1%': { opacity: '1', top: '45px', height: '17px', width: '38px', left: '6px' },
          '24%': { opacity: '1', top: '45px', height: '17px', width: '38px', left: '6px' },
          '25%': { opacity: '1', top: '41px', height: '17px', width: '38px', left: '6px' },
          '50%': { opacity: '1', top: '41px', height: '17px', width: '38px', left: '6px' },
          '90%': { opacity: '1', top: '41px', height: '0', width: '10px', left: '20px' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'hourglassRotate': 'hourglassRotate 2s ease-in 0s infinite',
        'hideCurves': 'hideCurves 2s ease-in 0s infinite',
        'sandStream1': 'sandStream1 2s ease-in 0s infinite',
        'sandStream2': 'sandStream2 2s ease-in 0s infinite',
        'sandFillup': 'sandFillup 2s ease-in 0s infinite',
        'sandDeplete': 'sandDeplete 2s ease-in 0s infinite',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config