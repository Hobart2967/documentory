import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import electron from 'vite-plugin-electron';

export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    solid(),
    electron({
      entry: './src/main.ts'
    })
  ]
});
