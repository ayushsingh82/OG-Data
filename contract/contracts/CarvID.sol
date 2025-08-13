// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

// CARV ID NFT contract for AgentForge - represents user identity and permissions
// Based on ERC-721 with granular access control for AI agents
contract CarvID is ERC721, ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;
    
    // Mapping to store agent access permissions for each CARV ID
    // carvId => agentAddress => dataTypeHash => hasAccess (bool)
    mapping(uint256 => mapping(address => mapping(bytes32 => bool))) public dataAccessPermissions;
    
    // Mapping to store user profile data
    mapping(uint256 => UserProfile) public userProfiles;
    
    // User profile structure
    struct UserProfile {
        string name;
        string description;
        uint256 reputationScore;
        uint256 totalInteractions;
        bool isActive;
        uint256 createdAt;
    }
    
    // Events
    event AccessGranted(uint256 indexed carvId, address indexed agentAddress, bytes32 indexed dataTypeHash);
    event AccessRevoked(uint256 indexed carvId, address indexed agentAddress, bytes32 indexed dataTypeHash);
    event ProfileUpdated(uint256 indexed carvId, string name, string description);
    event ReputationUpdated(uint256 indexed carvId, uint256 newScore);

    constructor() ERC721("AgentForge CARV ID", "CARVID") Ownable() {}

    // Mint a new CARV ID NFT to a user
    function mint(address to, uint256 carvId, string memory uri, string memory name, string memory description) public {
        require(to != address(0), "CarvID: mint to the zero address");
        require(_ownerOf(carvId) == address(0), "CarvID: token already minted");
        
        _mint(to, carvId);
        _setTokenURI(carvId, uri);
        
        // Initialize user profile
        userProfiles[carvId] = UserProfile({
            name: name,
            description: description,
            reputationScore: 50, // Default reputation score
            totalInteractions: 0,
            isActive: true,
            createdAt: block.timestamp
        });
        
        tokenIdCounter = tokenIdCounter + 1;
    }

    // Grant access to an AI agent for specific data type
    function grantAccess(uint256 carvId, address agentAddress, bytes32 dataTypeHash) public {
        require(ownerOf(carvId) == msg.sender || 
                getApproved(carvId) == msg.sender || 
                isApprovedForAll(ownerOf(carvId), msg.sender), 
                "CarvID: Caller is not owner nor approved");
        require(agentAddress != address(0), "CarvID: Agent address cannot be zero");
        
        dataAccessPermissions[carvId][agentAddress][dataTypeHash] = true;
        emit AccessGranted(carvId, agentAddress, dataTypeHash);
    }

    // Revoke access from an AI agent for specific data type
    function revokeAccess(uint256 carvId, address agentAddress, bytes32 dataTypeHash) public {
        require(ownerOf(carvId) == msg.sender || 
                getApproved(carvId) == msg.sender || 
                isApprovedForAll(ownerOf(carvId), msg.sender), 
                "CarvID: Caller is not owner nor approved");
        require(agentAddress != address(0), "CarvID: Agent address cannot be zero");
        
        dataAccessPermissions[carvId][agentAddress][dataTypeHash] = false;
        emit AccessRevoked(carvId, agentAddress, dataTypeHash);
    }

    // Check if agent has access to specific data type
    function hasAccess(uint256 carvId, address agentAddress, bytes32 dataTypeHash) public view returns (bool) {
        return dataAccessPermissions[carvId][agentAddress][dataTypeHash];
    }

    // Update user profile
    function updateProfile(uint256 carvId, string memory name, string memory description) public {
        require(ownerOf(carvId) == msg.sender, "CarvID: Caller is not owner");
        
        userProfiles[carvId].name = name;
        userProfiles[carvId].description = description;
        
        emit ProfileUpdated(carvId, name, description);
    }

    // Update reputation score (only callable by authorized agents)
    function updateReputation(uint256 carvId, uint256 newScore) public {
        require(newScore <= 100, "CarvID: Reputation score must be <= 100");
        // In a real system, this would have more complex authorization logic
        
        userProfiles[carvId].reputationScore = newScore;
        userProfiles[carvId].totalInteractions = userProfiles[carvId].totalInteractions + 1;
        
        emit ReputationUpdated(carvId, newScore);
    }

    // Get user profile
    function getUserProfile(uint256 carvId) public view returns (UserProfile memory) {
        return userProfiles[carvId];
    }

    // Batch grant access to multiple data types
    function batchGrantAccess(uint256 carvId, address agentAddress, bytes32[] memory dataTypeHashes) public {
        for (uint i = 0; i < dataTypeHashes.length; i++) {
            grantAccess(carvId, agentAddress, dataTypeHashes[i]);
        }
    }

    // Batch revoke access from multiple data types
    function batchRevokeAccess(uint256 carvId, address agentAddress, bytes32[] memory dataTypeHashes) public {
        for (uint i = 0; i < dataTypeHashes.length; i++) {
            revokeAccess(carvId, agentAddress, dataTypeHashes[i]);
        }
    }

    // Required overrides for ERC721URIStorage
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}
