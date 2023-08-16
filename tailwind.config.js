/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'blue-rgba': 'rgba(12, 65, 149, 0.46)',
        'light-blue-rgba': 'rgba(179, 202, 239, 0.41)',
        'morelight-blue-rgba': 'rgba(161, 225, 255, 0.49)',
        'grey-rgba': 'rgba(246, 246, 246, 1)',
        'bg-grey': 'rgba(252, 253, 253, 1)',
        'text-blue': 'rgba(0, 172, 255, 1)',
      },
    },
  },
  plugins: [],
}

