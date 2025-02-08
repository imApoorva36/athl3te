const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract with account: ${deployer.address}`);

    // Deploy the contract
    const contract = await ethers.getContractFactory("Athl3te");
    const deployedContract = await contract.deploy();

    await deployedContract.deployed();
    console.log(`Contract deployed to: ${deployedContract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });