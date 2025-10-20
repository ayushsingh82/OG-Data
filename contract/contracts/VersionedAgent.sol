// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/**
 * @title VersionedAgent
 * @dev Enhanced agent contract with version tracking and update mechanisms
 * @notice Implements Wave 3: Update mechanisms for AI agents with continuous improvement
 */
contract VersionedAgent is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _agentIdCounter;
    Counters.Counter private _versionCounter;
    
    // Agent version structure
    struct AgentVersion {
        uint256 versionId;
        uint256 agentId;
        string version;
        string name;
        string description;
        string primaryGoal;
        uint256 carvId;
        string[] keywords;
        uint256 pricePerCall;
        address receiverAddress;
        string metadataHash; // IPFS hash for agent code/config
        string[] dependencies; // Dependencies on other agents/datasets
        bool isActive;
        uint256 createdAt;
        address createdBy;
    }
    
    // Agent structure with version history
    struct Agent {
        uint256 agentId;
        string name;
        string description;
        address creator;
        uint256 carvId;
        bool isActive;
        uint256 totalCalls;
        uint256 totalEarnings;
        uint256 createdAt;
        uint256 lastUpdated;
        uint256 currentVersionId;
        uint256[] versionHistory;
        mapping(uint256 => AgentVersion) versions;
    }
    
    // Mapping from agent ID to agent data
    mapping(uint256 => Agent) public agents;
    
    // Mapping from creator address to their agent IDs
    mapping(address => uint256[]) public creatorAgents;
    
    // Mapping from CARV ID to agent IDs
    mapping(uint256 => uint256[]) public carvIdAgents;
    
    // Agent update policies
    struct UpdatePolicy {
        bool requiresApproval;
        uint256 minStakeAmount;
        uint256 approvalThreshold;
        address[] approvers;
        mapping(address => bool) isApprover;
    }
    
    mapping(uint256 => UpdatePolicy) public agentUpdatePolicies;
    
    // Events
    event AgentRegistered(uint256 indexed agentId, string name, address indexed creator, uint256 carvId);
    event AgentVersionCreated(uint256 indexed agentId, uint256 indexed versionId, string version);
    event AgentUpdated(uint256 indexed agentId, uint256 indexed versionId, string version);
    event AgentDeactivated(uint256 indexed agentId);
    event AgentActivated(uint256 indexed agentId);
    event AgentCalled(uint256 indexed agentId, uint256 indexed versionId, address indexed caller, uint256 payment);
    event UpdatePolicySet(uint256 indexed agentId, bool requiresApproval, uint256 minStakeAmount);
    
    constructor() Ownable() {}
    
    /**
     * @dev Register a new AI agent with initial version
     */
    function registerAgent(
        string memory name,
        string memory description,
        string memory primaryGoal,
        uint256 carvId,
        string[] memory keywords,
        uint256 pricePerCall,
        address receiverAddress,
        string memory metadataHash,
        string[] memory dependencies
    ) public returns (uint256) {
        require(bytes(name).length > 0, "Agent: Name cannot be empty");
        require(bytes(description).length > 0, "Agent: Description cannot be empty");
        require(bytes(primaryGoal).length > 0, "Agent: Primary goal cannot be empty");
        require(carvId > 0, "Agent: CARV ID must be greater than 0");
        require(keywords.length > 0, "Agent: At least one keyword required");
        require(pricePerCall > 0, "Agent: Price per call must be greater than 0");
        require(receiverAddress != address(0), "Agent: Receiver address cannot be zero");
        
        _agentIdCounter.increment();
        uint256 newAgentId = _agentIdCounter.current();
        
        // Create new agent
        Agent storage agent = agents[newAgentId];
        agent.agentId = newAgentId;
        agent.name = name;
        agent.description = description;
        agent.creator = msg.sender;
        agent.carvId = carvId;
        agent.isActive = true;
        agent.totalCalls = 0;
        agent.totalEarnings = 0;
        agent.createdAt = block.timestamp;
        agent.lastUpdated = block.timestamp;
        
        // Create initial version
        _versionCounter.increment();
        uint256 initialVersionId = _versionCounter.current();
        
        agent.versions[initialVersionId] = AgentVersion({
            versionId: initialVersionId,
            agentId: newAgentId,
            version: "1.0.0",
            name: name,
            description: description,
            primaryGoal: primaryGoal,
            carvId: carvId,
            keywords: keywords,
            pricePerCall: pricePerCall,
            receiverAddress: receiverAddress,
            metadataHash: metadataHash,
            dependencies: dependencies,
            isActive: true,
            createdAt: block.timestamp,
            createdBy: msg.sender
        });
        
        agent.currentVersionId = initialVersionId;
        agent.versionHistory.push(initialVersionId);
        
        // Update mappings
        creatorAgents[msg.sender].push(newAgentId);
        carvIdAgents[carvId].push(newAgentId);
        
        emit AgentRegistered(newAgentId, name, msg.sender, carvId);
        emit AgentVersionCreated(newAgentId, initialVersionId, "1.0.0");
        
        return newAgentId;
    }
    
    /**
     * @dev Create a new version of an existing agent
     */
    function createAgentVersion(
        uint256 agentId,
        string memory version,
        string memory name,
        string memory description,
        string memory primaryGoal,
        string[] memory keywords,
        uint256 pricePerCall,
        address receiverAddress,
        string memory metadataHash,
        string[] memory dependencies
    ) public nonReentrant returns (uint256) {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can create versions");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        require(bytes(version).length > 0, "Agent: Version cannot be empty");
        require(bytes(name).length > 0, "Agent: Name cannot be empty");
        require(bytes(description).length > 0, "Agent: Description cannot be empty");
        require(bytes(primaryGoal).length > 0, "Agent: Primary goal cannot be empty");
        require(keywords.length > 0, "Agent: At least one keyword required");
        require(pricePerCall > 0, "Agent: Price per call must be greater than 0");
        require(receiverAddress != address(0), "Agent: Receiver address cannot be zero");
        
        // Check update policy if exists
        UpdatePolicy storage policy = agentUpdatePolicies[agentId];
        if (policy.requiresApproval) {
            // In a real implementation, this would check for approvals
            // For now, we'll skip the approval check
        }
        
        _versionCounter.increment();
        uint256 newVersionId = _versionCounter.current();
        
        agents[agentId].versions[newVersionId] = AgentVersion({
            versionId: newVersionId,
            agentId: agentId,
            version: version,
            name: name,
            description: description,
            primaryGoal: primaryGoal,
            carvId: agents[agentId].carvId,
            keywords: keywords,
            pricePerCall: pricePerCall,
            receiverAddress: receiverAddress,
            metadataHash: metadataHash,
            dependencies: dependencies,
            isActive: true,
            createdAt: block.timestamp,
            createdBy: msg.sender
        });
        
        agents[agentId].versionHistory.push(newVersionId);
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentVersionCreated(agentId, newVersionId, version);
        
        return newVersionId;
    }
    
    /**
     * @dev Set the current active version of an agent
     */
    function setCurrentVersion(uint256 agentId, uint256 versionId) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can set version");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        require(agents[agentId].versions[versionId].versionId != 0, "Agent: Version does not exist");
        
        agents[agentId].currentVersionId = versionId;
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentUpdated(agentId, versionId, agents[agentId].versions[versionId].version);
    }
    
    /**
     * @dev Set update policy for an agent
     */
    function setUpdatePolicy(
        uint256 agentId,
        bool requiresApproval,
        uint256 minStakeAmount,
        uint256 approvalThreshold,
        address[] memory approvers
    ) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can set policy");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        
        UpdatePolicy storage policy = agentUpdatePolicies[agentId];
        policy.requiresApproval = requiresApproval;
        policy.minStakeAmount = minStakeAmount;
        policy.approvalThreshold = approvalThreshold;
        
        // Clear existing approvers
        for (uint256 i = 0; i < policy.approvers.length; i++) {
            policy.isApprover[policy.approvers[i]] = false;
        }
        
        // Set new approvers
        policy.approvers = approvers;
        for (uint256 i = 0; i < approvers.length; i++) {
            policy.isApprover[approvers[i]] = true;
        }
        
        emit UpdatePolicySet(agentId, requiresApproval, minStakeAmount);
    }
    
    /**
     * @dev Call an agent (uses current version)
     */
    function callAgent(uint256 agentId) public payable nonReentrant {
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        require(agents[agentId].isActive, "Agent: Agent is not active");
        
        uint256 currentVersionId = agents[agentId].currentVersionId;
        AgentVersion storage version = agents[agentId].versions[currentVersionId];
        
        require(version.isActive, "Agent: Current version is not active");
        require(msg.value >= version.pricePerCall, "Agent: Insufficient payment");
        
        // Update agent statistics
        agents[agentId].totalCalls = agents[agentId].totalCalls + 1;
        agents[agentId].totalEarnings = agents[agentId].totalEarnings + msg.value;
        
        // Transfer payment to receiver
        payable(version.receiverAddress).transfer(msg.value);
        
        emit AgentCalled(agentId, currentVersionId, msg.sender, msg.value);
    }
    
    /**
     * @dev Get agent version by ID
     */
    function getAgentVersion(uint256 agentId, uint256 versionId) public view returns (AgentVersion memory) {
        return agents[agentId].versions[versionId];
    }
    
    /**
     * @dev Get current agent version
     */
    function getCurrentAgentVersion(uint256 agentId) public view returns (AgentVersion memory) {
        uint256 currentVersionId = agents[agentId].currentVersionId;
        return agents[agentId].versions[currentVersionId];
    }
    
    /**
     * @dev Get agent version history
     */
    function getAgentVersionHistory(uint256 agentId) public view returns (uint256[] memory) {
        return agents[agentId].versionHistory;
    }
    
    /**
     * @dev Get agent update policy
     */
    function getAgentUpdatePolicy(uint256 agentId) public view returns (
        bool requiresApproval,
        uint256 minStakeAmount,
        uint256 approvalThreshold,
        address[] memory approvers
    ) {
        UpdatePolicy storage policy = agentUpdatePolicies[agentId];
        return (
            policy.requiresApproval,
            policy.minStakeAmount,
            policy.approvalThreshold,
            policy.approvers
        );
    }
    
    /**
     * @dev Deactivate an agent
     */
    function deactivateAgent(uint256 agentId) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can deactivate");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        
        agents[agentId].isActive = false;
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentDeactivated(agentId);
    }
    
    /**
     * @dev Activate an agent
     */
    function activateAgent(uint256 agentId) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can activate");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        
        agents[agentId].isActive = true;
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentActivated(agentId);
    }
    
    /**
     * @dev Get all agents created by an address
     */
    function getAgentsByCreator(address creator) public view returns (uint256[] memory) {
        return creatorAgents[creator];
    }
    
    /**
     * @dev Get all agents created by a CARV ID
     */
    function getAgentsByCarvId(uint256 carvId) public view returns (uint256[] memory) {
        return carvIdAgents[carvId];
    }
    
    /**
     * @dev Get total number of agents
     */
    function getTotalAgents() public view returns (uint256) {
        return _agentIdCounter.current();
    }
    
    /**
     * @dev Get total number of versions
     */
    function getTotalVersions() public view returns (uint256) {
        return _versionCounter.current();
    }
}

