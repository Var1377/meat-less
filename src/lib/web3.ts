import { DAppKitUI } from "@vechain/dapp-kit-ui";
import { writable } from "svelte/store";

// place files you want to import through the `$lib` alias in this folder.
const walletConnectOptions = {
    projectId: 'a0b855ceaf109dbc8426479a4c3d38d8',
    metadata: {
        name: 'Sample VeChain dApp',
        description: 'A sample VeChain dApp',
        url: window.location.origin,
        icons: [`${window.location.origin}/favicon.ico`]
    }
};

const vechainDAppKitOptions = {
    nodeUrl: 'https://testnet.vechain.org/',
    genesis: 'test',
    walletConnectOptions,
    usePersistence: true
};

DAppKitUI.configure(vechainDAppKitOptions);

export const walletStore = writable(DAppKitUI.wallet.state);

DAppKitUI.wallet.subscribe(walletStore.set);