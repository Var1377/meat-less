<script lang="ts" context="module">
	export const barcodeStore = writable<DrawerData | null>(null);

	export type DrawerData = LayoutData;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { type DrawerSettings, getDrawerStore } from '@skeletonlabs/skeleton';
	import { barcodeDrawerId } from './BarcodeDrawer.svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';

	export let data;

	const drawerSettings: DrawerSettings = {
		position: 'bottom',
		height: 'h-screen-full',
		id: barcodeDrawerId
	};

	const drawerStore = getDrawerStore();

	let mounted = false;

	onMount(() => {
		mounted = true;
		drawerStore.open(drawerSettings);
		return drawerStore.close;
	});

	$: barcodeStore.set(data);
	$: if (!$drawerStore.open && mounted) {
		goto('/');
	}
</script>
<slot />
