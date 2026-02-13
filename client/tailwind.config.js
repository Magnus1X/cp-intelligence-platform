/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: "#0a0a0a",
                primary: {
                    DEFAULT: "#6366f1", // Indigo 500
                    dark: "#4f46e5",    // Indigo 600
                },
                secondary: {
                    DEFAULT: "#a855f7", // Purple 500
                    dark: "#9333ea",    // Purple 600
                },
                accent: {
                    DEFAULT: "#3b82f6", // Blue 500
                    dark: "#2563eb",    // Blue 600
                },
                background: {
                    light: "#ffffff",
                    dark: "#030712",    // Gray 950
                },
                surface: {
                    light: "#f9fafb",
                    dark: "#111827",    // Gray 900
                }
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}

