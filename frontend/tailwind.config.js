/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  important: true,
  theme: {
    fontSize: {
      xs: ["8px", "11px"],
      sm: ["12px", "15px"],
      base: ["16px", "18px"],
      lg: ["19px", "21px"],
      xl: ["22px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    borderRadius: {
      xxs: "2px",
      xs:"4px",
      sm: "6px",
      md: "12px",
      lg: "18px",
    },
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "50%": { opacity: "0.5" },
          "100%": { opacity: 1 },
        },
      },
      padding: {
        "ly-pad": "20px",
        "md-ly-pad": "15px",
        "sm-ly-pad": "10px",
        0.5: "6px",
        1: "12px",
        2: "18px",
        xs: "1px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "5px",
        "2xl": "6px",
        "3xl": "7px",
        "4xl": "8px",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      width: {
        "icon-width": "30px",
      },
      colors: {
        primary: "#000000",
        "white ": "#ffffff",

        "slate-gray": "#D9D9D9",
        "light-gray": "#555F5E",
        "black-50": "rgba(0, 0, 0, 0.5)",
        "black-90": "rgba(0, 0, 0, 0.8)",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      gap: {
        xs: "4px",
        sm: "6px",
        md: "18px",
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

      width: {
        img: "150px",
        
        "sm-img": "50px",
        "xs-img": "30px",
        "icon-width": "30px",
        "max-w-input": "900px",
      },
      height: {
        "img-height": "150px",
        "sm-img": "50px",
        "xs-img": "30px",
        "c-img-h": "150px",
        "min-c-img-h": "130px",
        "md-min-c-img-h": "120px",
        "sm-min-c-img-h": "110px",
        "md-c-img-h": "130px",
        "sm-c-img-h": "120px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      borderRadius: {
        full: "100%",
        1: "6px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
