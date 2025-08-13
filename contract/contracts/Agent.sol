// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";

// AgentForge AI Agent Registration Contract
// Handles the registration and management of AI agents on the platform
contract Agent is Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _agentIdCounter;
    
    // Agent structure containing all form data
    struct AgentData {
        uint256 agentId;
        string name;
        string description;
        string primaryGoal;
        uint256 carvId;
        string[] keywords;
        uint256 pricePerCall;
        address receiverAddress;
        address creator;
        bool isActive;
        uint256 totalCalls;
        uint256 totalEarnings;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    // Mapping from agent ID to agent data
    mapping(uint256 => AgentData) public agents;
    
    // Mapping from creator address to their agent IDs
    mapping(address => uint256[]) public creatorAgents;
    
    // Mapping from CARV ID to agent IDs created by that user
    mapping(uint256 => uint256[]) public carvIdAgents;
    
    // Events
    event AgentRegistered(uint256 indexed agentId, string name, address indexed creator, uint256 carvId);
    event AgentUpdated(uint256 indexed agentId, string name);
    event AgentDeactivated(uint256 indexed agentId);
    event AgentActivated(uint256 indexed agentId);
    event AgentCalled(uint256 indexed agentId, address indexed caller, uint256 payment);
    
    constructor() Ownable() {}
    
    // Register a new AI agent with form data
    function registerAgent(
        string memory name,
        string memory description,
        string memory primaryGoal,
        uint256 carvId,
        string[] memory keywords,
        uint256 pricePerCall,
        address receiverAddress
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
        
        // Create new agent data
        agents[newAgentId] = AgentData({
            agentId: newAgentId,
            name: name,
            description: description,
            primaryGoal: primaryGoal,
            carvId: carvId,
            keywords: keywords,
            pricePerCall: pricePerCall,
            receiverAddress: receiverAddress,
            creator: msg.sender,
            isActive: true,
            totalCalls: 0,
            totalEarnings: 0,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        // Update mappings
        creatorAgents[msg.sender].push(newAgentId);
        carvIdAgents[carvId].push(newAgentId);
        
        emit AgentRegistered(newAgentId, name, msg.sender, carvId);
        
        return newAgentId;
    }
    
    // Update agent information (only creator can update)
    function updateAgent(
        uint256 agentId,
        string memory name,
        string memory description,
        string memory primaryGoal,
        string[] memory keywords,
        uint256 pricePerCall,
        address receiverAddress
    ) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can update");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        require(bytes(name).length > 0, "Agent: Name cannot be empty");
        require(bytes(description).length > 0, "Agent: Description cannot be empty");
        require(bytes(primaryGoal).length > 0, "Agent: Primary goal cannot be empty");
        require(keywords.length > 0, "Agent: At least one keyword required");
        require(pricePerCall > 0, "Agent: Price per call must be greater than 0");
        require(receiverAddress != address(0), "Agent: Receiver address cannot be zero");
        
        agents[agentId].name = name;
        agents[agentId].description = description;
        agents[agentId].primaryGoal = primaryGoal;
        agents[agentId].keywords = keywords;
        agents[agentId].pricePerCall = pricePerCall;
        agents[agentId].receiverAddress = receiverAddress;
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentUpdated(agentId, name);
    }
    
    // Deactivate an agent (only creator can deactivate)
    function deactivateAgent(uint256 agentId) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can deactivate");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        
        agents[agentId].isActive = false;
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentDeactivated(agentId);
    }
    
    // Activate an agent (only creator can activate)
    function activateAgent(uint256 agentId) public {
        require(agents[agentId].creator == msg.sender, "Agent: Only creator can activate");
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        
        agents[agentId].isActive = true;
        agents[agentId].lastUpdated = block.timestamp;
        
        emit AgentActivated(agentId);
    }
    
    // Call an agent (this would typically be called with payment)
    function callAgent(uint256 agentId) public payable {
        require(agents[agentId].agentId != 0, "Agent: Agent does not exist");
        require(agents[agentId].isActive, "Agent: Agent is not active");
        require(msg.value >= agents[agentId].pricePerCall, "Agent: Insufficient payment");
        
        // Update agent statistics
        agents[agentId].totalCalls = agents[agentId].totalCalls + 1;
        agents[agentId].totalEarnings = agents[agentId].totalEarnings + msg.value;
        
        // Transfer payment to receiver
        payable(agents[agentId].receiverAddress).transfer(msg.value);
        
        emit AgentCalled(agentId, msg.sender, msg.value);
    }
    
    // Get agent data by ID
    function getAgent(uint256 agentId) public view returns (AgentData memory) {
        return agents[agentId];
    }
    
    // Get all agents created by an address
    function getAgentsByCreator(address creator) public view returns (uint256[] memory) {
        return creatorAgents[creator];
    }
    
    // Get all agents created by a CARV ID
    function getAgentsByCarvId(uint256 carvId) public view returns (uint256[] memory) {
        return carvIdAgents[carvId];
    }
    
    // Get agent keywords
    function getAgentKeywords(uint256 agentId) public view returns (string[] memory) {
        return agents[agentId].keywords;
    }
    
    // Search agents by keyword
    function searchAgentsByKeyword(string memory keyword) public view returns (uint256[] memory) {
        uint256[] memory matchingAgents = new uint256[](_agentIdCounter.current());
        uint256 matchCount = 0;
        
        for (uint256 i = 1; i <= _agentIdCounter.current(); i++) {
            if (agents[i].agentId != 0 && agents[i].isActive) {
                string[] memory keywords = agents[i].keywords;
                for (uint256 j = 0; j < keywords.length; j++) {
                    if (keccak256(bytes(keywords[j])) == keccak256(bytes(keyword))) {
                        matchingAgents[matchCount] = i;
                        matchCount++;
                        break;
                    }
                }
            }
        }
        
        // Resize array to actual match count
        uint256[] memory result = new uint256[](matchCount);
        for (uint256 i = 0; i < matchCount; i++) {
            result[i] = matchingAgents[i];
        }
        
        return result;
    }
    
    // Get total number of agents
    function getTotalAgents() public view returns (uint256) {
        return _agentIdCounter.current();
    }
    
    // Get active agents count
    function getActiveAgentsCount() public view returns (uint256) {
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= _agentIdCounter.current(); i++) {
            if (agents[i].agentId != 0 && agents[i].isActive) {
                activeCount++;
            }
        }
        return activeCount;
    }
    
    // Get all agents information
    function getAllAgents() public view returns (AgentData[] memory) {
        uint256 totalAgents = _agentIdCounter.current();
        AgentData[] memory allAgents = new AgentData[](totalAgents);
        
        for (uint256 i = 1; i <= totalAgents; i++) {
            if (agents[i].agentId != 0) {
                allAgents[i - 1] = agents[i];
            }
        }
        
        return allAgents;
    }
}
