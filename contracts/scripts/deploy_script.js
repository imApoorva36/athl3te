const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Athl3te = await hre.ethers.getContractFactory("Athl3te");

  // Deploy the factory contract (Athl3te)
  const athl3te = await Athl3te.deploy();

  // Wait for deployment confirmation
  await athl3te.deployed();

  console.log(`Athl3te contract deployed to: ${athl3te.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
