/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette pastel lumineuse
        'pastel': {
          'primary': '#A5B4FC',        // Lavande doux
          'primary-light': '#C7D2FE',  // Lavande très clair
          'primary-dark': '#818CF8',   // Lavande un peu plus saturé
          'secondary': '#A7F3D0',      // Vert menthe
          'secondary-light': '#D1FAE5',// Vert menthe très clair
          'accent': '#FBCFE8',         // Rose pêche
          'accent-light': '#FCE7F3',   // Rose très clair
          'accent-dark': '#F9A8D4',    // Rose plus saturé
          'coral': '#FED7AA',          // Corail pastel
          'sky': '#BAE6FD',            // Bleu ciel pastel
          'lavender': '#E9D5FF',       // Lavande clair
        },
        'bg': {
          'main': '#FFFFFF',           // Blanc pur
          'alt': '#F9FAFB',            // Gris très très clair
          'card': '#F3F4F6',           // Gris clair pour cartes
          'hover': '#F1F5F9',          // Gris clair pour hover
        },
        'text': {
          'primary': '#1F2937',        // Gris foncé (presque noir)
          'secondary': '#4B5563',      // Gris moyen
          'muted': '#9CA3AF',          // Gris clair
          'light': '#D1D5DB',          // Gris très clair
        }
      },
    },
  },
  plugins: [],
}

