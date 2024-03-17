yarn compile

yarn deploy-solo


find section "eth_getTransactionReceipt" (****************** EVENT: Get request - eth_getTransactionReceipt result ******************)
(need to run with debug mode to get these verbose logs)
find contractAddress field within that

eg 0x32db75cdca2121faf97cf1861422f4e5dd4bc4d1
copy it

go to interact.ts
paste
```ts
const genericToken = await ethers.getContractAt(
        'GenericToken',
        '0x32db75cdca2121faf97cf1861422f4e5dd4bc4d1'
    );
```

add custom token as a token in wallet
home -> manage tokens -> add custom token -> paste address from above into "token address field"
0x32db75cdca2121faf97cf1861422f4e5dd4bc4d1

get address from wallet
paste
```ts
await genericToken.mint("0x3823618b7e57C0D37Dea3ea326bD99A01A04B7cE", 1);
```

yarn interact-solo
