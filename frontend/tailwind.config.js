/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.tsx',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      width: {
        "icon-width": "30px",
      },
      colors: {
        'primary': "#000000",
        "white ": "#ffffff",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },
      gap: {
        "sm":"6px",
        "1":"12px",
        "2":"25px",
        "3":"35px"
      },
      boxShadow: {
        "2xl": "0px 4px 30px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

