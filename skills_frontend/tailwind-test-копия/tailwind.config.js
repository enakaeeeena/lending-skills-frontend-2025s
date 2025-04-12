// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         background: "#FAFAF9",
//         text: "#171717",
//         primary: "#0C3281",
//       },
//       fontSize: {
//         "24px": "1.5rem",
//         "30px": "1.875rem",
//         "36px": "2.25rem",
//         "42px": "2.625rem",
//         "60px": "3.75rem",
//         "90px": "5.625rem",
//       },
//       spacing: {
//         "15px": "0.9375rem",
//         "30px": "1.875rem",
//         "40px": "2.5rem",
//         "60px": "3.75rem",
//         "100px": "6.25rem",
//         "120px": "7.5rem",
//         "150px": "9.375rem",
//       },
//       borderWidth: {
//         5: "5px",
//       },
//     },
//   },
//   plugins: [],
// };
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: ["YFF Rare", "sans-serif"],
      },
      colors: {
        background: "#FAFAF9",
        text: "#171717",
        primary: "#0C3281",
      },
      borderWidth: {
        4: "4px",
        6: "6px",
      },
    },
  },
  plugins: [],
};
