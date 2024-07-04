const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config()

async function main() {
    // Get the contract address and ABI
    const contractAddress = "0xA5824121F8148bd5F3A8BcE30bf223106566259E";
    const tokenABI = tokenContractJSON.abi;
  
    // Connect to the network
    const [deployer] = await ethers.getSigners();
    console.log("Running script with the account:", deployer.address);
  
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, tokenABI, deployer);
  
    // Call the promptDescription function
    try {
      const description = await contract.promptDescription();
      console.log("Prompt Description:", description);
    } catch (error) {
      console.error("Error getting prompt description:", error);
    }
  }
  
  // Run the script
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  