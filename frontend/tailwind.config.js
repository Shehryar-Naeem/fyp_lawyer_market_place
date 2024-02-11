/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontSize: {
      xs: ["10px", "12.19px"],
      sm: ["12px", "16px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      padding: {
        "ly-pad": "20px",
        "md-ly-pad": "15px",
        "sm-ly-pad": "08px",
        0.5: "6px",
        1: "12px",
        2: "18px",
      },
      width: {
        "icon-width": "30px",
      },
      colors: {
        primary: "#000000",
        "white ": "#ffffff",
        "slate-gray": "#D9D9D9",
        "black-50": "rgba(0, 0, 0, 0.5)",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      gap: {
        sm: "6px",
        1: "12px",
        2: "25px",
        3: "35px",
      },
      boxShadow: {
        "2xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right,#D9D9D9 42%,#ffffff 42% 100%)",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "18px",
      },
      width: {
        img: "150px",
        "sm-img": "50px",
        "icon-width": "30px",
        "max-w-input": "900px",
      },
      height: {
        "img-height": "150px",
        "sm-img-height": "50px",
      },
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        full: "100%",
        1: "6px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
