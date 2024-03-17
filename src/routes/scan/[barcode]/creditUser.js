import pkg from 'hardhat';
const { ethers } = pkg;

// solo net
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

// // test net
// const tokenContracts = [
//     {
//         name: 'MeatlessToken',
//         address: '0x62efa816904046ad9f53ba5219b8246af011ab42',
//     },
// ];

export const creditUser = async (userAddress, product, verificationResult) => {

    console.log(`Crediting user ${userAddress} for product with id ${product.id}`);
    console.log(verificationResult);

    console.log(product);

    for (const tokenName of Object.keys(product.tokens)) {
        const tokenAmount = product.tokens[tokenName];
        console.log(`Crediting user ${userAddress} with ${tokenAmount} ${tokenName} tokens`);

        const contract = tokenContracts.find((t) => t.name === tokenName);

        if (!contract) {
            console.log(`Contract not found for ${tokenName}`);
            continue;
        }

        if (tokenAmount === 0) {
            console.log(`Skipping awarding token ${tokenName} as amount is 0`);
            continue;
        }

        awardTokens(userAddress, contract, tokenAmount);
    }
}

const awardTokens = async (userAddress, contract, amount) => {
    const genericToken = await ethers.getContractAt(
        contract.name,
        contract.address,
    );
    await genericToken.mint(userAddress, amount);
}