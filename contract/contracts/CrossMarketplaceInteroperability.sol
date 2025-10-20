// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title CrossMarketplaceInteroperability
 * @dev Bridges to other AI/data protocols to expand reach and liquidity
 * @notice Implements Wave 4: Cross-Marketplace Interoperability bridges to other AI/data protocols
 */
contract CrossMarketplaceInteroperability is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;
    
    Counters.Counter private _bridgeIdCounter;
    Counters.Counter private _transactionIdCounter;
    
    // Supported external protocols
    enum ProtocolType {
        OPENAI,
        ANTHROPIC,
        HUGGINGFACE,
        IPFS,
        ARWEAVE,
        FILECOIN,
        CUSTOM
    }
    
    // Bridge configuration
    struct BridgeConfig {
        uint256 bridgeId;
        string protocolName;
        ProtocolType protocolType;
        address bridgeContract;
        string apiEndpoint;
        bool isActive;
        uint256 feePercentage; // basis points
        uint256 minTransferAmount;
        uint256 maxTransferAmount;
        address feeRecipient;
        uint256 createdAt;
    }
    
    // Cross-chain transaction
    struct CrossChainTransaction {
        uint256 transactionId;
        uint256 bridgeId;
        address sender;
        address recipient;
        uint256 amount;
        string itemType; // "dataset" or "agent"
        uint256 itemId;
        string externalProtocol;
        string externalItemId;
        bool isCompleted;
        uint256 createdAt;
        uint256 completedAt;
        string transactionHash;
    }
    
    // Mapping from bridge ID to bridge configuration
    mapping(uint256 => BridgeConfig) public bridgeConfigs;
    
    // Mapping from transaction ID to transaction data
    mapping(uint256 => CrossChainTransaction) public transactions;
    
    // Mapping from protocol to bridge IDs
    mapping(ProtocolType => uint256[]) public protocolBridges;
    
    // Mapping from user to their transactions
    mapping(address => uint256[]) public userTransactions;
    
    // Item mapping between protocols
    struct ItemMapping {
        uint256 localItemId;
        string localItemType;
        string externalProtocol;
        string externalItemId;
        address creator;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(string => mapping(string => ItemMapping)) public itemMappings; // externalProtocol => externalItemId => ItemMapping
    
    // Liquidity pools for different protocols
    struct LiquidityPool {
        string protocolName;
        ProtocolType protocolType;
        uint256 totalLiquidity;
        uint256 availableLiquidity;
        address[] providers;
        mapping(address => uint256) providerShares;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(string => LiquidityPool) public liquidityPools;
    
    // Events
    event BridgeRegistered(uint256 indexed bridgeId, string protocolName, ProtocolType protocolType);
    event CrossChainTransactionInitiated(uint256 indexed transactionId, uint256 indexed bridgeId, address indexed sender);
    event CrossChainTransactionCompleted(uint256 indexed transactionId, string transactionHash);
    event ItemMapped(string indexed externalProtocol, string indexed externalItemId, uint256 localItemId);
    event LiquidityPoolCreated(string indexed protocolName, uint256 initialLiquidity);
    event LiquidityProvided(string indexed protocolName, address indexed provider, uint256 amount);
    event LiquidityWithdrawn(string indexed protocolName, address indexed provider, uint256 amount);
    
    // OG Token for payments
    IERC20 public ogToken;
    
    constructor(address _ogToken) {
        ogToken = IERC20(_ogToken);
    }
    
    /**
     * @dev Register a new bridge to an external protocol
     */
    function registerBridge(
        string memory protocolName,
        ProtocolType protocolType,
        address bridgeContract,
        string memory apiEndpoint,
        uint256 feePercentage,
        uint256 minTransferAmount,
        uint256 maxTransferAmount,
        address feeRecipient
    ) public onlyOwner returns (uint256) {
        require(bytes(protocolName).length > 0, "Interop: Protocol name cannot be empty");
        require(bridgeContract != address(0), "Interop: Bridge contract cannot be zero address");
        require(bytes(apiEndpoint).length > 0, "Interop: API endpoint cannot be empty");
        require(feePercentage <= 1000, "Interop: Fee cannot exceed 10%");
        require(minTransferAmount > 0, "Interop: Min transfer amount must be greater than 0");
        require(maxTransferAmount >= minTransferAmount, "Interop: Max transfer amount must be >= min");
        require(feeRecipient != address(0), "Interop: Fee recipient cannot be zero address");
        
        _bridgeIdCounter.increment();
        uint256 newBridgeId = _bridgeIdCounter.current();
        
        bridgeConfigs[newBridgeId] = BridgeConfig({
            bridgeId: newBridgeId,
            protocolName: protocolName,
            protocolType: protocolType,
            bridgeContract: bridgeContract,
            apiEndpoint: apiEndpoint,
            isActive: true,
            feePercentage: feePercentage,
            minTransferAmount: minTransferAmount,
            maxTransferAmount: maxTransferAmount,
            feeRecipient: feeRecipient,
            createdAt: block.timestamp
        });
        
        protocolBridges[protocolType].push(newBridgeId);
        
        emit BridgeRegistered(newBridgeId, protocolName, protocolType);
        
        return newBridgeId;
    }
    
    /**
     * @dev Initiate a cross-chain transaction
     */
    function initiateCrossChainTransaction(
        uint256 bridgeId,
        address recipient,
        uint256 amount,
        string memory itemType,
        uint256 itemId,
        string memory externalProtocol,
        string memory externalItemId
    ) public nonReentrant returns (uint256) {
        BridgeConfig storage bridge = bridgeConfigs[bridgeId];
        require(bridge.isActive, "Interop: Bridge not active");
        require(amount >= bridge.minTransferAmount, "Interop: Amount below minimum");
        require(amount <= bridge.maxTransferAmount, "Interop: Amount above maximum");
        require(bytes(itemType).length > 0, "Interop: Item type cannot be empty");
        require(bytes(externalProtocol).length > 0, "Interop: External protocol cannot be empty");
        require(bytes(externalItemId).length > 0, "Interop: External item ID cannot be empty");
        
        // Calculate fees
        uint256 fee = (amount * bridge.feePercentage) / 10000;
        uint256 totalAmount = amount + fee;
        
        // Transfer OG tokens from sender
        ogToken.safeTransferFrom(msg.sender, address(this), totalAmount);
        
        _transactionIdCounter.increment();
        uint256 newTransactionId = _transactionIdCounter.current();
        
        transactions[newTransactionId] = CrossChainTransaction({
            transactionId: newTransactionId,
            bridgeId: bridgeId,
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            itemType: itemType,
            itemId: itemId,
            externalProtocol: externalProtocol,
            externalItemId: externalItemId,
            isCompleted: false,
            createdAt: block.timestamp,
            completedAt: 0,
            transactionHash: ""
        });
        
        userTransactions[msg.sender].push(newTransactionId);
        
        emit CrossChainTransactionInitiated(newTransactionId, bridgeId, msg.sender);
        
        return newTransactionId;
    }
    
    /**
     * @dev Complete a cross-chain transaction
     */
    function completeCrossChainTransaction(
        uint256 transactionId,
        string memory transactionHash
    ) public onlyOwner {
        CrossChainTransaction storage transaction = transactions[transactionId];
        require(transaction.transactionId != 0, "Interop: Transaction does not exist");
        require(!transaction.isCompleted, "Interop: Transaction already completed");
        require(bytes(transactionHash).length > 0, "Interop: Transaction hash cannot be empty");
        
        BridgeConfig storage bridge = bridgeConfigs[transaction.bridgeId];
        
        // Calculate fees
        uint256 fee = (transaction.amount * bridge.feePercentage) / 10000;
        
        // Transfer amount to recipient
        ogToken.safeTransfer(transaction.recipient, transaction.amount);
        
        // Transfer fee to fee recipient
        if (fee > 0) {
            ogToken.safeTransfer(bridge.feeRecipient, fee);
        }
        
        // Update transaction
        transaction.isCompleted = true;
        transaction.completedAt = block.timestamp;
        transaction.transactionHash = transactionHash;
        
        emit CrossChainTransactionCompleted(transactionId, transactionHash);
    }
    
    /**
     * @dev Map an item between protocols
     */
    function mapItem(
        uint256 localItemId,
        string memory localItemType,
        string memory externalProtocol,
        string memory externalItemId
    ) public returns (bool) {
        require(bytes(localItemType).length > 0, "Interop: Local item type cannot be empty");
        require(bytes(externalProtocol).length > 0, "Interop: External protocol cannot be empty");
        require(bytes(externalItemId).length > 0, "Interop: External item ID cannot be empty");
        
        itemMappings[externalProtocol][externalItemId] = ItemMapping({
            localItemId: localItemId,
            localItemType: localItemType,
            externalProtocol: externalProtocol,
            externalItemId: externalItemId,
            creator: msg.sender,
            isActive: true,
            createdAt: block.timestamp
        });
        
        emit ItemMapped(externalProtocol, externalItemId, localItemId);
        
        return true;
    }
    
    /**
     * @dev Create a liquidity pool for a protocol
     */
    function createLiquidityPool(
        string memory protocolName,
        ProtocolType protocolType,
        uint256 initialLiquidity
    ) public onlyOwner returns (bool) {
        require(bytes(protocolName).length > 0, "Interop: Protocol name cannot be empty");
        require(initialLiquidity > 0, "Interop: Initial liquidity must be greater than 0");
        
        LiquidityPool storage pool = liquidityPools[protocolName];
        pool.protocolName = protocolName;
        pool.protocolType = protocolType;
        pool.totalLiquidity = initialLiquidity;
        pool.availableLiquidity = initialLiquidity;
        pool.isActive = true;
        pool.createdAt = block.timestamp;
        
        emit LiquidityPoolCreated(protocolName, initialLiquidity);
        
        return true;
    }
    
    /**
     * @dev Provide liquidity to a protocol pool
     */
    function provideLiquidity(
        string memory protocolName,
        uint256 amount
    ) public nonReentrant {
        LiquidityPool storage pool = liquidityPools[protocolName];
        require(pool.isActive, "Interop: Pool not active");
        require(amount > 0, "Interop: Amount must be greater than 0");
        
        // Transfer OG tokens from provider
        ogToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update pool
        pool.totalLiquidity = pool.totalLiquidity + amount;
        pool.availableLiquidity = pool.availableLiquidity + amount;
        
        // Add provider if not already added
        bool isExistingProvider = false;
        for (uint256 i = 0; i < pool.providers.length; i++) {
            if (pool.providers[i] == msg.sender) {
                isExistingProvider = true;
                break;
            }
        }
        
        if (!isExistingProvider) {
            pool.providers.push(msg.sender);
        }
        
        pool.providerShares[msg.sender] = pool.providerShares[msg.sender] + amount;
        
        emit LiquidityProvided(protocolName, msg.sender, amount);
    }
    
    /**
     * @dev Withdraw liquidity from a protocol pool
     */
    function withdrawLiquidity(
        string memory protocolName,
        uint256 amount
    ) public nonReentrant {
        LiquidityPool storage pool = liquidityPools[protocolName];
        require(pool.isActive, "Interop: Pool not active");
        require(amount > 0, "Interop: Amount must be greater than 0");
        require(pool.providerShares[msg.sender] >= amount, "Interop: Insufficient shares");
        require(pool.availableLiquidity >= amount, "Interop: Insufficient available liquidity");
        
        // Update pool
        pool.totalLiquidity = pool.totalLiquidity - amount;
        pool.availableLiquidity = pool.availableLiquidity - amount;
        pool.providerShares[msg.sender] = pool.providerShares[msg.sender] - amount;
        
        // Transfer OG tokens to provider
        ogToken.safeTransfer(msg.sender, amount);
        
        emit LiquidityWithdrawn(protocolName, msg.sender, amount);
    }
    
    /**
     * @dev Get bridge configuration
     */
    function getBridgeConfig(uint256 bridgeId) public view returns (BridgeConfig memory) {
        return bridgeConfigs[bridgeId];
    }
    
    /**
     * @dev Get cross-chain transaction
     */
    function getCrossChainTransaction(uint256 transactionId) public view returns (CrossChainTransaction memory) {
        return transactions[transactionId];
    }
    
    /**
     * @dev Get item mapping
     */
    function getItemMapping(string memory externalProtocol, string memory externalItemId) public view returns (ItemMapping memory) {
        return itemMappings[externalProtocol][externalItemId];
    }
    
    /**
     * @dev Get liquidity pool info
     */
    function getLiquidityPool(string memory protocolName) public view returns (
        string memory protocolName_,
        ProtocolType protocolType_,
        uint256 totalLiquidity_,
        uint256 availableLiquidity_,
        bool isActive_,
        uint256 createdAt_
    ) {
        LiquidityPool storage pool = liquidityPools[protocolName];
        return (
            pool.protocolName,
            pool.protocolType,
            pool.totalLiquidity,
            pool.availableLiquidity,
            pool.isActive,
            pool.createdAt
        );
    }
    
    /**
     * @dev Get user's transactions
     */
    function getUserTransactions(address user) public view returns (uint256[] memory) {
        return userTransactions[user];
    }
    
    /**
     * @dev Get bridges for a protocol type
     */
    function getProtocolBridges(ProtocolType protocolType) public view returns (uint256[] memory) {
        return protocolBridges[protocolType];
    }
    
    /**
     * @dev Get total bridges
     */
    function getTotalBridges() public view returns (uint256) {
        return _bridgeIdCounter.current();
    }
    
    /**
     * @dev Get total transactions
     */
    function getTotalTransactions() public view returns (uint256) {
        return _transactionIdCounter.current();
    }
    
    /**
     * @dev Update bridge configuration
     */
    function updateBridgeConfig(
        uint256 bridgeId,
        bool isActive,
        uint256 feePercentage,
        uint256 minTransferAmount,
        uint256 maxTransferAmount,
        address feeRecipient
    ) public onlyOwner {
        require(bridgeConfigs[bridgeId].bridgeId != 0, "Interop: Bridge does not exist");
        require(feePercentage <= 1000, "Interop: Fee cannot exceed 10%");
        require(minTransferAmount > 0, "Interop: Min transfer amount must be greater than 0");
        require(maxTransferAmount >= minTransferAmount, "Interop: Max transfer amount must be >= min");
        require(feeRecipient != address(0), "Interop: Fee recipient cannot be zero address");
        
        BridgeConfig storage bridge = bridgeConfigs[bridgeId];
        bridge.isActive = isActive;
        bridge.feePercentage = feePercentage;
        bridge.minTransferAmount = minTransferAmount;
        bridge.maxTransferAmount = maxTransferAmount;
        bridge.feeRecipient = feeRecipient;
    }
    
    /**
     * @dev Emergency withdrawal
     */
    function emergencyWithdraw() public onlyOwner {
        uint256 balance = ogToken.balanceOf(address(this));
        ogToken.safeTransfer(owner(), balance);
    }
}


