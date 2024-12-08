import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "airbnb-red": "#ff385c",
                airbnb: "#46a807",
                "airbnb-dark": "#2e9a00",
            },
        },
    },
    plugins: [],
};
export default config;
