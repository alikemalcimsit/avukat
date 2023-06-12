/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'background': "url('/src/assets/background.png')",
        'blog': "url('/src/assets/blogImage.png')",
      }
    },
  },
  plugins: [],
}

