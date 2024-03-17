<script lang="ts">
  import Auth from './Auth.svelte';

	import '../app.postcss';


	import { page } from '$app/stores';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, ProgressRadial, AppShell, AppBar, Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	import IcRoundMenu from '~icons/ic/round-menu';

	const drawerStore = getDrawerStore();

	import BarcodeDrawer, { barcodeDrawerId } from './scan/[barcode]/BarcodeDrawer.svelte';

	import { BrowserMultiFormatReader } from '@zxing/browser';
	import { goto } from '$app/navigation';

	let videoStream: MediaStream | null = null;
	let videoElement: HTMLVideoElement;

	let playing = false;

	async function startCamera() {
		const codeReader = new BrowserMultiFormatReader();

		try {
			videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
			videoElement.srcObject = videoStream;
			videoElement.play();

			playing = true;

			codeReader.decodeFromVideoElement(videoElement, (result, error) => {
				if (result) {
					// Handle QR code result
					if ($page.url.pathname === "/") {
						goto(`/scan/${encodeURIComponent(result.getText())}/`);
					}
				}
			});
		} catch (error) {
			console.error('Error accessing camera:', error);
		}
	}

	function stopCamera() {
		if (videoStream) {
			videoStream.getTracks().forEach((track) => track.stop());
			videoStream = null;
		}
	}

	onMount(() => {
		startCamera();
		return stopCamera;
	});
</script>
<Drawer>
	{#if $drawerStore.id === barcodeDrawerId}
		<BarcodeDrawer />
	{/if}
</Drawer>
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
	<video id="video-preview" class="w-screen h-screen object-cover absolute" bind:this={videoElement} controlslist="nodownload">
		<track kind="captions" />
	</video>
	{#if !playing}
		<div class="flex items-center justify-center h-full">
			<ProgressRadial width="w-12"/>
		</div>
	{/if}
	<slot />
</AppShell>

