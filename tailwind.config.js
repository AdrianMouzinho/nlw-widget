module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#996DFF',
          500: '#8257E5',
        }
      },
      boxShadow: {
        'brand': '0px 8px 24px rgba(130, 87, 229, 0.25)',
        'surface': '0px 8px 32px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        md: '4px'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-scrollbar"),
  ],
}
