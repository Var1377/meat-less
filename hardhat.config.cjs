// eslint-disable-next-line @typescript-eslint/no-var-requires
const { VECHAIN_URL_SOLO, VECHAIN_URL_MAINNET } = require("@vechain/hardhat-vechain");

require('@nomicfoundation/hardhat-toolbox');
require("@vechain/hardhat-web3");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.20',
	networks: {
		/**
		 * Mainnet configuration
		 */
		vechain_mainnet: {
			// Mainnet
			url: VECHAIN_URL_MAINNET,
			accounts: ['7f9290cc44c5fd2b95fe21d6ad6fe5fa9c177e1cd6f3b4c96a97b13e09eaa158'],
			debugMode: false,
			delegator: undefined,
			gas: 'auto',
			gasPrice: 'auto',
			gasMultiplier: 1,
			timeout: 20000,
			httpHeaders: {}
		},

		/**
		 * Testnet configuration
		 */
		vechain_testnet: {
			// Testnet
			url: 'https://testnet.vechain.org',

			accounts: {
				mnemonic:
                    'water coin cattle uncover law resemble frequent inner fiber olympic bless hawk',
				path: "m/44'/818'/0'/0/",
				count: 3,
				initialIndex: 0,
				passphrase: 'hi123456'
			},
			debugMode: true,
			delegator: undefined,
			gas: 'auto',
			gasPrice: 'auto',
			gasMultiplier: 1,
			timeout: 20000,
			httpHeaders: {}
		},

		/**
		 * Thor solo network configuration
		 */
		vechain_solo: {
			// Thor solo network
			url: VECHAIN_URL_SOLO,
			accounts: ['7f9290cc44c5fd2b95fe21d6ad6fe5fa9c177e1cd6f3b4c96a97b13e09eaa158'],
			debugMode: true,
			delegator: undefined,
			gas: 'auto',
			gasPrice: 'auto',
			gasMultiplier: 1,
			timeout: 20000,
			httpHeaders: {}
		}
	},
//   defaultNetwork: 'vechain_solo',
  defaultNetwork: 'vechain_testnet',
};
