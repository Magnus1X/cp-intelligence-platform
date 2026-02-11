/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0a0a0a",
                primary: "#00ff41", // Matrix/Serious Green
                secondary: "#111111",
                accent: "#333333",
            }
        },
    },
    plugins: [],
}
