import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import electron from 'vite-plugin-electron';

export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    solid(),
    electron([{
      entry: './src/main/main.ts',

    },  {
      // Preload scripts entry file of the Electron App.
      entry: './src/preload/preload.ts',
      onstart(args) {
        // Notify the Renderer process to reload the page when the Preload scripts build is complete,
        // instead of restarting the entire Electron App.
        args.reload()
      },
    }])
  ]
});
