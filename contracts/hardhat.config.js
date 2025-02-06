require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.20", 
  networks: {
    base_sepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, 
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`], 
      chainId: 84532,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
};