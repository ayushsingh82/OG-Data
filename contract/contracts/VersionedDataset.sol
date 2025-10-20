// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/**
 * @title VersionedDataset
 * @dev Enhanced dataset contract with version tracking and update mechanisms
 * @notice Implements Wave 3: Update mechanisms for datasets with continuous improvement
 */
contract VersionedDataset is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _datasetIdCounter;
    Counters.Counter private _versionCounter;
    
    // Dataset version structure
    struct DatasetVersion {
        uint256 versionId;
        uint256 datasetId;
        string version;
        string title;
        string description;
        string category;
        uint256 carvId;
        string[] tags;
        uint256 price;
        address receiverAddress;
        string dataHash; // 0G storage hash for dataset
        string metadataHash; // IPFS hash for dataset metadata
        uint256 size; // Dataset size in bytes
        string format; // Data format (CSV, JSON, etc.)
        string[] dependencies; // Dependencies on other datasets
        bool isActive;
        uint256 createdAt;
        address createdBy;
        uint256 downloads;
        uint256 purchases;
    }
    
    // Dataset structure with version history
    struct Dataset {
        uint256 datasetId;
        string title;
        string description;
        string category;
        address creator;
        uint256 carvId;
        bool isActive;
        uint256 totalDownloads;
        uint256 totalPurchases;
        uint256 totalEarnings;
        uint256 createdAt;
        uint256 lastUpdated;
        uint256 currentVersionId;
        uint256[] versionHistory;
        mapping(uint256 => DatasetVersion) versions;
    }
    
    // Mapping from dataset ID to dataset data
    mapping(uint256 => Dataset) public datasets;
    
    // Mapping from creator address to their dataset IDs
    mapping(address => uint256[]) public creatorDatasets;
    
    // Mapping from CARV ID to dataset IDs
    mapping(uint256 => uint256[]) public carvIdDatasets;
    
    // Dataset update policies
    struct UpdatePolicy {
        bool requiresApproval;
        uint256 minStakeAmount;
        uint256 approvalThreshold;
        address[] approvers;
        mapping(address => bool) isApprover;
        bool allowAutomaticUpdates;
        uint256 maxUpdateFrequency; // Minimum time between updates
    }
    
    mapping(uint256 => UpdatePolicy) public datasetUpdatePolicies;
    
    // Dataset access control
    mapping(uint256 => mapping(address => bool)) public datasetAccess;
    mapping(uint256 => mapping(address => uint256)) public accessExpiry;
    
    // Events
    event DatasetRegistered(uint256 indexed datasetId, string title, address indexed creator, uint256 carvId);
    event DatasetVersionCreated(uint256 indexed datasetId, uint256 indexed versionId, string version);
    event DatasetUpdated(uint256 indexed datasetId, uint256 indexed versionId, string version);
    event DatasetDeactivated(uint256 indexed datasetId);
    event DatasetActivated(uint256 indexed datasetId);
    event DatasetPurchased(uint256 indexed datasetId, uint256 indexed versionId, address indexed buyer, uint256 price);
    event DatasetDownloaded(uint256 indexed datasetId, uint256 indexed versionId, address indexed downloader);
    event UpdatePolicySet(uint256 indexed datasetId, bool requiresApproval, uint256 minStakeAmount);
    event AccessGranted(uint256 indexed datasetId, address indexed user, uint256 expiry);
    
    constructor() Ownable() {}
    
    /**
     * @dev Register a new dataset with initial version
     */
    function registerDataset(
        string memory title,
        string memory description,
        string memory category,
        uint256 carvId,
        string[] memory tags,
        uint256 price,
        address receiverAddress,
        string memory dataHash,
        string memory metadataHash,
        uint256 size,
        string memory format,
        string[] memory dependencies
    ) public returns (uint256) {
        require(bytes(title).length > 0, "Dataset: Title cannot be empty");
        require(bytes(description).length > 0, "Dataset: Description cannot be empty");
        require(bytes(category).length > 0, "Dataset: Category cannot be empty");
        require(carvId > 0, "Dataset: CARV ID must be greater than 0");
        require(tags.length > 0, "Dataset: At least one tag required");
        require(price >= 0, "Dataset: Price cannot be negative");
        require(receiverAddress != address(0), "Dataset: Receiver address cannot be zero");
        require(bytes(dataHash).length > 0, "Dataset: Data hash cannot be empty");
        require(size > 0, "Dataset: Size must be greater than 0");
        require(bytes(format).length > 0, "Dataset: Format cannot be empty");
        
        _datasetIdCounter.increment();
        uint256 newDatasetId = _datasetIdCounter.current();
        
        // Create new dataset
        Dataset storage dataset = datasets[newDatasetId];
        dataset.datasetId = newDatasetId;
        dataset.title = title;
        dataset.description = description;
        dataset.category = category;
        dataset.creator = msg.sender;
        dataset.carvId = carvId;
        dataset.isActive = true;
        dataset.totalDownloads = 0;
        dataset.totalPurchases = 0;
        dataset.totalEarnings = 0;
        dataset.createdAt = block.timestamp;
        dataset.lastUpdated = block.timestamp;
        
        // Create initial version
        _versionCounter.increment();
        uint256 initialVersionId = _versionCounter.current();
        
        dataset.versions[initialVersionId] = DatasetVersion({
            versionId: initialVersionId,
            datasetId: newDatasetId,
            version: "1.0.0",
            title: title,
            description: description,
            category: category,
            carvId: carvId,
            tags: tags,
            price: price,
            receiverAddress: receiverAddress,
            dataHash: dataHash,
            metadataHash: metadataHash,
            size: size,
            format: format,
            dependencies: dependencies,
            isActive: true,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            downloads: 0,
            purchases: 0
        });
        
        dataset.currentVersionId = initialVersionId;
        dataset.versionHistory.push(initialVersionId);
        
        // Update mappings
        creatorDatasets[msg.sender].push(newDatasetId);
        carvIdDatasets[carvId].push(newDatasetId);
        
        emit DatasetRegistered(newDatasetId, title, msg.sender, carvId);
        emit DatasetVersionCreated(newDatasetId, initialVersionId, "1.0.0");
        
        return newDatasetId;
    }
    
    /**
     * @dev Create a new version of an existing dataset
     */
    function createDatasetVersion(
        uint256 datasetId,
        string memory version,
        string memory title,
        string memory description,
        string[] memory tags,
        uint256 price,
        address receiverAddress,
        string memory dataHash,
        string memory metadataHash,
        uint256 size,
        string memory format,
        string[] memory dependencies
    ) public nonReentrant returns (uint256) {
        require(datasets[datasetId].creator == msg.sender, "Dataset: Only creator can create versions");
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        require(bytes(version).length > 0, "Dataset: Version cannot be empty");
        require(bytes(title).length > 0, "Dataset: Title cannot be empty");
        require(bytes(description).length > 0, "Dataset: Description cannot be empty");
        require(tags.length > 0, "Dataset: At least one tag required");
        require(price >= 0, "Dataset: Price cannot be negative");
        require(receiverAddress != address(0), "Dataset: Receiver address cannot be zero");
        require(bytes(dataHash).length > 0, "Dataset: Data hash cannot be empty");
        require(size > 0, "Dataset: Size must be greater than 0");
        require(bytes(format).length > 0, "Dataset: Format cannot be empty");
        
        // Check update policy if exists
        UpdatePolicy storage policy = datasetUpdatePolicies[datasetId];
        if (policy.requiresApproval) {
            // In a real implementation, this would check for approvals
            // For now, we'll skip the approval check
        }
        
        // Check update frequency if policy exists
        if (policy.maxUpdateFrequency > 0) {
            require(
                block.timestamp >= datasets[datasetId].lastUpdated + policy.maxUpdateFrequency,
                "Dataset: Update frequency too high"
            );
        }
        
        _versionCounter.increment();
        uint256 newVersionId = _versionCounter.current();
        
        datasets[datasetId].versions[newVersionId] = DatasetVersion({
            versionId: newVersionId,
            datasetId: datasetId,
            version: version,
            title: title,
            description: description,
            category: datasets[datasetId].category,
            carvId: datasets[datasetId].carvId,
            tags: tags,
            price: price,
            receiverAddress: receiverAddress,
            dataHash: dataHash,
            metadataHash: metadataHash,
            size: size,
            format: format,
            dependencies: dependencies,
            isActive: true,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            downloads: 0,
            purchases: 0
        });
        
        datasets[datasetId].versionHistory.push(newVersionId);
        datasets[datasetId].lastUpdated = block.timestamp;
        
        emit DatasetVersionCreated(datasetId, newVersionId, version);
        
        return newVersionId;
    }
    
    /**
     * @dev Set the current active version of a dataset
     */
    function setCurrentVersion(uint256 datasetId, uint256 versionId) public {
        require(datasets[datasetId].creator == msg.sender, "Dataset: Only creator can set version");
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        require(datasets[datasetId].versions[versionId].versionId != 0, "Dataset: Version does not exist");
        
        datasets[datasetId].currentVersionId = versionId;
        datasets[datasetId].lastUpdated = block.timestamp;
        
        emit DatasetUpdated(datasetId, versionId, datasets[datasetId].versions[versionId].version);
    }
    
    /**
     * @dev Purchase access to a dataset
     */
    function purchaseDataset(uint256 datasetId) public payable nonReentrant {
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        require(datasets[datasetId].isActive, "Dataset: Dataset is not active");
        
        uint256 currentVersionId = datasets[datasetId].currentVersionId;
        DatasetVersion storage version = datasets[datasetId].versions[currentVersionId];
        
        require(version.isActive, "Dataset: Current version is not active");
        require(msg.value >= version.price, "Dataset: Insufficient payment");
        
        // Grant access
        datasetAccess[datasetId][msg.sender] = true;
        accessExpiry[datasetId][msg.sender] = block.timestamp + 365 days; // 1 year access
        
        // Update statistics
        datasets[datasetId].totalPurchases = datasets[datasetId].totalPurchases + 1;
        datasets[datasetId].totalEarnings = datasets[datasetId].totalEarnings + msg.value;
        version.purchases = version.purchases + 1;
        
        // Transfer payment to receiver
        payable(version.receiverAddress).transfer(msg.value);
        
        emit DatasetPurchased(datasetId, currentVersionId, msg.sender, msg.value);
    }
    
    /**
     * @dev Download a dataset (requires purchase or free access)
     */
    function downloadDataset(uint256 datasetId) public {
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        require(datasets[datasetId].isActive, "Dataset: Dataset is not active");
        
        uint256 currentVersionId = datasets[datasetId].currentVersionId;
        DatasetVersion storage version = datasets[datasetId].versions[currentVersionId];
        
        require(version.isActive, "Dataset: Current version is not active");
        
        // Check if user has access (purchased or free dataset)
        require(
            datasetAccess[datasetId][msg.sender] || 
            version.price == 0 || 
            accessExpiry[datasetId][msg.sender] > block.timestamp,
            "Dataset: Access required"
        );
        
        // Update statistics
        datasets[datasetId].totalDownloads = datasets[datasetId].totalDownloads + 1;
        version.downloads = version.downloads + 1;
        
        emit DatasetDownloaded(datasetId, currentVersionId, msg.sender);
    }
    
    /**
     * @dev Set update policy for a dataset
     */
    function setUpdatePolicy(
        uint256 datasetId,
        bool requiresApproval,
        uint256 minStakeAmount,
        uint256 approvalThreshold,
        address[] memory approvers,
        bool allowAutomaticUpdates,
        uint256 maxUpdateFrequency
    ) public {
        require(datasets[datasetId].creator == msg.sender, "Dataset: Only creator can set policy");
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        
        UpdatePolicy storage policy = datasetUpdatePolicies[datasetId];
        policy.requiresApproval = requiresApproval;
        policy.minStakeAmount = minStakeAmount;
        policy.approvalThreshold = approvalThreshold;
        policy.allowAutomaticUpdates = allowAutomaticUpdates;
        policy.maxUpdateFrequency = maxUpdateFrequency;
        
        // Clear existing approvers
        for (uint256 i = 0; i < policy.approvers.length; i++) {
            policy.isApprover[policy.approvers[i]] = false;
        }
        
        // Set new approvers
        policy.approvers = approvers;
        for (uint256 i = 0; i < approvers.length; i++) {
            policy.isApprover[approvers[i]] = true;
        }
        
        emit UpdatePolicySet(datasetId, requiresApproval, minStakeAmount);
    }
    
    /**
     * @dev Grant access to a dataset (for free datasets or special access)
     */
    function grantAccess(uint256 datasetId, address user, uint256 expiry) public {
        require(datasets[datasetId].creator == msg.sender, "Dataset: Only creator can grant access");
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        
        datasetAccess[datasetId][user] = true;
        accessExpiry[datasetId][user] = expiry;
        
        emit AccessGranted(datasetId, user, expiry);
    }
    
    /**
     * @dev Get dataset version by ID
     */
    function getDatasetVersion(uint256 datasetId, uint256 versionId) public view returns (DatasetVersion memory) {
        return datasets[datasetId].versions[versionId];
    }
    
    /**
     * @dev Get current dataset version
     */
    function getCurrentDatasetVersion(uint256 datasetId) public view returns (DatasetVersion memory) {
        uint256 currentVersionId = datasets[datasetId].currentVersionId;
        return datasets[datasetId].versions[currentVersionId];
    }
    
    /**
     * @dev Get dataset version history
     */
    function getDatasetVersionHistory(uint256 datasetId) public view returns (uint256[] memory) {
        return datasets[datasetId].versionHistory;
    }
    
    /**
     * @dev Get dataset update policy
     */
    function getDatasetUpdatePolicy(uint256 datasetId) public view returns (
        bool requiresApproval,
        uint256 minStakeAmount,
        uint256 approvalThreshold,
        address[] memory approvers,
        bool allowAutomaticUpdates,
        uint256 maxUpdateFrequency
    ) {
        UpdatePolicy storage policy = datasetUpdatePolicies[datasetId];
        return (
            policy.requiresApproval,
            policy.minStakeAmount,
            policy.approvalThreshold,
            policy.approvers,
            policy.allowAutomaticUpdates,
            policy.maxUpdateFrequency
        );
    }
    
    /**
     * @dev Check if user has access to dataset
     */
    function hasAccess(uint256 datasetId, address user) public view returns (bool) {
        return datasetAccess[datasetId][user] && accessExpiry[datasetId][user] > block.timestamp;
    }
    
    /**
     * @dev Deactivate a dataset
     */
    function deactivateDataset(uint256 datasetId) public {
        require(datasets[datasetId].creator == msg.sender, "Dataset: Only creator can deactivate");
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        
        datasets[datasetId].isActive = false;
        datasets[datasetId].lastUpdated = block.timestamp;
        
        emit DatasetDeactivated(datasetId);
    }
    
    /**
     * @dev Activate a dataset
     */
    function activateDataset(uint256 datasetId) public {
        require(datasets[datasetId].creator == msg.sender, "Dataset: Only creator can activate");
        require(datasets[datasetId].datasetId != 0, "Dataset: Dataset does not exist");
        
        datasets[datasetId].isActive = true;
        datasets[datasetId].lastUpdated = block.timestamp;
        
        emit DatasetActivated(datasetId);
    }
    
    /**
     * @dev Get all datasets created by an address
     */
    function getDatasetsByCreator(address creator) public view returns (uint256[] memory) {
        return creatorDatasets[creator];
    }
    
    /**
     * @dev Get all datasets created by a CARV ID
     */
    function getDatasetsByCarvId(uint256 carvId) public view returns (uint256[] memory) {
        return carvIdDatasets[carvId];
    }
    
    /**
     * @dev Get total number of datasets
     */
    function getTotalDatasets() public view returns (uint256) {
        return _datasetIdCounter.current();
    }
    
    /**
     * @dev Get total number of versions
     */
    function getTotalVersions() public view returns (uint256) {
        return _versionCounter.current();
    }
}

