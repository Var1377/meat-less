import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), nodePolyfills(), Icons(
		{ compiler: 'svelte', autoInstall: true, }
	)]
});