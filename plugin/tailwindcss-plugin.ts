import plugin from "tailwindcss/plugin"

const tailwindPlugin = plugin(function ({ addBase, addComponents, addUtilities, theme }) {
  addBase({
    h1: {
      fontSize: theme("fontSize.3xl"),
    },
    h2: {
      fontSize: theme("fontSize.2xl"),
    },
    h3: {
      fontSize: theme("fontSize.xl"),
    },
  })
  addComponents({
    ".bg-gradient-primary": {
      "--tw-gradient-from": theme("colors.sky.400"),
      "--tw-gradient-to": theme("colors.blue.800"),
      "--tw-gradient-stops": "var(--tw-gradient-from),var(--tw-gradient-to)",
      backgroundImage: "radial-gradient(ellipse at top,var(--tw-gradient-stops))",
    },
  })
})
export default tailwindPlugin
