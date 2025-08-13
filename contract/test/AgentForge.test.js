const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentForge Contracts", function () {
  let carvId, agent;
  let owner, user1, user2, agentCreator;
  let carvId1, carvId2;

  beforeEach(async function () {
    [owner, user1, user2, agentCreator] = await ethers.getSigners();

    // Deploy contracts
    const CarvID = await ethers.getContractFactory("CarvID");
    carvId = await CarvID.deploy();

    const Agent = await ethers.getContractFactory("Agent");
    agent = await Agent.deploy();

    // Mint some CARV IDs for testing
    await carvId.mint(user1.address, 123, "ipfs://QmTest1", "User One", "Test user one");
    await carvId.mint(user2.address, 456, "ipfs://QmTest2", "User Two", "Test user two");
    carvId1 = 123;
    carvId2 = 456;
  });

  describe("CarvID Contract", function () {
    it("Should mint CARV ID NFTs correctly", async function () {
      expect(await carvId.ownerOf(carvId1)).to.equal(user1.address);
      expect(await carvId.ownerOf(carvId2)).to.equal(user2.address);
      
      const profile1 = await carvId.getUserProfile(carvId1);
      expect(profile1.name).to.equal("User One");
      expect(profile1.description).to.equal("Test user one");
      expect(profile1.reputationScore).to.equal(50);
    });

    it("Should allow profile updates", async function () {
      await carvId.connect(user1).updateProfile(carvId1, "Updated Name", "Updated Description");
      
      const profile = await carvId.getUserProfile(carvId1);
      expect(profile.name).to.equal("Updated Name");
      expect(profile.description).to.equal("Updated Description");
    });

    it("Should manage access permissions", async function () {
      const dataTypeHash = ethers.keccak256(ethers.toUtf8Bytes("whale_data"));
      
      // Grant access
      await carvId.connect(user1).grantAccess(carvId1, agent.address, dataTypeHash);
      expect(await carvId.hasAccess(carvId1, agent.address, dataTypeHash)).to.be.true;
      
      // Revoke access
      await carvId.connect(user1).revokeAccess(carvId1, agent.address, dataTypeHash);
      expect(await carvId.hasAccess(carvId1, agent.address, dataTypeHash)).to.be.false;
    });
  });

  describe("Agent Contract", function () {
    it("Should register agents correctly", async function () {
      const keywords = ["defi", "trading", "analytics"];
      
      const tx = await agent.connect(agentCreator).registerAgent(
        "DataAgent Pro",
        "Advanced data analysis agent",
        "Alert whale moves, detect pump-and-dump tokens",
        carvId1,
        keywords,
        ethers.parseEther("0.15"),
        user1.address
      );

      const receipt = await tx.wait();
      const event = receipt.logs.find(log => log.eventName === "AgentRegistered");
      
      expect(event.args.agentId).to.equal(1);
      expect(event.args.name).to.equal("DataAgent Pro");
      expect(event.args.creator).to.equal(agentCreator.address);
      expect(event.args.carvId).to.equal(carvId1);
    });

    it("Should retrieve agent data", async function () {
      const keywords = ["social", "sentiment"];
      
      await agent.connect(agentCreator).registerAgent(
        "SocialInsight Bot",
        "Social media sentiment analysis",
        "Monitor social sentiment and detect trending topics",
        carvId2,
        keywords,
        ethers.parseEther("0.25"),
        user2.address
      );

      const agentData = await agent.getAgent(1);
      expect(agentData.name).to.equal("SocialInsight Bot");
      expect(agentData.description).to.equal("Social media sentiment analysis");
      expect(agentData.primaryGoal).to.equal("Monitor social sentiment and detect trending topics");
      expect(agentData.carvId).to.equal(carvId2);
      expect(agentData.pricePerCall).to.equal(ethers.parseEther("0.25"));
      expect(agentData.receiverAddress).to.equal(user2.address);
      expect(agentData.creator).to.equal(agentCreator.address);
      expect(agentData.isActive).to.be.true;
    });

    it("Should allow agent updates by creator", async function () {
      const keywords = ["defi", "trading"];
      
      await agent.connect(agentCreator).registerAgent(
        "Test Agent",
        "Test Description",
        "Test Goal",
        carvId1,
        keywords,
        ethers.parseEther("0.1"),
        user1.address
      );

      const newKeywords = ["updated", "keywords"];
      await agent.connect(agentCreator).updateAgent(
        1,
        "Updated Agent",
        "Updated Description",
        "Updated Goal",
        newKeywords,
        ethers.parseEther("0.2"),
        user2.address
      );

      const agentData = await agent.getAgent(1);
      expect(agentData.name).to.equal("Updated Agent");
      expect(agentData.description).to.equal("Updated Description");
      expect(agentData.primaryGoal).to.equal("Updated Goal");
      expect(agentData.pricePerCall).to.equal(ethers.parseEther("0.2"));
      expect(agentData.receiverAddress).to.equal(user2.address);
    });

    it("Should handle agent calls with payment", async function () {
      const keywords = ["defi", "trading"];
      
      await agent.connect(agentCreator).registerAgent(
        "Test Agent",
        "Test Description",
        "Test Goal",
        carvId1,
        keywords,
        ethers.parseEther("0.1"),
        user1.address
      );

      const initialBalance = await ethers.provider.getBalance(user1.address);
      
      await agent.connect(user2).callAgent(1, { value: ethers.parseEther("0.1") });
      
      const finalBalance = await ethers.provider.getBalance(user1.address);
      expect(finalBalance).to.be.gt(initialBalance);
      
      const agentData = await agent.getAgent(1);
      expect(agentData.totalCalls).to.equal(1);
      expect(agentData.totalEarnings).to.equal(ethers.parseEther("0.1"));
    });

    it("Should search agents by keyword", async function () {
      await agent.connect(agentCreator).registerAgent(
        "Defi Agent",
        "Defi analysis",
        "Defi insights",
        carvId1,
        ["defi", "trading"],
        ethers.parseEther("0.1"),
        user1.address
      );

      await agent.connect(agentCreator).registerAgent(
        "Social Agent",
        "Social analysis",
        "Social insights",
        carvId2,
        ["social", "sentiment"],
        ethers.parseEther("0.2"),
        user2.address
      );

      const defiAgents = await agent.searchAgentsByKeyword("defi");
      expect(defiAgents.length).to.equal(1);
      expect(defiAgents[0]).to.equal(1);

      const socialAgents = await agent.searchAgentsByKeyword("social");
      expect(socialAgents.length).to.equal(1);
      expect(socialAgents[0]).to.equal(2);
    });

    it("Should get agents by creator and CARV ID", async function () {
      await agent.connect(agentCreator).registerAgent(
        "Agent 1",
        "Description 1",
        "Goal 1",
        carvId1,
        ["keyword1"],
        ethers.parseEther("0.1"),
        user1.address
      );

      await agent.connect(agentCreator).registerAgent(
        "Agent 2",
        "Description 2",
        "Goal 2",
        carvId2,
        ["keyword2"],
        ethers.parseEther("0.2"),
        user2.address
      );

      const creatorAgents = await agent.getAgentsByCreator(agentCreator.address);
      expect(creatorAgents.length).to.equal(2);
      expect(creatorAgents[0]).to.equal(1);
      expect(creatorAgents[1]).to.equal(2);

      const carvId1Agents = await agent.getAgentsByCarvId(carvId1);
      expect(carvId1Agents.length).to.equal(1);
      expect(carvId1Agents[0]).to.equal(1);

      const carvId2Agents = await agent.getAgentsByCarvId(carvId2);
      expect(carvId2Agents.length).to.equal(1);
      expect(carvId2Agents[0]).to.equal(2);
    });
  });
}); 