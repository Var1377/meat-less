<script context="module" lang="ts">
	export const barcodeDrawerId = 'barcode-drawer';
</script>

<script lang="ts">
	import { walletStore } from '$lib/web3';

	import { barcodeStore } from './+layout.svelte';

	let form: HTMLFormElement;

	const onSubmit = async (event: Event) => {
		event.preventDefault();
		const addr = $walletStore.address;

		if (!addr) {
			alert('Please login first');
			return;
		}

		const formData = new FormData(form);
		formData.append("userAddress", addr);
		const data = Object.fromEntries(formData.entries());
		console.log(data);

		// submit the form
		const response = await fetch(form.action, {
			method: form.method,
			body: formData
		});

		console.log(response);
	};
</script>

<form bind:this={form} on:submit={onSubmit} action="?/verify" method="POST" class="flex flex-col p-4 gap-4 items-center">
	<h1 class="h1">{$barcodeStore?.product?.name}</h1>
	{#if $barcodeStore?.product?.description}
		<p>{$barcodeStore.product.description}</p>
	{/if}
	{#if $barcodeStore?.product?.image}
		<img src={$barcodeStore.product.image} alt="Product" class="h-48 rounded-lg" />
	{/if}
	<button type="submit" class="btn variant-glass">Claim 4.1826 B3TR</button>
</form>

<!-- brother spot post pilot dad achieve private staff cricket flee enter grape -->