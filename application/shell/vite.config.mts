import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';
import electron from 'vite-plugin-electron';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  build: {
    minify: false
  },
	css: {
		preprocessorOptions: {
			scss: {
				api: 'legacy',
				includePaths: [
					path.join(__dirname, 'scss'),
					path.join(path.dirname(import.meta.resolve('@codewyre/wyrekit-ui-base/package.json')), 'dist')
				]
			}
		}
	},
  plugins: [
    solid({
      babel: {
				plugins: [[
					'@babel/plugin-proposal-decorators',
					{
						legacy: true
					}
				]]
			}
    }),
    solidSvg({
			/**
			 * If true, will export as JSX component if `as` isn't specified.
			 *
			 * Otherwise will export as url, or as JSX component if '?as=component-solid'
			 *
			 */
			defaultAsComponent: true
		}) as unknown as Plugin,
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
