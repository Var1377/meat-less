<script context="module" lang="ts">
	export const barcodeDrawerId = 'barcode-drawer';
</script>

<script lang="ts">
	import { walletStore } from '$lib/web3';
	import { FileButton, getToastStore } from '@skeletonlabs/skeleton';

	import { barcodeStore } from './+layout.svelte';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();

	let form: HTMLFormElement;

	const onSubmit = async (event: Event) => {
		event.preventDefault();
		const addr = $walletStore.address;

		if (!files) {
			toastStore.trigger({
				message: 'Please upload an image of the packaging',
				background: 'bg-error-500'
			});
			return;
		}

		if (!addr) {
			toastStore.trigger({
				message: 'Please connect your wallet',
				background: 'bg-error-500'
			});
			return;
		}

		const formData = new FormData(form);
		formData.append('userAddress', addr);

		// submit the form
		const response = await fetch(form.action, {
			method: form.method,
			body: formData
		});

		if (response.ok) {
			toastStore.trigger({
				message: 'Claim successful',
				background: 'bg-success-500'
			});
			goto('/');
		} else {
			toastStore.trigger({
				message: 'Error submitting claim',
				background: 'bg-error-500'
			});
		}
	};

	let files: FileList;
</script>

{#if $barcodeStore?.product?.name}
	<form
		bind:this={form}
		on:submit={onSubmit}
		action="?/verify"
		method="POST"
		class="flex flex-col p-4 gap-4 items-center"
	>
		<h1 class="h1">{$barcodeStore?.product?.name}</h1>
		<section class="flex gap-4 flex-wrap">
			{#if $barcodeStore?.product?.tokens?.MeatlessToken}
				<p class="chip variant-glass-primary">
					{$barcodeStore.product.tokens.MeatlessToken} MeatlessToken
				</p>
			{/if}
			{#if $barcodeStore?.product?.tokens?.LocalToken}
				<p class="chip variant-glass-secondary">
					{$barcodeStore.product.tokens.LocalToken} LocalToken
				</p>
			{/if}
		</section>
		<!-- {#if $barcodeStore?.product?.description}
		<p>{$barcodeStore.product.description}</p>
	{/if}
	{#if $barcodeStore?.product?.image}
		<img src={$barcodeStore.product.image} alt="Product" class="h-48 rounded-lg" />
	{/if} -->
		<FileButton accept="image/*" name="image" bind:files>
			{#if files}
				<p class="text-center">{files[0].name}</p>
			{:else}
				<p class="text-center">Upload image of packaging</p>
			{/if}
		</FileButton>
		<button type="submit" class="btn variant-glass">Claim 4.1826 B3TR</button>
	</form>
{:else}
	<h1 class="h1 p-8 text-center">Product not found</h1>
{/if}

<!-- brother spot post pilot dad achieve private staff cricket flee enter grape -->
<!-- cup crime want hood essence open chapter unaware shock north believe axis -->

<!-- Sync2 Windows -->
<!-- crane table twist guard pizza legal vacuum engage dish insect gather prison -->
