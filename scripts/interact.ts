import { ethers } from 'hardhat';


const tokenContracts = [
    {
        name: 'MeatlessToken',
        address: '0x0daa6a80a8e17f251a5d1263d8a6f4413c077df3',
    },
    {
        name: 'LocalToken',
        address: '0x8241d0201a0d1408b5aab7308489cddad4e78acf',
    }
];

const userAddress = "0x3823618b7e57C0D37Dea3ea326bD99A01A04B7cE";

async function main(): Promise<void> {
    const tokenIndex = 1;
    const contract = tokenContracts[tokenIndex];
    const genericToken = await ethers.getContractAt(
        contract.name,
        contract.address,
    );
    await genericToken.mint(userAddress, 1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
