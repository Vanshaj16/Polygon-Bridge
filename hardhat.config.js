require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    amoy: {
      url: 'https://rpc-amoy.polygon.technology/',
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/3e071b3bb5104e668bd64fbe603f9dba',
      accounts: [process.env.PRIVATE_KEY],
    },
  }
};
