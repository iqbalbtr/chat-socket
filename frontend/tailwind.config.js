/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-accent': '#06cf9c',
        'green-primary': '#005c4b',
        'green-secondary': '#025244',
        'bg-primary': '#202c33',
        'bg-secondary': '#111b21',
        "bg-container": "#233138",
        'icon-color': '#aebbc2',
        'message': '#202c33',
        'danger': '#f25c6e',
        "color-text": "#e8deba",
        "border-color": "#212c33",
        "hover-color": "#2a3942"
      },
    },
  },
  plugins: [],
}