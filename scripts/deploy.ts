import { ethers } from 'hardhat';


const tokenContractNames = [
    "MeatlessToken",
    "LocalToken",
];

async function main(): Promise<void> {

    const tokenIndex = 1;

    const tokenName = tokenContractNames[tokenIndex];

    const token =
        await ethers.deployContract(
            tokenName,
            [0],
            {
                from: (await ethers.getSigners())[0].address,
                value: ethers.parseEther('0.1')
            }
        );

    await token.waitForDeployment();

    console.log(
        `${tokenName} deployed to ${JSON.stringify(token)}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
