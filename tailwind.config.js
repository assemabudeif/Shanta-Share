/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        colors:{
            ...colors,
            primary: "#4f40e1",
        }
    },
    plugins: [],
}