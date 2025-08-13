const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying AgentForge contracts...");

  // Deploy CarvID contract
  const CarvID = await ethers.getContractFactory("CarvID");
  const carvId = await CarvID.deploy();
  await carvId.waitForDeployment();
  console.log("CarvID deployed to:", await carvId.getAddress());

  // Deploy Agent contract
  const Agent = await ethers.getContractFactory("Agent");
  const agent = await Agent.deploy();
  await agent.waitForDeployment();
  console.log("Agent deployed to:", await agent.getAddress());

  console.log("Deployment completed successfully!");
  console.log("CarvID Contract Address:", await carvId.getAddress());
  console.log("Agent Contract Address:", await agent.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 