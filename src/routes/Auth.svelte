<script lang="ts">
	import '../app.postcss';

	import '$lib/web3';

	import { DAppKitUI } from '@vechain/dapp-kit-ui';
	import { walletStore } from '$lib/web3';
	const signin = () => {
		DAppKitUI.modal.open();
	};
</script>

<button type="button" class="btn variant-glass" on:click={signin}>
	{#if $walletStore.address}
		<p class="overflow-ellipsis max-w-48 overflow-hidden">Logged in as {$walletStore.address}</p>
	{:else}
		Log In
	{/if}
</button>
