import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    sveltekit(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
  ],
});
