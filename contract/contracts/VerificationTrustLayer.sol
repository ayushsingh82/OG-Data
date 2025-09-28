// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/**
 * @title VerificationTrustLayer
 * @dev Cryptographic verification system for dataset authenticity and AI agent outputs
 * @notice Implements Wave 3: Strengthen verification and trust layer with cryptographic proofs
 */
contract VerificationTrustLayer is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _proofIdCounter;
    Counters.Counter private _verificationIdCounter;
    
    // Cryptographic proof structure
    struct CryptographicProof {
        uint256 proofId;
        uint256 itemId;
        string itemType; // "dataset" or "agent"
        string proofType; // "merkle", "zkp", "tee", "consensus"
        string proofData; // Encoded proof data
        string verificationHash; // Hash of the verification result
        address verifier;
        uint256 createdAt;
        bool isValid;
        uint256 confidence; // 0-100 confidence score
    }
    
    // Dataset authenticity verification
    struct DatasetVerification {
        uint256 datasetId;
        string dataHash; // 0G storage hash
        string merkleRoot; // Merkle tree root
        uint256 dataSize;
        string format;
        bool isVerified;
        uint256 verificationScore; // 0-100
        uint256[] proofIds;
        uint256 lastVerified;
        address verifiedBy;
    }
    
    // AI agent output verification
    struct AgentVerification {
        uint256 agentId;
        uint256 versionId;
        string executionHash; // Hash of execution trace
        string outputHash; // Hash of agent output
        string proofOfExecution; // PoE data
        bool isVerified;
        uint256 verificationScore; // 0-100
        uint256[] proofIds;
        uint256 lastVerified;
        address verifiedBy;
    }
    
    // Verification provider registry
    struct VerificationProvider {
        address provider;
        string name;
        string[] supportedTypes;
        bool isActive;
        uint256 reputation;
        uint256 totalVerifications;
        uint256 successfulVerifications;
        uint256 createdAt;
    }
    
    // Mapping from proof ID to proof data
    mapping(uint256 => CryptographicProof) public proofs;
    
    // Mapping from dataset ID to verification data
    mapping(uint256 => DatasetVerification) public datasetVerifications;
    
    // Mapping from agent ID to verification data
    mapping(uint256 => AgentVerification) public agentVerifications;
    
    // Mapping from provider address to provider data
    mapping(address => VerificationProvider) public verificationProviders;
    
    // Mapping from item ID to proof IDs
    mapping(string => mapping(uint256 => uint256[])) public itemProofs; // itemType => itemId => proofIds[]
    
    // Trust score calculation
    struct TrustScore {
        uint256 itemId;
        string itemType;
        uint256 overallScore; // 0-100
        uint256 authenticityScore; // 0-100
        uint256 executionScore; // 0-100
        uint256 communityScore; // 0-100
        uint256 lastUpdated;
    }
    
    mapping(string => mapping(uint256 => TrustScore)) public trustScores; // itemType => itemId => TrustScore
    
    // Events
    event ProofCreated(uint256 indexed proofId, uint256 indexed itemId, string itemType, string proofType);
    event DatasetVerified(uint256 indexed datasetId, uint256 verificationScore, address indexed verifier);
    event AgentVerified(uint256 indexed agentId, uint256 versionId, uint256 verificationScore, address indexed verifier);
    event VerificationProviderRegistered(address indexed provider, string name);
    event TrustScoreUpdated(uint256 indexed itemId, string itemType, uint256 overallScore);
    event ProofInvalidated(uint256 indexed proofId, string reason);
    
    constructor() Ownable() {}
    
    /**
     * @dev Register a verification provider
     */
    function registerVerificationProvider(
        string memory name,
        string[] memory supportedTypes
    ) public returns (bool) {
        require(bytes(name).length > 0, "Verification: Name cannot be empty");
        require(supportedTypes.length > 0, "Verification: At least one supported type required");
        
        verificationProviders[msg.sender] = VerificationProvider({
            provider: msg.sender,
            name: name,
            supportedTypes: supportedTypes,
            isActive: true,
            reputation: 50, // Initial reputation
            totalVerifications: 0,
            successfulVerifications: 0,
            createdAt: block.timestamp
        });
        
        emit VerificationProviderRegistered(msg.sender, name);
        return true;
    }
    
    /**
     * @dev Create a cryptographic proof
     */
    function createProof(
        uint256 itemId,
        string memory itemType,
        string memory proofType,
        string memory proofData,
        string memory verificationHash,
        uint256 confidence
    ) public returns (uint256) {
        require(bytes(itemType).length > 0, "Verification: Item type cannot be empty");
        require(bytes(proofType).length > 0, "Verification: Proof type cannot be empty");
        require(bytes(proofData).length > 0, "Verification: Proof data cannot be empty");
        require(bytes(verificationHash).length > 0, "Verification: Verification hash cannot be empty");
        require(confidence >= 0 && confidence <= 100, "Verification: Confidence must be 0-100");
        
        // Verify provider is registered
        require(verificationProviders[msg.sender].isActive, "Verification: Provider not registered");
        
        _proofIdCounter.increment();
        uint256 newProofId = _proofIdCounter.current();
        
        proofs[newProofId] = CryptographicProof({
            proofId: newProofId,
            itemId: itemId,
            itemType: itemType,
            proofType: proofType,
            proofData: proofData,
            verificationHash: verificationHash,
            verifier: msg.sender,
            createdAt: block.timestamp,
            isValid: true,
            confidence: confidence
        });
        
        // Update item proofs mapping
        itemProofs[itemType][itemId].push(newProofId);
        
        // Update provider statistics
        verificationProviders[msg.sender].totalVerifications = verificationProviders[msg.sender].totalVerifications + 1;
        
        emit ProofCreated(newProofId, itemId, itemType, proofType);
        
        return newProofId;
    }
    
    /**
     * @dev Verify dataset authenticity
     */
    function verifyDataset(
        uint256 datasetId,
        string memory dataHash,
        string memory merkleRoot,
        uint256 dataSize,
        string memory format,
        uint256[] memory proofIds
    ) public returns (bool) {
        require(bytes(dataHash).length > 0, "Verification: Data hash cannot be empty");
        require(bytes(merkleRoot).length > 0, "Verification: Merkle root cannot be empty");
        require(dataSize > 0, "Verification: Data size must be greater than 0");
        require(bytes(format).length > 0, "Verification: Format cannot be empty");
        require(proofIds.length > 0, "Verification: At least one proof required");
        
        // Verify provider is registered
        require(verificationProviders[msg.sender].isActive, "Verification: Provider not registered");
        
        // Validate all proofs
        uint256 validProofs = 0;
        uint256 totalConfidence = 0;
        
        for (uint256 i = 0; i < proofIds.length; i++) {
            CryptographicProof storage proof = proofs[proofIds[i]];
            require(proof.isValid, "Verification: Invalid proof");
            require(keccak256(bytes(proof.itemType)) == keccak256(bytes("dataset")), "Verification: Wrong item type");
            require(proof.itemId == datasetId, "Verification: Proof item ID mismatch");
            
            validProofs++;
            totalConfidence += proof.confidence;
        }
        
        // Calculate verification score
        uint256 verificationScore = totalConfidence / validProofs;
        
        // Update dataset verification
        datasetVerifications[datasetId] = DatasetVerification({
            datasetId: datasetId,
            dataHash: dataHash,
            merkleRoot: merkleRoot,
            dataSize: dataSize,
            format: format,
            isVerified: true,
            verificationScore: verificationScore,
            proofIds: proofIds,
            lastVerified: block.timestamp,
            verifiedBy: msg.sender
        });
        
        // Update provider reputation
        verificationProviders[msg.sender].successfulVerifications = verificationProviders[msg.sender].successfulVerifications + 1;
        _updateProviderReputation(msg.sender);
        
        // Update trust score
        _updateTrustScore(datasetId, "dataset", verificationScore, 0, 0);
        
        emit DatasetVerified(datasetId, verificationScore, msg.sender);
        
        return true;
    }
    
    /**
     * @dev Verify AI agent execution
     */
    function verifyAgentExecution(
        uint256 agentId,
        uint256 versionId,
        string memory executionHash,
        string memory outputHash,
        string memory proofOfExecution,
        uint256[] memory proofIds
    ) public returns (bool) {
        require(bytes(executionHash).length > 0, "Verification: Execution hash cannot be empty");
        require(bytes(outputHash).length > 0, "Verification: Output hash cannot be empty");
        require(bytes(proofOfExecution).length > 0, "Verification: Proof of execution cannot be empty");
        require(proofIds.length > 0, "Verification: At least one proof required");
        
        // Verify provider is registered
        require(verificationProviders[msg.sender].isActive, "Verification: Provider not registered");
        
        // Validate all proofs
        uint256 validProofs = 0;
        uint256 totalConfidence = 0;
        
        for (uint256 i = 0; i < proofIds.length; i++) {
            CryptographicProof storage proof = proofs[proofIds[i]];
            require(proof.isValid, "Verification: Invalid proof");
            require(keccak256(bytes(proof.itemType)) == keccak256(bytes("agent")), "Verification: Wrong item type");
            require(proof.itemId == agentId, "Verification: Proof item ID mismatch");
            
            validProofs++;
            totalConfidence += proof.confidence;
        }
        
        // Calculate verification score
        uint256 verificationScore = totalConfidence / validProofs;
        
        // Update agent verification
        agentVerifications[agentId] = AgentVerification({
            agentId: agentId,
            versionId: versionId,
            executionHash: executionHash,
            outputHash: outputHash,
            proofOfExecution: proofOfExecution,
            isVerified: true,
            verificationScore: verificationScore,
            proofIds: proofIds,
            lastVerified: block.timestamp,
            verifiedBy: msg.sender
        });
        
        // Update provider reputation
        verificationProviders[msg.sender].successfulVerifications = verificationProviders[msg.sender].successfulVerifications + 1;
        _updateProviderReputation(msg.sender);
        
        // Update trust score
        _updateTrustScore(agentId, "agent", 0, verificationScore, 0);
        
        emit AgentVerified(agentId, versionId, verificationScore, msg.sender);
        
        return true;
    }
    
    /**
     * @dev Invalidate a proof
     */
    function invalidateProof(uint256 proofId, string memory reason) public onlyOwner {
        require(proofs[proofId].proofId != 0, "Verification: Proof does not exist");
        require(proofs[proofId].isValid, "Verification: Proof already invalid");
        
        proofs[proofId].isValid = false;
        
        emit ProofInvalidated(proofId, reason);
    }
    
    /**
     * @dev Get dataset verification status
     */
    function getDatasetVerification(uint256 datasetId) public view returns (DatasetVerification memory) {
        return datasetVerifications[datasetId];
    }
    
    /**
     * @dev Get agent verification status
     */
    function getAgentVerification(uint256 agentId) public view returns (AgentVerification memory) {
        return agentVerifications[agentId];
    }
    
    /**
     * @dev Get trust score for an item
     */
    function getTrustScore(uint256 itemId, string memory itemType) public view returns (TrustScore memory) {
        return trustScores[itemType][itemId];
    }
    
    /**
     * @dev Get verification provider info
     */
    function getVerificationProvider(address provider) public view returns (VerificationProvider memory) {
        return verificationProviders[provider];
    }
    
    /**
     * @dev Get proofs for an item
     */
    function getItemProofs(uint256 itemId, string memory itemType) public view returns (uint256[] memory) {
        return itemProofs[itemType][itemId];
    }
    
    /**
     * @dev Get proof by ID
     */
    function getProof(uint256 proofId) public view returns (CryptographicProof memory) {
        return proofs[proofId];
    }
    
    /**
     * @dev Internal function to update provider reputation
     */
    function _updateProviderReputation(address provider) internal {
        VerificationProvider storage prov = verificationProviders[provider];
        
        if (prov.totalVerifications > 0) {
            uint256 successRate = (prov.successfulVerifications * 100) / prov.totalVerifications;
            prov.reputation = successRate;
        }
    }
    
    /**
     * @dev Internal function to update trust score
     */
    function _updateTrustScore(
        uint256 itemId,
        string memory itemType,
        uint256 authenticityScore,
        uint256 executionScore,
        uint256 communityScore
    ) internal {
        TrustScore storage score = trustScores[itemType][itemId];
        
        if (score.itemId == 0) {
            score.itemId = itemId;
            score.itemType = itemType;
            score.overallScore = 0;
            score.authenticityScore = 0;
            score.executionScore = 0;
            score.communityScore = 0;
        }
        
        if (authenticityScore > 0) {
            score.authenticityScore = authenticityScore;
        }
        if (executionScore > 0) {
            score.executionScore = executionScore;
        }
        if (communityScore > 0) {
            score.communityScore = communityScore;
        }
        
        // Calculate overall score (weighted average)
        uint256 totalWeight = 0;
        uint256 weightedSum = 0;
        
        if (score.authenticityScore > 0) {
            totalWeight += 3; // 30% weight
            weightedSum += score.authenticityScore * 3;
        }
        if (score.executionScore > 0) {
            totalWeight += 4; // 40% weight
            weightedSum += score.executionScore * 4;
        }
        if (score.communityScore > 0) {
            totalWeight += 3; // 30% weight
            weightedSum += score.communityScore * 3;
        }
        
        if (totalWeight > 0) {
            score.overallScore = weightedSum / totalWeight;
        }
        
        score.lastUpdated = block.timestamp;
        
        emit TrustScoreUpdated(itemId, itemType, score.overallScore);
    }
    
    /**
     * @dev Update community score (called by external contracts)
     */
    function updateCommunityScore(uint256 itemId, string memory itemType, uint256 communityScore) public {
        require(msg.sender == owner() || verificationProviders[msg.sender].isActive, "Verification: Not authorized");
        
        TrustScore storage score = trustScores[itemType][itemId];
        if (score.itemId == 0) {
            score.itemId = itemId;
            score.itemType = itemType;
            score.overallScore = 0;
            score.authenticityScore = 0;
            score.executionScore = 0;
            score.communityScore = 0;
        }
        
        score.communityScore = communityScore;
        
        // Recalculate overall score
        uint256 totalWeight = 0;
        uint256 weightedSum = 0;
        
        if (score.authenticityScore > 0) {
            totalWeight += 3;
            weightedSum += score.authenticityScore * 3;
        }
        if (score.executionScore > 0) {
            totalWeight += 4;
            weightedSum += score.executionScore * 4;
        }
        if (score.communityScore > 0) {
            totalWeight += 3;
            weightedSum += score.communityScore * 3;
        }
        
        if (totalWeight > 0) {
            score.overallScore = weightedSum / totalWeight;
        }
        
        score.lastUpdated = block.timestamp;
        
        emit TrustScoreUpdated(itemId, itemType, score.overallScore);
    }
}
