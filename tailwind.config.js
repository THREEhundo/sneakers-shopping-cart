module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#ffc6c5",
      secondary: "#ffffff",
      opblack: "rgba(0, 0, 0, 0.8)",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      lg: "0.5rem",
      xl: "2.75rem",
      full: "9999px",
    },
    backgroundColor: (theme) => ({
      primary: "#ffc6c5",
      secondary: "#ffffff",
      opblack: "rgba(0, 0, 0, 0.8)",
    }),
    backgroundImage: (theme) => ({
      trash: "url('./imgs/trash.svg')",
    }),
    textColor: {
      primary: "#ffc6c5",
      secondary: "#ffffff",
      danger: "#e3342f",
    },
    container: {
      center: true,
    },
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('./src/imgs/jordan1.jpeg')",
      }),
    },
  },
  variants: {
    extend: {
      ringColor: ["hover", "active"],
    },
  },
  plugins: [],
};
