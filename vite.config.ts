import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Icons from 'unplugin-icons/vite';
import pluginSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [pluginSsl(), sveltekit(), purgeCss(), nodePolyfills(), Icons(
		{ compiler: 'svelte', autoInstall: true, }
	)],
	optimizeDeps: {
		exclude: ['hardhat']
	},
	server: {
		proxy: {}
	}
});