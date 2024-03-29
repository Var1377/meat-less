<script lang="ts" context="module">
	export const loading = writable(false);
</script>

<script lang="ts">
	import Auth from './Auth.svelte';

	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		storePopup,
		ProgressRadial,
		AppShell,
		AppBar,
		Drawer,
		getDrawerStore,
		initializeStores,
		Toast,
		ProgressBar
	} from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	import IcRoundMenu from '~icons/ic/round-menu';

	const drawerStore = getDrawerStore();

	import BarcodeDrawer, { barcodeDrawerId } from './scan/[barcode]/BarcodeDrawer.svelte';

	import { Html5Qrcode } from 'html5-qrcode';
	import { writable } from 'svelte/store';

	let playing = false;

	function onScanSuccess(qrCodeMessage: string) {
		goto(`/scan/${encodeURIComponent(qrCodeMessage)}`);
	}

	function onScanFailure(error: any) {
		// console.error('Failed to scan:', error);
	}

	async function startCamera() {
		const scanner = new Html5Qrcode('reader');
		const config = {
			fps: 10
		};
		try {
			scanner.start({ facingMode: 'environment' }, config, onScanSuccess, onScanFailure);
			playing = true;
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
		return scanner;
	}

	onMount(() => {
		const scanner = startCamera();
		return () => {
			scanner.then((s) => s.stop());
		};
	});
</script>

{#if $loading}
	<ProgressBar />
{/if}
<Drawer>
	{#if $drawerStore.id === barcodeDrawerId}
		<BarcodeDrawer />
	{/if}
</Drawer>
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<button slot="lead" type="button" class="btn-icon variant-glass">
				<IcRoundMenu />
			</button>
			<svelte:fragment slot="trail">
				<Auth />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div id="reader" class="h-screen object-cover absolute"></div>
	{#if !playing}
		<div class="flex items-center justify-center h-full">
			<ProgressRadial width="w-12" />
		</div>
	{/if}
	<slot />
</AppShell>

<style lang="postcss">
	:global(video) {
		@apply absolute h-screen object-cover;
	}
</style>
