# Project: ERC721 Sepolia to Amoy Bridge Using fxPortal
This project demonstrates the process of bridging ERC721 tokens from the Sepolia testnet to the Amoy testnet using the fxPortal bridge and Hardhat. The goal is to enable seamless transfer of unique digital assets (ERC721 tokens) between different blockchain networks, providing a practical example for developers to follow.

## Description
As blockchain technology continues to evolve, the ability to move assets across different chains is becoming increasingly important. This project focuses on bridging ERC721 tokens, a popular standard for non-fungible tokens (NFTs), from Sepolia, a testnet for Ethereum, to Amoy, another testnet network. By leveraging the fxPortal bridge, we can facilitate secure and efficient transfers of NFTs between these two networks.
### Prerequisites
1. ERC721 token standard
2. Ethereum and testnets (Sepolia, Amoy)
3. JavaScript
4. Hardhat, a development environment for Ethereum
5. MetaMask
   
## Getting Started
### Executing program
#### Create an ERC721 token contract with minting capabilities.
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaToken is ERC721, Ownable {
    constructor() ERC721("MetaToken", "MTA") {}

     function promptDescription() public pure returns (string memory) {
        return "an image with the collection of 5 Metatoken NFT blockchain";
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public pure returns (uint8) {
		return 0;
	}
}
```
#### Deploy the ERC721 contract to the Sepolia testnet.
```
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const token = await hre.ethers.deployContract("MetaToken");

  console.log("Token address:", await token.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
#### Mint an ERC721 Token
```
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config()

const tokenAddress = "0xA5824121F8148bd5F3A8BcE30bf223106566259E"; // place your erc721 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xa5d0F690Aa0EdaFa44b9Ba46584980DD0246a5FA"; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  
    const tx = await token.mint(walletAddress, 1000);
    await tx.wait();

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
```
#### Approve and Bridge the Token
```
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");

const tokenAddress = "0xA5824121F8148bd5F3A8BcE30bf223106566259E"; // place your erc721 contract address here
const tokenABI = tokenContractJSON.abi;
const fxERC721RootAddress = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = "0xa5d0F690Aa0EdaFa44b9Ba46584980DD0246a5FA"; // place your public address for your wallet here

async function main() {

    const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);

    const approveTx = await tokenContract.approve(fxERC721RootAddress, 1000);
    await approveTx.wait();

    console.log('Approval confirmed');


    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, 1000, "0x6556");
    await depositTx.wait();

    console.log("Tokens deposited");
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
```
#### Get the balance on Amoy network
```
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");

const tokenAddress = "0xa7dcce1df50fd7bf15fb10f8a8405f080f1ffe3e"; // place your erc721 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xa5d0F690Aa0EdaFa44b9Ba46584980DD0246a5FA"; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
```

### Steps for Bridging

1. Run npm i to install dependencies
2. Put your private key in the .env.examples file and rename to .env when finished
3. Run npx hardhat run scripts/deploy.js --network sepolia to deploy ERC721 contract
4. Paste the newly deployed contract address in the tokenAddress variable for the other scripts
5. Make sure to fill in your public key
6. Run npx hardhat run scripts/mint.js --network sepolia to mint tokens to your wallet
7. Run npx hardhat run scripts/approveDeposit.js --network sepolia to approve and deposit your tokens to polygon
8. Wait 20-30ish minutes for tokens to show on polygon account
9. Use oklink.com to check your account for the tokens. Once they arrive, you can click on the transaction to get the contract address for polygon.
10. Use this polygon contract address for your getBalance script's tokenAddress
11. Run npx hardhat run scripts/getBalance.js --network amoy to see the new polygon balance
12. Run npx hardhat run scripts/prompt.js --network sepolia to get the promptDescription function result.

## Authors

Vanshaj

vanshajsen16@gmail.com
