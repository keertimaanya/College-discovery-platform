/**
 * PostCSS Compilation Configuration
 * -----------------------------------------------------------------------------
 * PostCSS compiles and post-processes standard CSS. We configure it to load the
 * new "@tailwindcss/postcss" plugin, which parses our code imports and utility
 * classes to dynamically build the optimized final Tailwind v4 stylesheet.
 * -----------------------------------------------------------------------------
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // Leverages PostCSS to bundle Tailwind utility styles
  },
};

export default config;
