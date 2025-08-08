// postcss.config.mjs (ESM)
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    tailwindcss,
    postcssNested,
    autoprefixer
  ],
};